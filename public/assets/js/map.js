var btnCoordA = document.getElementById('btnCoordA');
btnCoordA.addEventListener('click', fetchUserAddrA);

var btnCoordB = document.getElementById('btnCoordB');
btnCoordB.addEventListener('click', fetchUserAddrB);

var btnDistance = document.getElementById('btnDistance');
btnDistance.addEventListener('click', calcDist);
var pointA = null;
var pointB = null;

function showMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 65.012, lng: 25.465 },
		zoom: 10
	});
	geocoder = new google.maps.Geocoder();
}

function addMarkerToMap(position, map, newIcon) {
	var marker = new google.maps.Marker({
		position: position,
		map : map,
		label: {
			text: ":)",
			fontWeight: "bold"
		}
	});
	var toggle = false;
	google.maps.event.addListener(marker, 'click', function(evt) {
		if (!toggle) {
			this.setLabel({
				text: ";)	",
				color: "white",
				fontWeight: "bold"
			});
		} else {
			this.setLabel({
				text: ":O",
				color: "black",
				fontWeight: "bold"
			});
		}
		toggle = !toggle;
	});
}

function getAddrCoord(address) {
	return new Promise(function(resolve, reject) {
		geocoder.geocode({ address: address }, function(results, status) {
			if (status == 'OK') {resolve(results);}
			reject('Ouch, cant fetch the address coordinations');
		});
	});
}

function fetchUserAddrA() {
	var addr = document.getElementById('addrA');
	var address = addr.value;
	var coordInfo = document.getElementById('coordInfo');
	
	
	getAddrCoord(address).then(function(results) {
		addr.value = results[0].formatted_address;
		var location = results[0].geometry.location;
		var coordsInfo = {
			lat: location.lat(),
			lng: location.lng(),
		};
		
		pointA = new google.maps.LatLng(
			coordsInfo.lat,
			coordsInfo.lng
		);
		
		coordInfoA.innerHTML =
		'Lat: ' + coordsInfo.lat + ', Long: ' + coordsInfo.lng;
		addMarkerToMap(coordsInfo, map);
		map.setCenter(coordsInfo);
	})
	.catch(function(err) {coordInfo.innerHTML = err;});
}

function fetchUserAddrB() {
	var addr = document.getElementById('addrB');
	var address = addr.value;
	var coordInfo = document.getElementById('coordInfo');
	
	
	getAddrCoord(address).then(function(results) {
		addr.value = results[0].formatted_address;
		var location = results[0].geometry.location;
		var coordsInfo = {
			lat: location.lat(),
			lng: location.lng(),
		};
		
		pointB = new google.maps.LatLng(
			coordsInfo.lat,
			coordsInfo.lng
		);
		
		coordInfoB.innerHTML =
		'Lat: ' + coordsInfo.lat + ', Long: ' + coordsInfo.lng;
		addMarkerToMap(coordsInfo, map);
		map.setCenter(coordsInfo);
	})
	.catch(function(err) {coordInfo.innerHTML = err;});
}

function calcDist() {
	var distKm = document.getElementById('distKm');
	var showTime = document.getElementById('showTime');
	var showRoute = document.getElementById('showRoute');
	
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
