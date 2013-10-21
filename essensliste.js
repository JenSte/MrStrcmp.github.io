$(document).ready(function() {
	var vienna = [48.208330230278, 16.373063840833];

	var map = L.map('map').setView(vienna, 14);

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
		maxZoom: 18
	}).addTo(map);

	var url = 'https://spreadsheets.google.com/feeds/list/0At4qfYeZ6QtTd' +
	          'GdkWjZPV3dHbU5QWERtR09WaFhRZEE/od6/public/values?alt=json'

	$.getJSON(
		url,
		function(data) {
			var locations = data.feed.entry;
			for (var i = 0; i < locations.length; i++) {
				var l = locations[i];
				console.log(l);

				var pos = l.gsx$position.$t.split('/');
				if (pos.length != 2) {
					continue;
				}

				var name    = l.gsx$name.$t;
				var comment = l.gsx$bemerkung.$t;
				var link    = l.gsx$link.$t;
				var type    = l.gsx$artdesfutters.$t.toLowerCase();

				var popupText = '<b>' + name + '</b>'
				if ('' != comment) {
					popupText += '<br>' + comment;
				}
				if ('' != link) {
					popupText += '<br><a href="' + link +
					             ' "target="_blank">homepage</a>';
				}

				var color = 'blue';
				       if (-1 != type.indexOf('asiatisch') ||
				           -1 != type.indexOf('chinesisch')) {
					color = 'yellow';
				} else if (-1 != type.indexOf('pizza')) {
					color = 'green';
				}

				L.marker(pos, {
					color: color, // damn, no color support
					title: name
				}).addTo(map).bindPopup(popupText);
			}

		}
	);
})

