/**
 * Created by Adelmann & Hartner
 */

'use strict';

(function(){
    console.log("initialized map.js");
    var map;
    initializeMap();

    function initializeMap() {
        map = new OpenLayers.Map("map");
        showCurrentLocation();
    }

    function showCurrentLocation(){
        navigator.geolocation.getCurrentPosition(setCurrentLocatinMarker);
    }

    function setCurrentLocatinMarker(position){

        var mapnik = new OpenLayers.Layer.OSM();
        map.addLayer(mapnik);

        var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
        var convertedPosition = new OpenLayers.LonLat(position.coords.longitude, position.coords.latitude).transform( fromProjection, toProjection);
        var zoom = 14;

        setMarkers(convertedPosition);

        // until now --> I (Hartner) can't figure out why i have to set the center twice
        map.setCenter(convertedPosition, zoom );
        addPopup({"locationName":"You are here", "position": convertedPosition});
        setLocationMarkers();
        map.setCenter(convertedPosition, zoom );
    }

    function setLocationMarkers(){
        var storage = localStorage["locations"];
        if(storage == null){
            return;
        }
        var locations = JSON.parse(storage);

        locations.forEach(function(location){
            setMarkers(location.position);
            addPopup(location);
        });
    }

    function setMarkers(position){
        
        var markers = new OpenLayers.Layer.Markers("Markers");
        map.addLayer(markers);
        markers.addMarker(new OpenLayers.Marker(position));
    }

    // inspired by openlayers examples
    // see http://dev.openlayers.org/examples/osm-marker-popup.js
    function addPopup(location){
        // A popup with some information about our location
        console.log("Add Popup: " + location.locationName);
        var popup = new OpenLayers.Popup.FramedCloud("Popup",
            {"lon":location.position.lon,"lat":location.position.lat}, null,
            location.locationName, null,
            true // <-- true if we want a close (X) button, false otherwise
        );
        map.addPopup(popup);
    }
}());



