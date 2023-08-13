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

var beaconLayers = L.layerGroup()
beaconLayers.clearLayers()
beaconLayers.addTo(map)

function populateMap(participantData) {
    beaconLayers.clearLayers()

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
                } else if (stats.age <= 120){
                    fillColor = medColor
                    shouldFill = true
                    shouldOutline = false
                } else if (stats.age <= 180){
                    fillColor = oldColor
                    shouldFill = true
                    shouldOutline = false
                }

                var location = L.latLng(stats.lat, stats.lon)
                map.setView(location)
                var circle = L.circle(location, {
                    color: outlineColor,
                    fillColor: fillColor,
                    fillOpacity: 0.4,
                    radius: stats.accuracy*2.0
                  })
				circle.bindTooltip('<b>Bib : </b>' + stats.bib + '<br/>' +
								   '<b>Accuracy : </b>' + stats.accuracy + '<br/>' +
								   '<b>Latitude : </b>' + stats.lat + '<br/>' +
								   '<b>Longitude : </b>' + stats.lon + '<br/>' +
								   '<b>Accuracy : </b>' + stats.accuracy + '<br/>' +
								   '<b>Min Range : </b>' + stats.minRange + '<br/>' +
								   '<b>Max Range : </b>' + stats.maxRange + '<br/>' +
								   '<b>Age : </b>' + stats.age + '<br/>')
				circle.addTo(beaconLayers)

                /*
                description : '<b>Bib : </b>' + stats.bib + '<br/>' +
                              '<b>Accuracy : </b>' + stats.accuracy + '<br/>' +
                              '<b>Latitude : </b>' + stats.lat + '<br/>' +
                              '<b>Longitude : </b>' + stats.lon + '<br/>' +
                              '<b>Accuracy : </b>' + stats.accuracy + '<br/>' +
                              '<b>Min Range : </b>' + stats.minRange + '<br/>' +
                              '<b>Max Range : </b>' + stats.maxRange + '<br/>' +
                              '<b>Age : </b>' + stats.age + '<br/>',
                */

                beaconLayers.addLayer(circle)
            })
        }
    }
}
