var highlightLayer;
function highlightFeature(e) {
    highlightLayer = e.target;

    if (e.target.feature.geometry.type === 'LineString' || e.target.feature.geometry.type === 'MultiLineString') {
        highlightLayer.setStyle({
        color: '#59d1db',
        });
    } else {
        highlightLayer.setStyle({
        fillColor: '#59d1db',
        fillOpacity: 1
        });
    }
    highlightLayer.openPopup();
}
var map = L.map('map', {
    zoomControl:false, maxZoom:24, minZoom:2
}).fitBounds([[19.45268613823273,-96.90370983488903],[19.512344431201562,-96.79566795610471]]);
var hash = new L.Hash(map);
map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
// remove popup's row if "visible-with-data"
function removeEmptyRowsFromPopupContent(content, feature) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    var rows = tempDiv.querySelectorAll('tr');
    for (var i = 0; i < rows.length; i++) {
        var td = rows[i].querySelector('td.visible-with-data');
        var key = td ? td.id : '';
        if (td && td.classList.contains('visible-with-data') && feature.properties[key] == null) {
            rows[i].parentNode.removeChild(rows[i]);
        }
    }
    return tempDiv.innerHTML;
}
// add class to format popup if it contains media
function addClassToPopupIfMedia(content, popup) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    if (tempDiv.querySelector('td img')) {
        popup._contentNode.classList.add('media');
            // Delay to force the redraw
            setTimeout(function() {
                popup.update();
            }, 10);
    } else {
        popup._contentNode.classList.remove('media');
    }
}
var title = new L.Control({'position':'topright'});
title.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};
title.update = function () {
    this._div.innerHTML = '<h2>Concesiones de Agua. Cuencas La Antigua y Actopan</h2>';
};
title.addTo(map);
var zoomControl = L.control.zoom({
    position: 'topleft'
}).addTo(map);
var measureControl = new L.Control.Measure({
    position: 'topleft',
    primaryLengthUnit: 'feet',
    secondaryLengthUnit: 'miles',
    primaryAreaUnit: 'sqfeet',
    secondaryAreaUnit: 'sqmiles'
});
measureControl.addTo(map);
document.getElementsByClassName('leaflet-control-measure-toggle')[0].innerHTML = '';
document.getElementsByClassName('leaflet-control-measure-toggle')[0].className += ' fas fa-ruler';
var bounds_group = new L.featureGroup([]);
function setBounds() {
}
map.createPane('pane_ESRINationalGeographic_0');
map.getPane('pane_ESRINationalGeographic_0').style.zIndex = 400;
var layer_ESRINationalGeographic_0 = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
    pane: 'pane_ESRINationalGeographic_0',
    opacity: 1.0,
    attribution: '',
    minZoom: 2,
    maxZoom: 24,
    minNativeZoom: 0,
    maxNativeZoom: 20
});
layer_ESRINationalGeographic_0;
map.createPane('pane_ESRIShadedRelief_1');
map.getPane('pane_ESRIShadedRelief_1').style.zIndex = 401;
var layer_ESRIShadedRelief_1 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
    pane: 'pane_ESRIShadedRelief_1',
    opacity: 1.0,
    attribution: '',
    minZoom: 2,
    maxZoom: 24,
    minNativeZoom: 0,
    maxNativeZoom: 20
});
layer_ESRIShadedRelief_1;
map.createPane('pane_ESRISatellite_2');
map.getPane('pane_ESRISatellite_2').style.zIndex = 402;
var layer_ESRISatellite_2 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    pane: 'pane_ESRISatellite_2',
    opacity: 1.0,
    attribution: '',
    minZoom: 2,
    maxZoom: 24,
    minNativeZoom: 0,
    maxNativeZoom: 20
});
layer_ESRISatellite_2;
map.createPane('pane_OpenStreetMap_3');
map.getPane('pane_OpenStreetMap_3').style.zIndex = 403;
var layer_OpenStreetMap_3 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    pane: 'pane_OpenStreetMap_3',
    opacity: 1.0,
    attribution: '',
    minZoom: 2,
    maxZoom: 24,
    minNativeZoom: 0,
    maxNativeZoom: 19
});
layer_OpenStreetMap_3;
map.addLayer(layer_OpenStreetMap_3);
function pop_ParqueLinealQuetzalapanSedeo_4(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['Name'] !== null ? autolinker.link(String(feature.properties['Name']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_ParqueLinealQuetzalapanSedeo_4_0() {
    return {
        pane: 'pane_ParqueLinealQuetzalapanSedeo_4',
        opacity: 1,
        color: 'rgba(35,35,35,0.49)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0, 
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(72,102,8,0.49)',
        interactive: true,
    }
}
map.createPane('pane_ParqueLinealQuetzalapanSedeo_4');
map.getPane('pane_ParqueLinealQuetzalapanSedeo_4').style.zIndex = 404;
map.getPane('pane_ParqueLinealQuetzalapanSedeo_4').style['mix-blend-mode'] = 'normal';
var layer_ParqueLinealQuetzalapanSedeo_4 = new L.geoJson(json_ParqueLinealQuetzalapanSedeo_4, {
    attribution: '',
    interactive: true,
    dataVar: 'json_ParqueLinealQuetzalapanSedeo_4',
    layerName: 'layer_ParqueLinealQuetzalapanSedeo_4',
    pane: 'pane_ParqueLinealQuetzalapanSedeo_4',
    onEachFeature: pop_ParqueLinealQuetzalapanSedeo_4,
    style: style_ParqueLinealQuetzalapanSedeo_4_0,
});
bounds_group.addLayer(layer_ParqueLinealQuetzalapanSedeo_4);
function pop_ArchipilagodeBosquesySelvasdeXalapa_5(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['Name'] !== null ? autolinker.link(String(feature.properties['Name']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_ArchipilagodeBosquesySelvasdeXalapa_5_0() {
    return {
        pane: 'pane_ArchipilagodeBosquesySelvasdeXalapa_5',
        opacity: 1,
        color: 'rgba(35,35,35,0.563)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1.0, 
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(132,192,79,0.563)',
        interactive: true,
    }
}
map.createPane('pane_ArchipilagodeBosquesySelvasdeXalapa_5');
map.getPane('pane_ArchipilagodeBosquesySelvasdeXalapa_5').style.zIndex = 405;
map.getPane('pane_ArchipilagodeBosquesySelvasdeXalapa_5').style['mix-blend-mode'] = 'normal';
var layer_ArchipilagodeBosquesySelvasdeXalapa_5 = new L.geoJson(json_ArchipilagodeBosquesySelvasdeXalapa_5, {
    attribution: '',
    interactive: true,
    dataVar: 'json_ArchipilagodeBosquesySelvasdeXalapa_5',
    layerName: 'layer_ArchipilagodeBosquesySelvasdeXalapa_5',
    pane: 'pane_ArchipilagodeBosquesySelvasdeXalapa_5',
    onEachFeature: pop_ArchipilagodeBosquesySelvasdeXalapa_5,
    style: style_ArchipilagodeBosquesySelvasdeXalapa_5_0,
});
bounds_group.addLayer(layer_ArchipilagodeBosquesySelvasdeXalapa_5);
map.addLayer(layer_ArchipilagodeBosquesySelvasdeXalapa_5);
function pop_ConcesionesDescargas2_6(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Tipo de concesión: </th>\
                <td class="visible-with-data" id="Tipo aprov">' + (feature.properties['Tipo aprov'] !== null ? autolinker.link(String(feature.properties['Tipo aprov']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Titular:</th>\
                <td class="visible-with-data" id="Titular">' + (feature.properties['Titular'] !== null ? autolinker.link(String(feature.properties['Titular']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Uso: </th>\
                <td class="visible-with-data" id="Uso">' + (feature.properties['Uso'] !== null ? autolinker.link(String(feature.properties['Uso']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Vol (m3/año)</th>\
                <td>' + (feature.properties['field_17 v'] !== null ? autolinker.link(String(feature.properties['field_17 v']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_ConcesionesDescargas2_6_0(feature) {
    if (feature.properties['field_17 v'] >= 46.000000 && feature.properties['field_17 v'] <= 100.000000 ) {
        return {
        pane: 'pane_ConcesionesDescargas2_6',
        radius: 2.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(154,123,10,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['field_17 v'] >= 100.000000 && feature.properties['field_17 v'] <= 1000.000000 ) {
        return {
        pane: 'pane_ConcesionesDescargas2_6',
        radius: 4.8,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(154,123,10,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['field_17 v'] >= 1000.000000 && feature.properties['field_17 v'] <= 10000.000000 ) {
        return {
        pane: 'pane_ConcesionesDescargas2_6',
        radius: 7.6,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(154,123,10,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['field_17 v'] >= 10000.000000 && feature.properties['field_17 v'] <= 100000.000000 ) {
        return {
        pane: 'pane_ConcesionesDescargas2_6',
        radius: 10.4,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(154,123,10,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['field_17 v'] >= 100000.000000 && feature.properties['field_17 v'] <= 1000000.000000 ) {
        return {
        pane: 'pane_ConcesionesDescargas2_6',
        radius: 13.2,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(154,123,10,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['field_17 v'] >= 1000000.000000 && feature.properties['field_17 v'] <= 10000000.000000 ) {
        return {
        pane: 'pane_ConcesionesDescargas2_6',
        radius: 16.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(154,123,10,1.0)',
        interactive: true,
    }
    }
}
map.createPane('pane_ConcesionesDescargas2_6');
map.getPane('pane_ConcesionesDescargas2_6').style.zIndex = 406;
map.getPane('pane_ConcesionesDescargas2_6').style['mix-blend-mode'] = 'normal';
var layer_ConcesionesDescargas2_6 = new L.geoJson(json_ConcesionesDescargas2_6, {
    attribution: '',
    interactive: true,
    dataVar: 'json_ConcesionesDescargas2_6',
    layerName: 'layer_ConcesionesDescargas2_6',
    pane: 'pane_ConcesionesDescargas2_6',
    onEachFeature: pop_ConcesionesDescargas2_6,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.circleMarker(latlng, style_ConcesionesDescargas2_6_0(feature));
    },
});
bounds_group.addLayer(layer_ConcesionesDescargas2_6);
map.addLayer(layer_ConcesionesDescargas2_6);
function pop_ConcesionesAguaSubterrnea2_7(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Tipo concesión:</th>\
                <td class="visible-with-data" id="Tipo aprov">' + (feature.properties['Tipo aprov'] !== null ? autolinker.link(String(feature.properties['Tipo aprov']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Titular</th>\
                <td class="visible-with-data" id="Titular">' + (feature.properties['Titular'] !== null ? autolinker.link(String(feature.properties['Titular']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Uso: </th>\
                <td class="visible-with-data" id="Uso">' + (feature.properties['Uso'] !== null ? autolinker.link(String(feature.properties['Uso']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Vol (m3/año) </th>\
                <td class="visible-with-data" id="m3 o m2">' + (feature.properties['m3 o m2'] !== null ? autolinker.link(String(feature.properties['m3 o m2']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_ConcesionesAguaSubterrnea2_7_0(feature) {
    if (feature.properties['m3 o m2'] >= 848.000000 && feature.properties['m3 o m2'] <= 1000.000000 ) {
        return {
        pane: 'pane_ConcesionesAguaSubterrnea2_7',
        radius: 2.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(42,23,255,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['m3 o m2'] >= 1000.000000 && feature.properties['m3 o m2'] <= 10000.000000 ) {
        return {
        pane: 'pane_ConcesionesAguaSubterrnea2_7',
        radius: 5.5,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(42,23,255,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['m3 o m2'] >= 10000.000000 && feature.properties['m3 o m2'] <= 100000.000000 ) {
        return {
        pane: 'pane_ConcesionesAguaSubterrnea2_7',
        radius: 9.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(42,23,255,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['m3 o m2'] >= 100000.000000 && feature.properties['m3 o m2'] <= 1000000.000000 ) {
        return {
        pane: 'pane_ConcesionesAguaSubterrnea2_7',
        radius: 12.5,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(42,23,255,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['m3 o m2'] >= 1000000.000000 && feature.properties['m3 o m2'] <= 10000000.000000 ) {
        return {
        pane: 'pane_ConcesionesAguaSubterrnea2_7',
        radius: 16.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(42,23,255,1.0)',
        interactive: true,
    }
    }
}
map.createPane('pane_ConcesionesAguaSubterrnea2_7');
map.getPane('pane_ConcesionesAguaSubterrnea2_7').style.zIndex = 407;
map.getPane('pane_ConcesionesAguaSubterrnea2_7').style['mix-blend-mode'] = 'normal';
var layer_ConcesionesAguaSubterrnea2_7 = new L.geoJson(json_ConcesionesAguaSubterrnea2_7, {
    attribution: '',
    interactive: true,
    dataVar: 'json_ConcesionesAguaSubterrnea2_7',
    layerName: 'layer_ConcesionesAguaSubterrnea2_7',
    pane: 'pane_ConcesionesAguaSubterrnea2_7',
    onEachFeature: pop_ConcesionesAguaSubterrnea2_7,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.circleMarker(latlng, style_ConcesionesAguaSubterrnea2_7_0(feature));
    },
});
bounds_group.addLayer(layer_ConcesionesAguaSubterrnea2_7);
map.addLayer(layer_ConcesionesAguaSubterrnea2_7);
function pop_ConcesionesAguaSuperficial2_8(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Tipo Concesión:</th>\
                <td class="visible-with-data" id="Tipo aprov">' + (feature.properties['Tipo aprov'] !== null ? autolinker.link(String(feature.properties['Tipo aprov']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Titular: </th>\
                <td class="visible-with-data" id="Titular">' + (feature.properties['Titular'] !== null ? autolinker.link(String(feature.properties['Titular']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Uso:</th>\
                <td class="visible-with-data" id="Uso">' + (feature.properties['Uso'] !== null ? autolinker.link(String(feature.properties['Uso']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Vol (m3/año)</th>\
                <td class="visible-with-data" id="m3 o m2">' + (feature.properties['m3 o m2'] !== null ? autolinker.link(String(feature.properties['m3 o m2']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_ConcesionesAguaSuperficial2_8_0(feature) {
    if (feature.properties['m3 o m2'] >= 35.000000 && feature.properties['m3 o m2'] <= 100.000000 ) {
        return {
        pane: 'pane_ConcesionesAguaSuperficial2_8',
        radius: 2.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(72,170,231,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['m3 o m2'] >= 100.000000 && feature.properties['m3 o m2'] <= 1000.000000 ) {
        return {
        pane: 'pane_ConcesionesAguaSuperficial2_8',
        radius: 4.333333333333334,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(72,170,231,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['m3 o m2'] >= 1000.000000 && feature.properties['m3 o m2'] <= 10000.000000 ) {
        return {
        pane: 'pane_ConcesionesAguaSuperficial2_8',
        radius: 6.666666666666667,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(72,170,231,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['m3 o m2'] >= 10000.000000 && feature.properties['m3 o m2'] <= 100000.000000 ) {
        return {
        pane: 'pane_ConcesionesAguaSuperficial2_8',
        radius: 9.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(72,170,231,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['m3 o m2'] >= 100000.000000 && feature.properties['m3 o m2'] <= 1000000.000000 ) {
        return {
        pane: 'pane_ConcesionesAguaSuperficial2_8',
        radius: 11.333333333333334,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(72,170,231,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['m3 o m2'] >= 1000000.000000 && feature.properties['m3 o m2'] <= 10000000.000000 ) {
        return {
        pane: 'pane_ConcesionesAguaSuperficial2_8',
        radius: 13.666666666666666,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(72,170,231,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['m3 o m2'] >= 10000000.000000 && feature.properties['m3 o m2'] <= 100000000.000000 ) {
        return {
        pane: 'pane_ConcesionesAguaSuperficial2_8',
        radius: 16.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(72,170,231,1.0)',
        interactive: true,
    }
    }
}
map.createPane('pane_ConcesionesAguaSuperficial2_8');
map.getPane('pane_ConcesionesAguaSuperficial2_8').style.zIndex = 408;
map.getPane('pane_ConcesionesAguaSuperficial2_8').style['mix-blend-mode'] = 'normal';
var layer_ConcesionesAguaSuperficial2_8 = new L.geoJson(json_ConcesionesAguaSuperficial2_8, {
    attribution: '',
    interactive: true,
    dataVar: 'json_ConcesionesAguaSuperficial2_8',
    layerName: 'layer_ConcesionesAguaSuperficial2_8',
    pane: 'pane_ConcesionesAguaSuperficial2_8',
    onEachFeature: pop_ConcesionesAguaSuperficial2_8,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.circleMarker(latlng, style_ConcesionesAguaSuperficial2_8_0(feature));
    },
});
bounds_group.addLayer(layer_ConcesionesAguaSuperficial2_8);
map.addLayer(layer_ConcesionesAguaSuperficial2_8);
function pop_ConcesionesZonaFederal2_9(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Tipo de concesión:</th>\
                <td class="visible-with-data" id="Tipo aprov">' + (feature.properties['Tipo aprov'] !== null ? autolinker.link(String(feature.properties['Tipo aprov']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Titular:</th>\
                <td class="visible-with-data" id="Titular">' + (feature.properties['Titular'] !== null ? autolinker.link(String(feature.properties['Titular']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Uso: </th>\
                <td class="visible-with-data" id="Uso">' + (feature.properties['Uso'] !== null ? autolinker.link(String(feature.properties['Uso']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Sup (m2)</th>\
                <td class="visible-with-data" id="m3 o m2">' + (feature.properties['m3 o m2'] !== null ? autolinker.link(String(feature.properties['m3 o m2']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_ConcesionesZonaFederal2_9_0(feature) {
    if (feature.properties['m3 o m2'] >= 1.000000 && feature.properties['m3 o m2'] <= 10.000000 ) {
        return {
        pane: 'pane_ConcesionesZonaFederal2_9',
        radius: 2.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(190,207,80,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['m3 o m2'] >= 10.000000 && feature.properties['m3 o m2'] <= 100.000000 ) {
        return {
        pane: 'pane_ConcesionesZonaFederal2_9',
        radius: 3.7999999999999985,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(190,207,80,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['m3 o m2'] >= 100.000000 && feature.properties['m3 o m2'] <= 1000.000000 ) {
        return {
        pane: 'pane_ConcesionesZonaFederal2_9',
        radius: 5.599999999999997,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(190,207,80,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['m3 o m2'] >= 1000.000000 && feature.properties['m3 o m2'] <= 10000.000000 ) {
        return {
        pane: 'pane_ConcesionesZonaFederal2_9',
        radius: 7.399999999999995,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(190,207,80,1.0)',
        interactive: true,
    }
    }
    if (feature.properties['m3 o m2'] >= 10000.000000 && feature.properties['m3 o m2'] <= 100000.000000 ) {
        return {
        pane: 'pane_ConcesionesZonaFederal2_9',
        radius: 9.199999999999994,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(190,207,80,1.0)',
        interactive: true,
    }
    }
}
map.createPane('pane_ConcesionesZonaFederal2_9');
map.getPane('pane_ConcesionesZonaFederal2_9').style.zIndex = 409;
map.getPane('pane_ConcesionesZonaFederal2_9').style['mix-blend-mode'] = 'normal';
var layer_ConcesionesZonaFederal2_9 = new L.geoJson(json_ConcesionesZonaFederal2_9, {
    attribution: '',
    interactive: true,
    dataVar: 'json_ConcesionesZonaFederal2_9',
    layerName: 'layer_ConcesionesZonaFederal2_9',
    pane: 'pane_ConcesionesZonaFederal2_9',
    onEachFeature: pop_ConcesionesZonaFederal2_9,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.circleMarker(latlng, style_ConcesionesZonaFederal2_9_0(feature));
    },
});
bounds_group.addLayer(layer_ConcesionesZonaFederal2_9);
map.addLayer(layer_ConcesionesZonaFederal2_9);
function pop_MunicipioscentroVeracruz_10(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['NOMGEO'] !== null ? autolinker.link(String(feature.properties['NOMGEO']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Liga'] !== null ? autolinker.link(String(feature.properties['Liga']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_MunicipioscentroVeracruz_10_0() {
    return {
        pane: 'pane_MunicipioscentroVeracruz_10',
        opacity: 1,
        color: 'rgba(171,15,168,1.0)',
        dashArray: '8.0,4.0,2.0,4.0',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 2.0,
        fillOpacity: 0,
        interactive: true,
    }
}
map.createPane('pane_MunicipioscentroVeracruz_10');
map.getPane('pane_MunicipioscentroVeracruz_10').style.zIndex = 410;
map.getPane('pane_MunicipioscentroVeracruz_10').style['mix-blend-mode'] = 'normal';
var layer_MunicipioscentroVeracruz_10 = new L.geoJson(json_MunicipioscentroVeracruz_10, {
    attribution: '',
    interactive: true,
    dataVar: 'json_MunicipioscentroVeracruz_10',
    layerName: 'layer_MunicipioscentroVeracruz_10',
    pane: 'pane_MunicipioscentroVeracruz_10',
    onEachFeature: pop_MunicipioscentroVeracruz_10,
    style: style_MunicipioscentroVeracruz_10_0,
});
bounds_group.addLayer(layer_MunicipioscentroVeracruz_10);
function pop_CuencascentroVeracruz_11(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['TOPONIMO'] !== null ? autolinker.link(String(feature.properties['TOPONIMO']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['etiqueta'] !== null ? autolinker.link(String(feature.properties['etiqueta']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['cita'] !== null ? autolinker.link(String(feature.properties['cita']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_CuencascentroVeracruz_11_0() {
    return {
        pane: 'pane_CuencascentroVeracruz_11',
        opacity: 1,
        color: 'rgba(36,83,152,1.0)',
        dashArray: '20.0,10.0,5.0,10.0,5.0,10.0',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 5.0,
        fillOpacity: 0,
        interactive: true,
    }
}
map.createPane('pane_CuencascentroVeracruz_11');
map.getPane('pane_CuencascentroVeracruz_11').style.zIndex = 411;
map.getPane('pane_CuencascentroVeracruz_11').style['mix-blend-mode'] = 'screen';
var layer_CuencascentroVeracruz_11 = new L.geoJson(json_CuencascentroVeracruz_11, {
    attribution: '',
    interactive: true,
    dataVar: 'json_CuencascentroVeracruz_11',
    layerName: 'layer_CuencascentroVeracruz_11',
    pane: 'pane_CuencascentroVeracruz_11',
    onEachFeature: pop_CuencascentroVeracruz_11,
    style: style_CuencascentroVeracruz_11_0,
});
bounds_group.addLayer(layer_CuencascentroVeracruz_11);
function pop_Hidrologacentrover_12(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
            if (typeof layer.closePopup == 'function') {
                layer.closePopup();
            } else {
                layer.eachLayer(function(feature){
                    feature.closePopup()
                });
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['OBJECTID'] !== null ? autolinker.link(String(feature.properties['OBJECTID']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['ENTIDAD'] !== null ? autolinker.link(String(feature.properties['ENTIDAD']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['TIPO'] !== null ? autolinker.link(String(feature.properties['TIPO']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['FC'] !== null ? autolinker.link(String(feature.properties['FC']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['SHAPE_len'] !== null ? autolinker.link(String(feature.properties['SHAPE_len']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['Nombre'] !== null ? autolinker.link(String(feature.properties['Nombre']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_Hidrologacentrover_12_0() {
    return {
        pane: 'pane_Hidrologacentrover_12',
        opacity: 1,
        color: 'rgba(72,111,183,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 2.0,
        fillOpacity: 0,
        interactive: true,
    }
}
map.createPane('pane_Hidrologacentrover_12');
map.getPane('pane_Hidrologacentrover_12').style.zIndex = 412;
map.getPane('pane_Hidrologacentrover_12').style['mix-blend-mode'] = 'normal';
var layer_Hidrologacentrover_12 = new L.geoJson(json_Hidrologacentrover_12, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Hidrologacentrover_12',
    layerName: 'layer_Hidrologacentrover_12',
    pane: 'pane_Hidrologacentrover_12',
    onEachFeature: pop_Hidrologacentrover_12,
    style: style_Hidrologacentrover_12_0,
});
bounds_group.addLayer(layer_Hidrologacentrover_12);
const url = {"Nominatim": "https://nominatim.openstreetmap.org/search?format=geojson&addressdetails=1&",
"BAN": "https://api-adresse.data.gouv.fr/search/?"}
var photonControl = L.control.photon({
    url: url["BAN"],
    feedbackLabel: '',
    position: 'topleft',
    includePosition: true,
    initial: true,
    // resultsHandler: myHandler,
}).addTo(map);
photonControl._container.childNodes[0].style.borderRadius="10px"
// Create a variable to store the geoJSON data
var x = null;
// Create a variable to store the marker
var marker = null;
// Add an event listener to the Photon control to create a marker from the returned geoJSON data
var z = null;
photonControl.on('selected', function(e) {
    console.log(photonControl.search.resultsContainer);
    if (x != null) {
        map.removeLayer(obj3.marker);
        map.removeLayer(x);
    }
    obj2.gcd = e.choice;
    x = L.geoJSON(obj2.gcd).addTo(map);
    var label = typeof obj2.gcd.properties.label === 'undefined' ? obj2.gcd.properties.display_name : obj2.gcd.properties.label;
    obj3.marker = L.marker(x.getLayers()[0].getLatLng()).bindPopup(label).addTo(map);
    map.setView(x.getLayers()[0].getLatLng(), 17);
    z = typeof e.choice.properties.label === 'undefined'? e.choice.properties.display_name : e.choice.properties.label;
    console.log(e);
    e.target.input.value = z;
});
var search = document.getElementsByClassName("leaflet-photon leaflet-control")[0];
search.classList.add("leaflet-control-search")
search.style.display = "flex";
search.style.backgroundColor="rgba(255,255,255,0.5)" 

// Créer le nouvel élément bouton
var button = document.createElement("div");
button.id = "gcd-button-control";
button.className = "gcd-gl-btn fa fa-search search-button";

// Ajouter le bouton à l'élément parent
search.insertBefore(button, search.firstChild);
last = search.lastChild;
last.style.display = "none";
button.addEventListener("click", function (e) {
    if (last.style.display === "none") {
        last.style.display = "block";
    } else {
        last.style.display = "none";
    }
});
var overlaysTree = [
    {label: '<img src="legend/Hidrologacentrover_12.png" /> Hidrología centro ver', layer: layer_Hidrologacentrover_12},
    {label: '<img src="legend/CuencascentroVeracruz_11.png" /> Cuencas centro Veracruz', layer: layer_CuencascentroVeracruz_11},
    {label: '<img src="legend/MunicipioscentroVeracruz_10.png" /> Municipios centro Veracruz', layer: layer_MunicipioscentroVeracruz_10},
{label: '<b>Concesiones agua Centro Veracruz - REPDA</b>',  selectAllCheckbox: true, children: [
    {label: 'Concesiones Zona Federal 2<br /><table><tr><td style="text-align: center;"><img src="legend/ConcesionesZonaFederal2_9_11010.png" /></td><td>1 - 10^1</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesZonaFederal2_9_1011021.png" /></td><td>10^1 - 10^2</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesZonaFederal2_9_1021032.png" /></td><td>10^2 - 10^3</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesZonaFederal2_9_1031043.png" /></td><td>10^3 - 10^4</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesZonaFederal2_9_1041054.png" /></td><td>10^4 - 10^5</td></tr></table>', layer: layer_ConcesionesZonaFederal2_9},
    {label: 'Concesiones Agua Superficial 2<br /><table><tr><td style="text-align: center;"><img src="legend/ConcesionesAguaSuperficial2_8_351020.png" /></td><td>35 - 10^2</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesAguaSuperficial2_8_1021031.png" /></td><td>10^2 - 10^3</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesAguaSuperficial2_8_1031042.png" /></td><td>10^3 - 10^4</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesAguaSuperficial2_8_1041053.png" /></td><td>10^4 - 10^5</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesAguaSuperficial2_8_1051064.png" /></td><td>10^5 - 10^6</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesAguaSuperficial2_8_1061075.png" /></td><td>10^6 - 10^7</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesAguaSuperficial2_8_1071086.png" /></td><td>10^7 - 10^8</td></tr></table>', layer: layer_ConcesionesAguaSuperficial2_8},
    {label: 'Concesiones Agua Subterránea 2<br /><table><tr><td style="text-align: center;"><img src="legend/ConcesionesAguaSubterrnea2_7_8481030.png" /></td><td>848 - 10^3</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesAguaSubterrnea2_7_1031041.png" /></td><td>10^3 - 10^4</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesAguaSubterrnea2_7_1041052.png" /></td><td>10^4 - 10^5</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesAguaSubterrnea2_7_1051063.png" /></td><td>10^5 - 10^6</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesAguaSubterrnea2_7_1061074.png" /></td><td>10^6 - 10^7</td></tr></table>', layer: layer_ConcesionesAguaSubterrnea2_7},
    {label: 'Concesiones Descargas 2<br /><table><tr><td style="text-align: center;"><img src="legend/ConcesionesDescargas2_6_461020.png" /></td><td>46 - 10^2</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesDescargas2_6_1021031.png" /></td><td>10^2 - 10^3</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesDescargas2_6_1031042.png" /></td><td>10^3 - 10^4</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesDescargas2_6_1041053.png" /></td><td>10^4 - 10^5</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesDescargas2_6_1051064.png" /></td><td>10^5 - 10^6</td></tr><tr><td style="text-align: center;"><img src="legend/ConcesionesDescargas2_6_1061075.png" /></td><td>10^6 - 10^7</td></tr></table>', layer: layer_ConcesionesDescargas2_6},]},
{label: '<b>ANPs</b>',  selectAllCheckbox: true, children: [
    {label: '<img src="legend/ArchipilagodeBosquesySelvasdeXalapa_5.png" /> Archipiélago de Bosques y Selvas de Xalapa', layer: layer_ArchipilagodeBosquesySelvasdeXalapa_5},
    {label: '<img src="legend/ParqueLinealQuetzalapanSedeo_4.png" /> Parque Lineal Quetzalapan-Sedeño', layer: layer_ParqueLinealQuetzalapanSedeo_4},]},
    {label: "OpenStreetMap", layer: layer_OpenStreetMap_3},
    {label: "ESRI Satellite", layer: layer_ESRISatellite_2},
    {label: "ESRI Shaded Relief", layer: layer_ESRIShadedRelief_1},
    {label: "ESRI National Geographic", layer: layer_ESRINationalGeographic_0},]
var lay = L.control.layers.tree(null, overlaysTree,{
    //namedToggle: true,
    //selectorBack: false,
    //closedSymbol: '&#8862; &#x1f5c0;',
    //openedSymbol: '&#8863; &#x1f5c1;',
    //collapseAll: 'Collapse all',
    //expandAll: 'Expand all',
    collapsed: true,
});
lay.addTo(map);
setBounds();
var i = 0;
layer_MunicipioscentroVeracruz_10.eachLayer(function(layer) {
    var context = {
        feature: layer.feature,
        variables: {}
    };
    layer.bindTooltip((layer.feature.properties['NOMGEO'] !== null?String('<div style="color: #8b0b87; font-size: 10pt; font-family: \'Open Sans\', sans-serif;">' + layer.feature.properties['NOMGEO']) + '</div>':''), {permanent: true, offset: [-0, -16], className: 'css_MunicipioscentroVeracruz_10'});
    labels.push(layer);
    totalMarkers += 1;
        layer.added = true;
        addLabel(layer, i);
        i++;
});
var i = 0;
layer_CuencascentroVeracruz_11.eachLayer(function(layer) {
    var context = {
        feature: layer.feature,
        variables: {}
    };
    layer.bindTooltip((layer.feature.properties['TOPONIMO'] !== null?String('<div style="color: #ff7f00; font-size: 10pt; font-family: \'Open Sans\', sans-serif;">' + layer.feature.properties['TOPONIMO']) + '</div>':''), {permanent: true, offset: [-0, -16], className: 'css_CuencascentroVeracruz_11'});
    labels.push(layer);
    totalMarkers += 1;
        layer.added = true;
        addLabel(layer, i);
        i++;
});
resetLabels([layer_MunicipioscentroVeracruz_10,layer_CuencascentroVeracruz_11]);
map.on("zoomend", function(){
    resetLabels([layer_MunicipioscentroVeracruz_10,layer_CuencascentroVeracruz_11]);
});
map.on("layeradd", function(){
    resetLabels([layer_MunicipioscentroVeracruz_10,layer_CuencascentroVeracruz_11]);
});
map.on("layerremove", function(){
    resetLabels([layer_MunicipioscentroVeracruz_10,layer_CuencascentroVeracruz_11]);
});