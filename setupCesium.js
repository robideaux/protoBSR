const viewer = new Cesium.Viewer('map', {
    /*
    animation: false,
    baseLayerPicker: false,
    navigationHelpButton: false,
    sceneModePicker: true,
    homeButton: false,
    geocoder: false,
    fullscreenButton: false,
    timeline: false,
	*/
	animation: false,
    navigationHelpButton: false,
    homeButton: false,
    timeline: false,
    sceneMode: Cesium.SceneMode.SCENE2D	
})
viewer.scene.globe.baseColor = Cesium.Color.BLACK;


viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(-92.0, 30.25, 8000),
});

var newColor = Cesium.Color.fromAlpha(Cesium.Color.LIME, 0.75)
var medColor = Cesium.Color.fromAlpha(Cesium.Color.YELLOW, 0.50)
var oldColor = Cesium.Color.fromAlpha(Cesium.Color.RED, 0.30)

function populateMap(participantData) {
    var runnerDataSource = new Cesium.CustomDataSource("runners");

    if (participantData) {
        var runners = Object.keys(participantData)
        if (runners.length > 0) {
            runners.forEach(function(runner) {
                var stats = participantData[runner]

                var fillColor = oldColor
                var outlineColor = Cesium.Color.RED
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

                var entity = new Cesium.Entity({
                    name : runner,
                    label : {
                      text : runner,
                      font : "20px Arial",
                      style : Cesium.LabelStyle.FILL_AND_OUTLINE,
                      outlineWidth : 2,
                      pixelOffset : new Cesium.Cartesian2(0,25),
                      horizontalOrigin : Cesium.HorizontalOrigin.CENTER
                    },
                    description : '<b>Bib : </b>' + stats.bib + '<br/>' +
                                  '<b>Accuracy : </b>' + stats.accuracy + '<br/>' +
                                  '<b>Latitude : </b>' + stats.lat + '<br/>' +
                                  '<b>Longitude : </b>' + stats.lon + '<br/>' +
                                  '<b>Accuracy : </b>' + stats.accuracy + '<br/>' +
                                  '<b>Min Range : </b>' + stats.minRange + '<br/>' +
                                  '<b>Max Range : </b>' + stats.maxRange + '<br/>' +
                                  '<b>Age : </b>' + stats.age + '<br/>',
                    position : new Cesium.Cartesian3.fromDegrees(stats.lon, stats.lat),
                    ellipse : {
                        fill            : shouldFill,
                        material        : new Cesium.ColorMaterialProperty(fillColor),
                        outline         : shouldOutline,
                        outlineColor    : outlineColor,
                        outlineWidth    : 5,
                        semiMinorAxis   : stats.accuracy*2.0,
                        semiMajorAxis   : stats.accuracy*2.0,
                    }
                  });
                  runnerDataSource.entities.add(entity);
            })
        }
    }
    viewer.dataSources.removeAll(true);
    viewer.dataSources.add(runnerDataSource);
};
