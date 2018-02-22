var latestAddr = allCoords[allCoords.length - 1];
var latest2ndAddr = allCoords[allCoords.length - 2];

function showMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 65.012, lng: 25.465},
		zoom: 10
	});		
	for (var i = 0; i < allCoords.length; i++) {
		if (allCoords[i].changeIcon === 'circle') {
			icon = google.maps.SymbolPath.CIRCLE;
		} else if (allCoords[i].changeIcon == 'down') {
			icon = google.maps.SymbolPath.BACKWARD_CLOSED_ARROW;
		} else {
			icon = google.maps.SymbolPath.FORWARD_CLOSED_ARROW;
		}
		var marker = new google.maps.Marker({
			position: {lat: allCoords[i].lat, lng: allCoords[i].lng},
			icon: {
				path: icon,
				fillColor: allCoords[i].changeColor,
				fillOpacity: 1,
				scale:10,
				strokeColor: '#fff',
				strokeWeight: 0
			},
			map: map
		});
	}
	map.setCenter({lat: latestAddr.lat, lng: latestAddr.lng});
}
var config = {
	apiKey: "AIzaSyDCMXtQ7wnVwYRugTLZl_V4jwhVkR47GZU",
	authDomain: "mobile-course-bi-1519048093039.firebaseapp.com",
	databaseURL: "https://mobile-course-bi-1519048093039.firebaseio.com",
	projectId: "mobile-course-bi-1519048093039",
	storageBucket: "mobile-course-bi-1519048093039.appspot.com",
	messagingSenderId: "99726208798"
};
firebase.initializeApp(config);
var database = firebase.database();
var btnUserIntel = document.getElementById('btnUserIntel');
btnUserIntel.addEventListener('click', sendIntel);
var btnFetchIntel = document.getElementById('btnFetchIntel');
btnFetchIntel.addEventListener('click', fetchIntel);
var btnDistance = document.getElementById('btnDistance');
btnDistance.addEventListener('click', calcDist);
function sendIntel() {
	var userIntel = document.getElementById('userIntel').value;
	var intelSentStat = document.getElementById('intelSentStat');
	firebase.database().ref('/intel').push({
		lat: latestAddr.lat,
		lng: latestAddr.lng,
		userIntel : userIntel
	}).then(function(){
		intelSentStat.innerHTML = 'Thanks for helping to update our databse';
	}).catch(function(err) {
		intelSentStat.innerHTML = 'We had problem updating database: ' + err.message;
	});
}
function fetchIntel() {
	var showIntel = document.getElementById('showIntel');
	var infowindow = new google.maps.InfoWindow;
	var marker, i;
	database.ref('/intel').once('value', function(snapshot){
		if(snapshot.exists()){
			snapshot.forEach(function(data){
				var val = data.val();
				marker = new google.maps.Marker({
					position: new google.maps.LatLng(val.lat, val.lng),
					map: map
				});
				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
						infowindow.setContent(val.userIntel);
						infowindow.open(map, marker);
					}
				})(marker, i));
			});
			showIntel.innerHTML = content;
		}
	});
}
function calcDist() {
	var distKm = document.getElementById('distKm');
	var showTime = document.getElementById('showTime');
	var showRoute = document.getElementById('showRoute');
	pointA = new google.maps.LatLng(
		latestAddr.lat,
		latestAddr.lng
	);
	pointB = new google.maps.LatLng(
		latest2ndAddr.lat,
		latest2ndAddr.lng
	);
	var dist = google.maps.geometry.spherical.computeDistanceBetween(pointA,pointB);
	distance = (dist/1000).toFixed(2) + 'km';
	distKm.innerHTML = distance;
	
	var directionsService = new google.maps.DirectionsService();
	directionsService.route(
		{
			origin: pointA,
			destination: pointB,
			travelMode: google.maps.DirectionsTravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.METRIC
		},
	function(response, status) {
		if (status === google.maps.DirectionsStatus.OK) {
			timeofTravel = response.routes[0].legs[0].duration.text;
			stepsofTravel = response.routes[0].legs[0].steps.map(function(step) {
				return {
					distance: step.distance.text,
					duration: step.duration.text,
					instructions: step.instructions
				};});		
				
				var directionsRenderer = new google.maps.DirectionsRenderer({map: map, directions: response });
				showTime.innerHTML = timeofTravel;
				
				var routeList = [];
				for (var i = 0; i < stepsofTravel.length; i++) {
					routeList.push(stepsofTravel[i].instructions);
					routeList.push('<br />')
				}
				showRoute.innerHTML = routeList;
			} else {
				console.log('Ouch');
			}
		}
	);
}
