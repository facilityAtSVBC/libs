// JavaScript file: myscript.js

document.addEventListener("DOMContentLoaded", function(event) {
    // Variables to change
    var pathToMapData = 'wp-content/uploads/2024/01/sver_svwr_january_2024.geojson';
    var centerLocal = [-121.940747, 37.360196];
    var contactInfo = '<p>SGI-USA Silicon Valley Buddhist Center<br>1875 De La Cruz Blvd<br>Santa Clara, CA 95050<br>+1 (408) 727-2604</p>';

    // Create HTML elements
    var mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapDiv.style.width = '100%';
    mapDiv.style.height = '80vh';

    // Create Info box
    var infoBoxDiv = document.createElement('div');
    infoBoxDiv.id = 'info_box';
    infoBoxDiv.style.position = 'absolute';
    infoBoxDiv.style.bottom = '60px';
    infoBoxDiv.style.right = '50px';
    infoBoxDiv.style.backgroundColor = '#ffffffee';
    infoBoxDiv.style.textAlign = 'center';
    infoBoxDiv.style.padding = '10px 10px 0 10px';
    infoBoxDiv.style.visibility = 'hidden';

    var districtNameDisplayDiv = document.createElement('div');
    districtNameDisplayDiv.id = 'districtNameDisplay';

    var chapterNameDisplayDiv = document.createElement('div');
    chapterNameDisplayDiv.id = 'chapterNameDisplay';

    var tellMeMoreBtnDiv = document.createElement('div');
    tellMeMoreBtnDiv.style.letterSpacing = '1px';
    tellMeMoreBtnDiv.style.textAlign = 'center';
    tellMeMoreBtnDiv.style.textDecoration = 'none';
    tellMeMoreBtnDiv.style.cursor = 'pointer';
    tellMeMoreBtnDiv.style.border = '2px solid #f1f1f1';
    tellMeMoreBtnDiv.style.padding = '8px 35px';
    tellMeMoreBtnDiv.style.verticalAlign = 'middle';
    tellMeMoreBtnDiv.style.WebkitAppearance = 'none';
    tellMeMoreBtnDiv.style.margin = '5px 10px';
    tellMeMoreBtnDiv.style.height = 'auto';
    tellMeMoreBtnDiv.style.display = 'inline-block';
    tellMeMoreBtnDiv.style.width = 'auto';

    var tellMeMoreLink = document.createElement('a');
    tellMeMoreLink.id = 'tell_me_more_btn';
    tellMeMoreLink.href = '#';
    tellMeMoreLink.onclick = tellMeMore;
    tellMeMoreLink.innerHTML = 'Tell me more!!';

    tellMeMoreBtnDiv.appendChild(tellMeMoreLink);
    infoBoxDiv.appendChild(districtNameDisplayDiv);
    infoBoxDiv.appendChild(chapterNameDisplayDiv);
    infoBoxDiv.appendChild(tellMeMoreBtnDiv);

    var mobileTargetP = document.createElement('p');
    mobileTargetP.id = 'mobile_target';
    mobileTargetP.style.color = '#ffffff';
    mobileTargetP.style.position = 'absolute';
    mobileTargetP.style.left = '50%';
    mobileTargetP.style.top = '50%';
    mobileTargetP.style.marginTop = '-12px';
    mobileTargetP.style.marginLeft = '-4px';
    mobileTargetP.innerHTML = '+';

    // create overall container
    var containerDiv = document.createElement('div');
    containerDiv.style.position = 'relative';
    containerDiv.appendChild(mapDiv);
    containerDiv.appendChild(infoBoxDiv);
    containerDiv.appendChild(mobileTargetP);

    document.getElementById("district_reference_container").appendChild(containerDiv);

    // Mapbox access token
    mapboxgl.accessToken = document.getElementById("district_reference_container").getAttribute("token-value");

    // Get environment URL
    var environmentUrl = document.URL.substring(0, document.URL.indexOf('district-reference'));

    // Map GeoJSON URL
    var mapGeoJsonUrl = environmentUrl + pathToMapData;

    var mapGeoFile = null;
    var currentPolygon = null;
    var hoveredDistrictId = null;
    var centerMessageShown = false;

    // Load GeoJSON file
    jQuery.getJSON(mapGeoJsonUrl, function (file) {
        mapGeoFile = L.geoJSON(file);
    });

    // Check if user is on a mobile device
    var isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4));

    // Create Mapbox map
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/kenny-gajokai/cjxwvjd5f0lln1clmh1pc8cbe',
        center: centerLocal,
        zoom: 10.7
    });

    // Create the popup for center info
    var popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(contactInfo);

    // Set visibility of mobile target
    document.getElementById('mobile_target').style.visibility = isMobile ? 'visible' : 'hidden';

    // Add Mapbox Geocoder control
    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: {
            color: 'red'
        },
        mapboxgl: mapboxgl
    }));

    // Add Mapbox navigation control
    map.addControl(new mapboxgl.NavigationControl());

    // Create district popup
    var districtPopup = new mapboxgl.Popup({
        closeButton: false,
        clostOnClick: false
    });

    // "Tell Me More" function
    function tellMeMore() {
        if (currentPolygon.properties.region_name == 'SVWR') {
            openSVWRPopUp(currentPolygon.properties.district_name, currentPolygon.properties.chapter_name);
        } else {
            openSVERPopUp(currentPolygon.properties.district_name, currentPolygon.properties.chapter_name);
        }
    }

    // Open SVWR popup
    function openSVWRPopUp(districtName, chapterName) {
        openInfoPopup(114, districtName, chapterName);
    }

    // Open SVER popup
    function openSVERPopUp(districtName, chapterName) {
        openInfoPopup(254, districtName, chapterName);
    }

    // Open info popup
    function openInfoPopup(pumNumber, districtName, chapterName) {
        PUM.open(pumNumber);
        PUM.getPopup(pumNumber)
            .find('.pum-title')
            .html(districtName + ' - ' + chapterName);
        PUM.getPopup(pumNumber)
            .find('input[name="district-name"]')[0].value = districtName;
        PUM.getPopup(pumNumber)
            .find('input[name="chapter-name"]')[0].value = chapterName;
    }

    // Click function for map features
    var clickFunc = function (e) {
        if (e.features[0].properties.region_name == 'SVWR') {
            openSVWRPopUp(e.features[0].properties.district_name, e.features[0].properties.chapter_name);
        } else {
            openSVERPopUp(e.features[0].properties.district_name, e.features[0].properties.chapter_name);
        }
    };

    // Update info box
    function updateInfoBox(districtName, chapterName) {
        document.getElementById('districtNameDisplay').innerHTML = '<p>' + districtName + '</p>';
        document.getElementById('chapterNameDisplay').innerHTML = '<p>' + chapterName + '</p>';
        document.getElementById('info_box').style.visibility = 'visible';
        document.getElementById('tell_me_more_btn').style.visibility = 'visible';
    }

    // Hide info box
    function hideInfoBox() {
        document.getElementById('info_box').style.visibility = 'hidden';
        document.getElementById('tell_me_more_btn').style.visibility = 'hidden';
        document.getElementById('districtNameDisplay').innerHTML = '';
        document.getElementById('chapterNameDisplay').innerHTML = '';
        currentPolygon = null;
    }

    // Update popup
    function updatePopUp(latLng, districtName, chapterName) {
        if (!centerMessageShown) {
            map.getCanvas().style.cursor = 'pointer';
            districtPopup.setLngLat(latLng)
                .setHTML(districtName)
                .addTo(map);

            if (!isMobile) {
                updateInfoBox(districtName, chapterName);
            }
        } else {
            districtPopup.remove();
        }
    }

    // Hide highlight
    function hideHighlight() {
        if (hoveredDistrictId) {
            map.setFeatureState({ 'source': 'map-poly', 'id': hoveredDistrictId }, { hover: false });
            hoveredDistrictId = null;
        }
    }

    // Show highlight
    function showHighlight(feature) {
        hideHighlight();
        hoveredDistrictId = feature.id;
        if (hoveredDistrictId == 0) {
            for (const layer of Object.values(mapGeoFile._layers)) {
                if (layer.feature.properties.district_name == feature.properties.district_name && layer.feature.properties.chapter_name == feature.properties.chapter_name) {
                    hoveredDistrictId = layer.feature.id;
                    break;
                }
            }
        }
        if (hoveredDistrictId) {
            if (hoveredDistrictId == 0) {
                feature.id = 999;
                hoveredDistrictId = feature.id;
            }
            map.setFeatureState({ 'source': 'map-poly', 'id': hoveredDistrictId }, { hover: true });
        }
    }

    // Mouse enter function for map features
    var mouseEnterFunc = function (e) {
        currentPolygon = e.features[0];
        updatePopUp(e.lngLat, e.features[0].properties.district_name, e.features[0].properties.chapter_name);
    };

    // Mouse move function for map features
    var mouseMoveFunc = function (e) {
        currentPolygon = e.features[0];
        updatePopUp(e.lngLat, e.features[0].properties.district_name, e.features[0].properties.chapter_name);
        var features = map.queryRenderedFeatures(e.point);
        if (features.length > 0) {
            showHighlight(features[0]);
        }
    };

    // Mouse leave function for map features
    var mouseLeaveFunc = function () {
        districtPopup.remove();
        map.getCanvas().style.cursor = '';
        hideHighlight();
    };

    // Map layers
    var mapPolyLayer = {
        'id': 'map-layer',
        'type': 'fill',
        'source': 'map-poly',
        'paint': {
            'fill-color': [
                'case',
                ['==', ['get', 'chapter_name'], 'San Jose Chapter'],
                ['case',
                    ['boolean', ['feature-state', 'hover'], false], '#ff867c', '#ef5350'],
                ['==', ['get', 'chapter_name'], 'Peninsula Chapter'],
                ['case',
                    ['boolean', ['feature-state', 'hover'], false], '#ff77a9', '#ec407a'],
                ['==', ['get', 'chapter_name'], 'South Valley Chapter'],
                ['case',
                    ['boolean', ['feature-state', 'hover'], false], '#df78ef', '#ab47bc'],
                ['==', ['get', 'chapter_name'], 'Sunnyvale Chapter'],
                ['case',
                    ['boolean', ['feature-state', 'hover'], false], '#8e99f3', '#5c6bc0'],
                ['==', ['get', 'chapter_name'], 'Santa Clara Chapter'],
                ['case',
                    ['boolean', ['feature-state', 'hover'], false], '#80d6ff', '#42a5f5'],
                ['==', ['get', 'chapter_name'], 'Santa Clara Chapter'],
                ['case',
                    ['boolean', ['feature-state', 'hover'], false], '#6ff9ff', '#26c6da'],
                ['==', ['get', 'chapter_name'], 'Monterey Chapter'],
                ['case',
                    ['boolean', ['feature-state', 'hover'], false], '#98ee99', '#66bb6a'],
                ['==', ['get', 'chapter_name'], 'Willow Glen Chapter'],
                ['case',
                    ['boolean', ['feature-state', 'hover'], false], '#666ad1', '#303f9f'],
                ['==', ['get', 'chapter_name'], 'North Monterey County Chapter'],
                ['case',
                    ['boolean', ['feature-state', 'hover'], false], '#ffff8b', '#ffee58'],
                ['==', ['get', 'chapter_name'], 'Santa Curz Chapter'],
                ['case',
                    ['boolean', ['feature-state', 'hover'], false], '#ffd95b', '#ffa726'],
                ['==', ['get', 'chapter_name'], 'West Valley Chapter'],
                ['case',
                    ['boolean', ['feature-state', 'hover'], false], '#ffff72', '#ffeb3b'],
                ['==', ['get', 'chapter_name'], 'Mountain View Chapter'],
                ['case',
                    ['boolean', ['feature-state', 'hover'], false], '#76d275', '#43a047'],
                '#ff0000'
            ],
            'fill-opacity': 0.5
        }
    };

    // Map load event
    map.on('load', function () {
        // Add a layer showing the state polygons
        map.addSource('map-poly', {
            'type': 'geojson',
            'data': mapGeoJsonUrl,
            'generateId': true
        });
        map.addLayer(mapPolyLayer);

        map.addLayer({
            'id': 'map-layer-line',
            'type': 'line',
            'source': 'map-poly',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#333',
                'line-width': 3
            }
        });
        map.addLayer({
            'id': 'map-layer-line-white',
            'type': 'line',
            'source': 'map-poly',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': ['case',
                    ['boolean', ['feature-state', 'hover'], false], '#ffffff', 'rgba(0, 0, 0, 0)'],
                'line-width': 3
            }
        });
        map.addLayer({
            'id': 'svbc',
            'type': 'symbol',
            'source': {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [{
                        'type': 'Feature',
                        'geometry': {
                            'coordinates': [-121.940618, 37.360246],
                            'type': 'Point'
                        }
                    }]
                }
            },
            'layout': {
                'icon-image': 'marker-editor',
                'icon-allow-overlap': true
            }
        });

        // Map click event
        map.on('click', 'map-layer', clickFunc);
        // Change the cursor to a pointer when the mouse is over the states layer.
        map.on('mouseenter', 'map-layer', mouseEnterFunc);
        map.on('mousemove', 'map-layer', mouseMoveFunc);
        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'map-layer', mouseLeaveFunc);

        map.on('movestart', function (e) {
            hideInfoBox();
            hideHighlight();
        });
        map.on('moveend', function (e) {
            if (isMobile) {
                if (mapGeoFile != null) {
                    var results = leafletPip.pointInLayer(map.getCenter(), mapGeoFile);
                    if (results.length > 0) {
                        var features = map.querySourceFeatures('map-poly', {
                            sourceLayer: 'map-layer',
                            filter: ['in', 'district_name', results[0].feature.properties.district_name]
                        });

                        if (features.length > 0) {
                            currentPolygon = features[0];
                            updateInfoBox(currentPolygon.properties.district_name, currentPolygon.properties.chapter_name);
                            showHighlight(currentPolygon);
                        }
                    }
                }
            }
        });

        map.on('mouseenter', 'svbc', function (e) {
            var coordinates = e.features[0].geometry.coordinates.slice();
            centerMessageShown = true;
            popup.setLngLat(coordinates)
                .addTo(map);
        });
        map.on('mouseleave', 'svbc', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
            centerMessageShown = false;
        });
    });
});
