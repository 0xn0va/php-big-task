var btnCoord = document.getElementById('btnCoord');
btnCoord.addEventListener('click', fetchUserAddr);

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

function fetchUserAddr() {
	var addr = document.getElementById('addr');
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
		
		coordInfo.innerHTML =
		'Lat: ' + coordsInfo.lat + ', Long: ' + coordsInfo.lng;
		addMarkerToMap(coordsInfo, map);
		map.setCenter(coordsInfo);
	})
	.catch(function(err) {coordInfo.innerHTML = err;});
}
