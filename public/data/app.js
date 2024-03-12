const map = L.map('map').setView([0, 0], 1);

const tileUrl = 'https://wxs.ign.fr/choisirgeoportail/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/jpeg&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}';
const tileAtriblution = '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>';

const tile = L.tileLayer(tileUrl, {
    maxZoom: 19,
    attribution: tileAtriblution
});

tile.addTo(map);

// var marker = L.marker([51.5, -0.09]).addTo(map);

// var circle = L.circle([51.508, -0.11], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);

// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(map);
let colorV = 0;

function returnColor(d, id) {
    var color;
    if (d == 4 && id == 1) {
      color = '#E75959';
    }else if (d == 4 && id == 2) {
        color = '#E759C8';

    }else if (d == 4 && id == 3) {
        color = '#5967E7';

    }else if (d == 4 && id == 4) {
        color = '#E78C59';

    }else if (d == 4 && id == 5) {
        color = '#599AE7';

    }else if (d == 4 && id == 6) {
        color = '#E75959';

    }else if (d == 4 && id == 7) {
        color = '#E7C859';

    }else if (d == 4 && id == 8) {
        color = '#59E792';

    } else {
      color = '#CACACA';
    }
    return color;
  }

function style(feature) {
    return {
        fillColor: returnColor(feature.properties.region, feature.properties.district),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function onEachFeature(feature, layer) {

    if(feature.properties.region == 4){
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }
   
}
L.geoJson(regionsData).addTo(map);
const geojson = L.geoJson(districtsData, {style: style, onEachFeature: onEachFeature}).addTo(map);

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.9
    });

    layer.bringToFront();
}

function resetHighlight(e) {

    var layer = e.target;

    layer.setStyle({
        weight: 1,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    
    geojson.resetStyle(layer);
}


function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}


// L.geoJson(villagesData).addTo(map);


// villagesData.features.forEach(element => {
//     var marker = L.marker(element.properties.POINT_X,element.properties.POINT_Y).addTo(map);
// });