var highlightLayer;
function highlightFeature(e) {
    highlightLayer = e.target;

    if (e.target.feature.geometry.type === 'LineString' || e.target.feature.geometry.type === 'MultiLineString') {
        highlightLayer.setStyle({
        color: 'rgba(89, 209, 219, 1.00)',
        });
    } else {
        highlightLayer.setStyle({
        fillColor: 'rgba(89, 209, 219, 1.00)',
        fillOpacity: 1
        });
    }
}
var map = L.map('map', {
    zoomControl:false, maxZoom:24, minZoom:2
}).fitBounds([[19.446993227664212,-96.75085207074683],[19.536480667117235,-96.58818439089772]]);
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
// modify popup if contains media
function addClassToPopupIfMedia(content, popup) {
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    var imgTd = tempDiv.querySelector('td img');
    if (imgTd) {
        var src = imgTd.getAttribute('src');
        if (/\.(jpg|jpeg|png|gif|bmp|webp|avif)$/i.test(src)) {
            popup._contentNode.classList.add('media');
            setTimeout(function() {
                popup.update();
            }, 10);
        } else if (/\.(mp3|wav|ogg|aac)$/i.test(src)) {
            var audio = document.createElement('audio');
            audio.controls = true;
            audio.src = src;
            imgTd.parentNode.replaceChild(audio, imgTd);
            popup._contentNode.classList.add('media');
            setTimeout(function() {
                popup.setContent(tempDiv.innerHTML);
                popup.update();
            }, 10);
        } else if (/\.(mp4|webm|ogg|mov)$/i.test(src)) {
            var video = document.createElement('video');
            video.controls = true;
            video.src = src;
            video.style.width = "400px";
            video.style.height = "300px";
            video.style.maxHeight = "60vh";
            video.style.maxWidth = "60vw";
            imgTd.parentNode.replaceChild(video, imgTd);
            popup._contentNode.classList.add('media');
            // Aggiorna il popup quando il video carica i metadati
            video.addEventListener('loadedmetadata', function() {
                popup.update();
            });
            setTimeout(function() {
                popup.setContent(tempDiv.innerHTML);
                popup.update();
            }, 10);
        } else {
            popup._contentNode.classList.remove('media');
        }
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
    this._div.innerHTML = '<h2>Acciones ciudadanas por el agua - Región Xalapa </h2>';
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
map.createPane('pane_ESRISatellite_0');
map.getPane('pane_ESRISatellite_0').style.zIndex = 400;
var layer_ESRISatellite_0 = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    pane: 'pane_ESRISatellite_0',
    opacity: 1.0,
    attribution: '',
    minZoom: 2,
    maxZoom: 24,
    minNativeZoom: 0,
    maxNativeZoom: 20
});
layer_ESRISatellite_0;
map.addLayer(layer_ESRISatellite_0);
map.createPane('pane_OpenStreetMap_1');
map.getPane('pane_OpenStreetMap_1').style.zIndex = 401;
var layer_OpenStreetMap_1 = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    pane: 'pane_OpenStreetMap_1',
    opacity: 1.0,
    attribution: '',
    minZoom: 2,
    maxZoom: 24,
    minNativeZoom: 0,
    maxNativeZoom: 19
});
layer_OpenStreetMap_1;
map.addLayer(layer_OpenStreetMap_1);
function pop_BlitzNaolinco20072021_2(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_BlitzNaolinco20072021_2_0() {
    return {
        pane: 'pane_BlitzNaolinco20072021_2',
        radius: 4.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(196,60,57,1.0)',
        interactive: true,
    }
}
map.createPane('pane_BlitzNaolinco20072021_2');
map.getPane('pane_BlitzNaolinco20072021_2').style.zIndex = 402;
map.getPane('pane_BlitzNaolinco20072021_2').style['mix-blend-mode'] = 'normal';
var layer_BlitzNaolinco20072021_2 = new L.geoJson(json_BlitzNaolinco20072021_2, {
    attribution: '',
    interactive: true,
    dataVar: 'json_BlitzNaolinco20072021_2',
    layerName: 'layer_BlitzNaolinco20072021_2',
    pane: 'pane_BlitzNaolinco20072021_2',
    onEachFeature: pop_BlitzNaolinco20072021_2,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.circleMarker(latlng, style_BlitzNaolinco20072021_2_0(feature));
    },
});
bounds_group.addLayer(layer_BlitzNaolinco20072021_2);
map.addLayer(layer_BlitzNaolinco20072021_2);
function pop_Blitz20182_3(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Rio</th>\
                <td class="visible-with-data" id="Rio">' + (feature.properties['Rio'] !== null ? autolinker.link(String(feature.properties['Rio']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Categoria</th>\
                <td class="visible-with-data" id="Categoria">' + (feature.properties['Categoria'] !== null ? autolinker.link(String(feature.properties['Categoria']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_Blitz20182_3_0() {
    return {
        pane: 'pane_Blitz20182_3',
        radius: 4.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(255,127,0,1.0)',
        interactive: true,
    }
}
map.createPane('pane_Blitz20182_3');
map.getPane('pane_Blitz20182_3').style.zIndex = 403;
map.getPane('pane_Blitz20182_3').style['mix-blend-mode'] = 'normal';
var layer_Blitz20182_3 = new L.geoJson(json_Blitz20182_3, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Blitz20182_3',
    layerName: 'layer_Blitz20182_3',
    pane: 'pane_Blitz20182_3',
    onEachFeature: pop_Blitz20182_3,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.circleMarker(latlng, style_Blitz20182_3_0(feature));
    },
});
bounds_group.addLayer(layer_Blitz20182_3);
function pop_BlitzMuestreo2018_4(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Rio</th>\
                <td>' + (feature.properties['Rio'] !== null ? autolinker.link(String(feature.properties['Rio']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Categoria</th>\
                <td class="visible-with-data" id="Categoria">' + (feature.properties['Categoria'] !== null ? autolinker.link(String(feature.properties['Categoria']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_BlitzMuestreo2018_4_0() {
    return {
        pane: 'pane_BlitzMuestreo2018_4',
        radius: 4.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(183,72,75,1.0)',
        interactive: true,
    }
}
map.createPane('pane_BlitzMuestreo2018_4');
map.getPane('pane_BlitzMuestreo2018_4').style.zIndex = 404;
map.getPane('pane_BlitzMuestreo2018_4').style['mix-blend-mode'] = 'normal';
var layer_BlitzMuestreo2018_4 = new L.geoJson(json_BlitzMuestreo2018_4, {
    attribution: '',
    interactive: true,
    dataVar: 'json_BlitzMuestreo2018_4',
    layerName: 'layer_BlitzMuestreo2018_4',
    pane: 'pane_BlitzMuestreo2018_4',
    onEachFeature: pop_BlitzMuestreo2018_4,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.circleMarker(latlng, style_BlitzMuestreo2018_4_0(feature));
    },
});
bounds_group.addLayer(layer_BlitzMuestreo2018_4);
function pop_BlitzMuestreo2010_5(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">Rio</th>\
                <td class="visible-with-data" id="Rio">' + (feature.properties['Rio'] !== null ? autolinker.link(String(feature.properties['Rio']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <th scope="row">Categoria</th>\
                <td class="visible-with-data" id="Categoria">' + (feature.properties['Categoria'] !== null ? autolinker.link(String(feature.properties['Categoria']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_BlitzMuestreo2010_5_0() {
    return {
        pane: 'pane_BlitzMuestreo2010_5',
        radius: 4.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(141,90,153,1.0)',
        interactive: true,
    }
}
map.createPane('pane_BlitzMuestreo2010_5');
map.getPane('pane_BlitzMuestreo2010_5').style.zIndex = 405;
map.getPane('pane_BlitzMuestreo2010_5').style['mix-blend-mode'] = 'normal';
var layer_BlitzMuestreo2010_5 = new L.geoJson(json_BlitzMuestreo2010_5, {
    attribution: '',
    interactive: true,
    dataVar: 'json_BlitzMuestreo2010_5',
    layerName: 'layer_BlitzMuestreo2010_5',
    pane: 'pane_BlitzMuestreo2010_5',
    onEachFeature: pop_BlitzMuestreo2010_5,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.circleMarker(latlng, style_BlitzMuestreo2010_5_0(feature));
    },
});
bounds_group.addLayer(layer_BlitzMuestreo2010_5);
function pop_Recorridos20232024_6(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['layer'] !== null ? autolinker.link(String(feature.properties['layer']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_Recorridos20232024_6_0(feature) {
    switch(String(feature.properties['layer'])) {
        case '01: Manantiales de Tecajetes y 6ª de Juárez':
            return {
        pane: 'pane_Recorridos20232024_6',
        opacity: 1,
        color: 'rgba(114,19,239,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 3.0,
        fillOpacity: 0,
        interactive: true,
    }
            break;
        case '02: Colector Honduras, lecho antiguo del río Carneros':
            return {
        pane: 'pane_Recorridos20232024_6',
        opacity: 1,
        color: 'rgba(79,210,83,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 3.0,
        fillOpacity: 0,
        interactive: true,
    }
            break;
        case '03: Manantiales de Xalitic y arroyo Techacapan':
            return {
        pane: 'pane_Recorridos20232024_6',
        opacity: 1,
        color: 'rgba(194,103,210,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 3.0,
        fillOpacity: 0,
        interactive: true,
    }
            break;
        case '04: Río Carneros. IMAC':
            return {
        pane: 'pane_Recorridos20232024_6',
        opacity: 1,
        color: 'rgba(190,239,27,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 3.0,
        fillOpacity: 0,
        interactive: true,
    }
            break;
        case '05: Río Carneros, colonia Ferrer Guardia':
            return {
        pane: 'pane_Recorridos20232024_6',
        opacity: 1,
        color: 'rgba(205,40,35,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 3.0,
        fillOpacity: 0,
        interactive: true,
    }
            break;
        case '06: Río Carneros, presa de San Bruno':
            return {
        pane: 'pane_Recorridos20232024_6',
        opacity: 1,
        color: 'rgba(207,100,19,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 3.0,
        fillOpacity: 0,
        interactive: true,
    }
            break;
        case '07: Río Carneros y arroyo Papas':
            return {
        pane: 'pane_Recorridos20232024_6',
        opacity: 1,
        color: 'rgba(108,207,51,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 3.0,
        fillOpacity: 0,
        interactive: true,
    }
            break;
        case '08: Santuario de las Garzas':
            return {
        pane: 'pane_Recorridos20232024_6',
        opacity: 1,
        color: 'rgba(21,88,203,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 3.0,
        fillOpacity: 0,
        interactive: true,
    }
            break;
        case '09: Arroyo Papas':
            return {
        pane: 'pane_Recorridos20232024_6',
        opacity: 1,
        color: 'rgba(116,196,220,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 3.0,
        fillOpacity: 0,
        interactive: true,
    }
            break;
        case '10: Río Sordo':
            return {
        pane: 'pane_Recorridos20232024_6',
        opacity: 1,
        color: 'rgba(228,212,132,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 3.0,
        fillOpacity: 0,
        interactive: true,
    }
            break;
        case '11. La Morera':
            return {
        pane: 'pane_Recorridos20232024_6',
        opacity: 1,
        color: 'rgba(87,82,221,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 3.0,
        fillOpacity: 0,
        interactive: true,
    }
            break;
        case '12: Manantiales del centro':
            return {
        pane: 'pane_Recorridos20232024_6',
        opacity: 1,
        color: 'rgba(216,69,179,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 3.0,
        fillOpacity: 0,
        interactive: true,
    }
            break;
        case '13: Río Santiago':
            return {
        pane: 'pane_Recorridos20232024_6',
        opacity: 1,
        color: 'rgba(12,206,96,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 3.0,
        fillOpacity: 0,
        interactive: true,
    }
            break;
        case '14: Techacapan II':
            return {
        pane: 'pane_Recorridos20232024_6',
        opacity: 1,
        color: 'rgba(200,53,107,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 3.0,
        fillOpacity: 0,
        interactive: true,
    }
            break;
        default:
            return {
        pane: 'pane_Recorridos20232024_6',
        opacity: 1,
        color: 'rgba(68,227,200,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 3.0,
        fillOpacity: 0,
        interactive: true,
    }
            break;
    }
}
map.createPane('pane_Recorridos20232024_6');
map.getPane('pane_Recorridos20232024_6').style.zIndex = 406;
map.getPane('pane_Recorridos20232024_6').style['mix-blend-mode'] = 'normal';
var layer_Recorridos20232024_6 = new L.geoJson(json_Recorridos20232024_6, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Recorridos20232024_6',
    layerName: 'layer_Recorridos20232024_6',
    pane: 'pane_Recorridos20232024_6',
    onEachFeature: pop_Recorridos20232024_6,
    style: style_Recorridos20232024_6_0,
});
bounds_group.addLayer(layer_Recorridos20232024_6);
map.addLayer(layer_Recorridos20232024_6);
function pop_Registrofotovideorecorridos_7(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['Name'] !== null ? autolinker.link(String(feature.properties['Name']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['descriptio'] !== null ? autolinker.link(String(feature.properties['descriptio']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
            <tr>\
                <td colspan="2">' + (feature.properties['gx_media_l'] !== null ? autolinker.link(String(feature.properties['gx_media_l']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_Registrofotovideorecorridos_7_0() {
    return {
        pane: 'pane_Registrofotovideorecorridos_7',
        radius: 4.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(133,182,111,1.0)',
        interactive: true,
    }
}
map.createPane('pane_Registrofotovideorecorridos_7');
map.getPane('pane_Registrofotovideorecorridos_7').style.zIndex = 407;
map.getPane('pane_Registrofotovideorecorridos_7').style['mix-blend-mode'] = 'normal';
var layer_Registrofotovideorecorridos_7 = new L.geoJson(json_Registrofotovideorecorridos_7, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Registrofotovideorecorridos_7',
    layerName: 'layer_Registrofotovideorecorridos_7',
    pane: 'pane_Registrofotovideorecorridos_7',
    onEachFeature: pop_Registrofotovideorecorridos_7,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.circleMarker(latlng, style_Registrofotovideorecorridos_7_0(feature));
    },
});
bounds_group.addLayer(layer_Registrofotovideorecorridos_7);
map.addLayer(layer_Registrofotovideorecorridos_7);
function pop_CampaaAguapasapormiCasa_8(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <td colspan="2">' + (feature.properties['descriptio'] !== null ? autolinker.link(String(feature.properties['descriptio']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_CampaaAguapasapormiCasa_8_0() {
    return {
        pane: 'pane_CampaaAguapasapormiCasa_8',
        radius: 4.0,
        opacity: 1,
        color: 'rgba(35,35,35,1.0)',
        dashArray: '',
        lineCap: 'butt',
        lineJoin: 'miter',
        weight: 1,
        fill: true,
        fillOpacity: 1,
        fillColor: 'rgba(190,178,151,1.0)',
        interactive: true,
    }
}
map.createPane('pane_CampaaAguapasapormiCasa_8');
map.getPane('pane_CampaaAguapasapormiCasa_8').style.zIndex = 408;
map.getPane('pane_CampaaAguapasapormiCasa_8').style['mix-blend-mode'] = 'normal';
var layer_CampaaAguapasapormiCasa_8 = new L.geoJson(json_CampaaAguapasapormiCasa_8, {
    attribution: '',
    interactive: true,
    dataVar: 'json_CampaaAguapasapormiCasa_8',
    layerName: 'layer_CampaaAguapasapormiCasa_8',
    pane: 'pane_CampaaAguapasapormiCasa_8',
    onEachFeature: pop_CampaaAguapasapormiCasa_8,
    pointToLayer: function (feature, latlng) {
        var context = {
            feature: feature,
            variables: {}
        };
        return L.circleMarker(latlng, style_CampaaAguapasapormiCasa_8_0(feature));
    },
});
bounds_group.addLayer(layer_CampaaAguapasapormiCasa_8);
map.addLayer(layer_CampaaAguapasapormiCasa_8);
function pop_ParqueLinealQuetzalapanSedeo_9(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_ParqueLinealQuetzalapanSedeo_9_0() {
    return {
        pane: 'pane_ParqueLinealQuetzalapanSedeo_9',
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
map.createPane('pane_ParqueLinealQuetzalapanSedeo_9');
map.getPane('pane_ParqueLinealQuetzalapanSedeo_9').style.zIndex = 409;
map.getPane('pane_ParqueLinealQuetzalapanSedeo_9').style['mix-blend-mode'] = 'normal';
var layer_ParqueLinealQuetzalapanSedeo_9 = new L.geoJson(json_ParqueLinealQuetzalapanSedeo_9, {
    attribution: '',
    interactive: true,
    dataVar: 'json_ParqueLinealQuetzalapanSedeo_9',
    layerName: 'layer_ParqueLinealQuetzalapanSedeo_9',
    pane: 'pane_ParqueLinealQuetzalapanSedeo_9',
    onEachFeature: pop_ParqueLinealQuetzalapanSedeo_9,
    style: style_ParqueLinealQuetzalapanSedeo_9_0,
});
bounds_group.addLayer(layer_ParqueLinealQuetzalapanSedeo_9);
map.addLayer(layer_ParqueLinealQuetzalapanSedeo_9);
function pop_ArchipilagodeBosquesySelvasdeXalapa_10(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_ArchipilagodeBosquesySelvasdeXalapa_10_0() {
    return {
        pane: 'pane_ArchipilagodeBosquesySelvasdeXalapa_10',
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
map.createPane('pane_ArchipilagodeBosquesySelvasdeXalapa_10');
map.getPane('pane_ArchipilagodeBosquesySelvasdeXalapa_10').style.zIndex = 410;
map.getPane('pane_ArchipilagodeBosquesySelvasdeXalapa_10').style['mix-blend-mode'] = 'normal';
var layer_ArchipilagodeBosquesySelvasdeXalapa_10 = new L.geoJson(json_ArchipilagodeBosquesySelvasdeXalapa_10, {
    attribution: '',
    interactive: true,
    dataVar: 'json_ArchipilagodeBosquesySelvasdeXalapa_10',
    layerName: 'layer_ArchipilagodeBosquesySelvasdeXalapa_10',
    pane: 'pane_ArchipilagodeBosquesySelvasdeXalapa_10',
    onEachFeature: pop_ArchipilagodeBosquesySelvasdeXalapa_10,
    style: style_ArchipilagodeBosquesySelvasdeXalapa_10_0,
});
bounds_group.addLayer(layer_ArchipilagodeBosquesySelvasdeXalapa_10);
map.addLayer(layer_ArchipilagodeBosquesySelvasdeXalapa_10);
function pop_MunicipioscentroVeracruz_11(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
            <tr>\
                <th scope="row">NOMGEO</th>\
                <td class="visible-with-data" id="NOMGEO">' + (feature.properties['NOMGEO'] !== null ? autolinker.link(String(feature.properties['NOMGEO']).replace(/'/g, '\'').toLocaleString()) : '') + '</td>\
            </tr>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_MunicipioscentroVeracruz_11_0() {
    return {
        pane: 'pane_MunicipioscentroVeracruz_11',
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
map.createPane('pane_MunicipioscentroVeracruz_11');
map.getPane('pane_MunicipioscentroVeracruz_11').style.zIndex = 411;
map.getPane('pane_MunicipioscentroVeracruz_11').style['mix-blend-mode'] = 'normal';
var layer_MunicipioscentroVeracruz_11 = new L.geoJson(json_MunicipioscentroVeracruz_11, {
    attribution: '',
    interactive: true,
    dataVar: 'json_MunicipioscentroVeracruz_11',
    layerName: 'layer_MunicipioscentroVeracruz_11',
    pane: 'pane_MunicipioscentroVeracruz_11',
    onEachFeature: pop_MunicipioscentroVeracruz_11,
    style: style_MunicipioscentroVeracruz_11_0,
});
bounds_group.addLayer(layer_MunicipioscentroVeracruz_11);
map.addLayer(layer_MunicipioscentroVeracruz_11);
function pop_Rios_LaAntigua_12(feature, layer) {
    layer.on({
        mouseout: function(e) {
            for (var i in e.target._eventParents) {
                if (typeof e.target._eventParents[i].resetStyle === 'function') {
                    e.target._eventParents[i].resetStyle(e.target);
                }
            }
        },
        mouseover: highlightFeature,
    });
    var popupContent = '<table>\
        </table>';
    var content = removeEmptyRowsFromPopupContent(popupContent, feature);
    layer.on('popupopen', function(e) {
        addClassToPopupIfMedia(content, e.popup);
    });
    layer.bindPopup(content, { maxHeight: 400 });
}

function style_Rios_LaAntigua_12_0() {
    return {
        pane: 'pane_Rios_LaAntigua_12',
        opacity: 1,
        color: 'rgba(125,139,143,1.0)',
        dashArray: '',
        lineCap: 'square',
        lineJoin: 'bevel',
        weight: 1.0,
        fillOpacity: 0,
        interactive: true,
    }
}
map.createPane('pane_Rios_LaAntigua_12');
map.getPane('pane_Rios_LaAntigua_12').style.zIndex = 412;
map.getPane('pane_Rios_LaAntigua_12').style['mix-blend-mode'] = 'normal';
var layer_Rios_LaAntigua_12 = new L.geoJson(json_Rios_LaAntigua_12, {
    attribution: '',
    interactive: true,
    dataVar: 'json_Rios_LaAntigua_12',
    layerName: 'layer_Rios_LaAntigua_12',
    pane: 'pane_Rios_LaAntigua_12',
    onEachFeature: pop_Rios_LaAntigua_12,
    style: style_Rios_LaAntigua_12_0,
});
bounds_group.addLayer(layer_Rios_LaAntigua_12);
map.addLayer(layer_Rios_LaAntigua_12);
var overlaysTree = [
    {label: '<img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Rios_LaAntigua_12.png" /> Rios_LaAntigua', layer: layer_Rios_LaAntigua_12},
    {label: '<img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/MunicipioscentroVeracruz_11.png" /> Municipios centro Veracruz', layer: layer_MunicipioscentroVeracruz_11},
{label: '<b>ANPs</b>',  selectAllCheckbox: true, children: [
    {label: '<img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/ArchipilagodeBosquesySelvasdeXalapa_10.png" /> Archipiélago de Bosques y Selvas de Xalapa', layer: layer_ArchipilagodeBosquesySelvasdeXalapa_10},
    {label: '<img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/ParqueLinealQuetzalapanSedeo_9.png" /> Parque Lineal Quetzalapan-Sedeño', layer: layer_ParqueLinealQuetzalapanSedeo_9},]},
{label: '<b>Acciones por el agua</b>',  selectAllCheckbox: true, children: [
    {label: '<img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/CampaaAguapasapormiCasa_8.png" /> Campaña Agua pasa por mi Casa', layer: layer_CampaaAguapasapormiCasa_8},
    {label: '<img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Registrofotovideorecorridos_7.png" /> Registro foto video recorridos', layer: layer_Registrofotovideorecorridos_7},
    {label: 'Recorridos 2023 2024<br /><table><tr><td style="text-align: center;"><img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Recorridos20232024_6_01ManantialesdeTecajetesy6ªdeJuárez0.png" /></td><td>01: Manantiales de Tecajetes y 6ª de Juárez</td></tr><tr><td style="text-align: center;"><img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Recorridos20232024_6_02ColectorHonduraslechoantiguodelríoCarneros1.png" /></td><td>02: Colector Honduras, lecho antiguo del río Carneros</td></tr><tr><td style="text-align: center;"><img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Recorridos20232024_6_03ManantialesdeXaliticyarroyoTechacapan2.png" /></td><td>03: Manantiales de Xalitic y arroyo Techacapan</td></tr><tr><td style="text-align: center;"><img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Recorridos20232024_6_04RíoCarnerosIMAC3.png" /></td><td>04: Río Carneros. IMAC</td></tr><tr><td style="text-align: center;"><img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Recorridos20232024_6_05RíoCarneroscoloniaFerrerGuardia4.png" /></td><td>05: Río Carneros, colonia Ferrer Guardia</td></tr><tr><td style="text-align: center;"><img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Recorridos20232024_6_06RíoCarnerospresadeSanBruno5.png" /></td><td>06: Río Carneros, presa de San Bruno</td></tr><tr><td style="text-align: center;"><img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Recorridos20232024_6_07RíoCarnerosyarroyoPapas6.png" /></td><td>07: Río Carneros y arroyo Papas</td></tr><tr><td style="text-align: center;"><img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Recorridos20232024_6_08SantuariodelasGarzas7.png" /></td><td>08: Santuario de las Garzas</td></tr><tr><td style="text-align: center;"><img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Recorridos20232024_6_09ArroyoPapas8.png" /></td><td>09: Arroyo Papas</td></tr><tr><td style="text-align: center;"><img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Recorridos20232024_6_10RíoSordo9.png" /></td><td>10: Río Sordo</td></tr><tr><td style="text-align: center;"><img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Recorridos20232024_6_11LaMorera10.png" /></td><td>11. La Morera</td></tr><tr><td style="text-align: center;"><img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Recorridos20232024_6_12Manantialesdelcentro11.png" /></td><td>12: Manantiales del centro</td></tr><tr><td style="text-align: center;"><img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Recorridos20232024_6_13RíoSantiago12.png" /></td><td>13: Río Santiago</td></tr><tr><td style="text-align: center;"><img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Recorridos20232024_6_14TechacapanII13.png" /></td><td>14: Techacapan II</td></tr><tr><td style="text-align: center;"><img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Recorridos20232024_6_14.png" /></td><td></td></tr></table>', layer: layer_Recorridos20232024_6},]},
{label: '<b>Monitoreo calidad del agua -GWW</b>',  selectAllCheckbox: true, children: [
    {label: '<img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/BlitzMuestreo2010_5.png" /> Blitz Muestreo 2010', layer: layer_BlitzMuestreo2010_5},
    {label: '<img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/BlitzMuestreo2018_4.png" /> Blitz Muestreo 2018', layer: layer_BlitzMuestreo2018_4},
    {label: '<img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/Blitz20182_3.png" /> Blitz 2018-2', layer: layer_Blitz20182_3},
    {label: '<img src="/themes/custom/asamblea/mapa_03_nodo1126/legend/BlitzNaolinco20072021_2.png" /> Blitz Naolinco 2007-2021', layer: layer_BlitzNaolinco20072021_2},]},
    {label: "OpenStreetMap", layer: layer_OpenStreetMap_1, radioGroup: 'bm' },
    {label: "ESRI Satellite", layer: layer_ESRISatellite_0, radioGroup: 'bm' },]
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
layer_MunicipioscentroVeracruz_11.eachLayer(function(layer) {
    var context = {
        feature: layer.feature,
        variables: {}
    };
    layer.bindTooltip((layer.feature.properties['NOMGEO'] !== null?String('<div style="color: #8b0b87; font-size: 10pt; font-family: \'Open Sans\', sans-serif;">' + layer.feature.properties['NOMGEO']) + '</div>':''), {permanent: true, offset: [-0, -16], className: 'css_MunicipioscentroVeracruz_11'});
    labels.push(layer);
    totalMarkers += 1;
        layer.added = true;
        addLabel(layer, i);
        i++;
});
resetLabels([layer_BlitzMuestreo2010_5,layer_MunicipioscentroVeracruz_11]);
map.on("zoomend", function(){
    resetLabels([layer_BlitzMuestreo2010_5,layer_MunicipioscentroVeracruz_11]);
});
map.on("layeradd", function(){
    resetLabels([layer_BlitzMuestreo2010_5,layer_MunicipioscentroVeracruz_11]);
});
map.on("layerremove", function(){
    resetLabels([layer_BlitzMuestreo2010_5,layer_MunicipioscentroVeracruz_11]);
});
