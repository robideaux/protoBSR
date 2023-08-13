var map = L.map('_map')
map.setView([30.25, -92.0], 13)

var OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
OpenStreetMap_Mapnik.addTo(map)

var newColor = "lime"
var medColor = "yellow"
var oldColor = "red"

var lastBeacons = []
var liveUpdates = null

var beaconLayers = L.layerGroup()
beaconLayers.clearLayers()
beaconLayers.addTo(map)

function populateMap(participantData) {
	clearInterval(liveUpdates)
	beaconLayers.clearLayers()
	lastBeacons = []

	if (participantData) {
		var runners = Object.keys(participantData)
		if (runners.length > 0) {
			runners.forEach(function(runner) {
				var stats = participantData[runner]
				var fillColor = oldColor
				var outlineColor = "blue"
				var shouldFill = false
				var shouldOutline = true

				if (stats.age <= 60) {
					fillColor = newColor
					shouldFill = true
					shouldOutline = false
				} else if (stats.age <= 120) {
					fillColor = medColor
					shouldFill = true
					shouldOutline = false
				} else if (stats.age <= 180) {
					fillColor = oldColor
					shouldFill = true
					shouldOutline = false
				}

				var location = L.latLng(stats.lat, stats.lon)
				map.setView(location)
				var circle = L.circle(location, {
					color: outlineColor,
					stroke: shouldOutline,
					fillColor: fillColor,
					fillOpacity: 0.4,
					radius: stats.maxRange + stats.accuracy
				})
				circle.bindTooltip('<b>Bib : </b>' + stats.bib + '<br/>' +
								   '<b>Latitude : </b>' + stats.lat + '<br/>' +
								   '<b>Longitude : </b>' + stats.lon + '<br/>' +
								   '<b>Accuracy : </b>' + stats.accuracy + '<br/>' +
								   '<b>Min Range : </b>' + stats.minRange + '<br/>' +
								   '<b>Max Range : </b>' + stats.maxRange + '<br/>' +
								   '<b>Age : </b>' + stats.age + '<br/>')
				circle.addTo(beaconLayers)
				beaconLayers.addLayer(circle)

				lastBeacons.push({
					updateTime: stats.updateTime,
					circle: circle
				})
			})
		}
	}
	liveUpdates = setInterval(updateCircles, 100)
}

function updateCircles() {
	lastBeacons.forEach(function(beacon) {
		var fillColor = oldColor
		var outlineColor = "blue"
		var shouldFill = false
		var shouldOutline = true
		var age = Date.now() - beacon.updateTime
		if (age <= 60) {
			fillColor = newColor
			shouldFill = true
			shouldOutline = false
		} else if (age <= 120) {
			fillColor = medColor
			shouldFill = true
			shouldOutline = false
		} else if (age <= 180) {
			fillColor = oldColor
			shouldFill = true
			shouldOutline = false
		}

		beacon.circle.setStyle({
			color: outlineColor,
            fillColor: fillColor
		})
	})
}
