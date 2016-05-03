/**
 * Created by Adelmann & Hartner
 */

'use strict';

(function(){
    console.log("initialized map.js");
    var map;

    //initializeMap();
    getLocation();

    function getLocation(){
        navigator.geolocation.getCurrentPosition(initializeMap);
    }

    function initializeMap(position) {
        map = new OpenLayers.Map("map");
        var mapnik         = new OpenLayers.Layer.OSM();
        var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
        var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
        position       = new OpenLayers.LonLat(position.coords.longitude, position.coords.latitude).transform( fromProjection, toProjection);
        var zoom           = 15;

        map.addLayer(mapnik);
        map.setCenter(position, zoom );

        setMarkers(position);
    }

    function setMarkers(position){
        
        var markers = new OpenLayers.Layer.Markers("Markers");
        map.addLayer(markers);
        markers.addMarker(new OpenLayers.Marker(position));
    }

    function convertAddressToPosition(addr){
        $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + addr.value, function(data){
            return data;
        });
    }

    function getFormattedAddress(location){

    }
}());



