
var geojsondata = [];

function createMap() {

    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var drawnShapes = new L.FeatureGroup().addTo(map);
    
    new L.Control.Draw({
        draw: {
            polygon: false,
            polyline: {
                shapeOptions: {
                    color: '#ff2211',
                    weight: 10
                }, 
                export: true
            },
            circle: false,
            circlemarker: false,
            marker: false,
            rectangle: false,
        },
    }).addTo(map);

    map.on('draw:created', function (e) {
        drawnShapes.addLayer(e.layer);

        var geojson = e.layer.toGeoJSON();
        // append the geojson to the geojsondata object
        geojsondata.push(geojson);
    });

    var button = new L.Control.Button('Export');
    button.addTo(map);
    button.on('click', function () {    
        var data = drawnShapes.toGeoJSON();
        
        var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

        $('<a>', {
            id: 'downloadAnchorElem',
            style: 'display:none',
            href: 'data:' + convertedData,
            download: 'data.geojson'
        }).appendTo('body');

        document.getElementById('downloadAnchorElem').click();
    
    }); 

    return map;
}

$(document).ready(function(){

    var map = createMap();

    // read the track files in tracks/tracks.json
    $.get("../../tracks/tracks.txt", function(data) {
        var trackFiles = [];
        data = data.split("\n");
        for (var i = 0; i < data.length; i++) {
            trackFiles.push(data[i]);
        }

        // add the tracks to the map
        $.each(trackFiles, function(key, val) {
            console.log(val);
            $.getJSON("../../tracks/" + val, function(data) {
                console.log(data);
                // load the geojson data into the map
                L.geoJson(data, {
                    style: function(feature) {
                        return {color: "#ff0000"};
                    }
                }).addTo(map);
                
            });
        }); 
    });
});

