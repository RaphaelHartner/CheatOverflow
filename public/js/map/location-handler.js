/**
 * Created by Adelmann & Hartner
 */
"use strict";

(function(){
    console.log("initialized address handler");
    document.getElementById("stackexSite").innerHTML = '<option value="none">Noch nichts geladen...</option>';

    $("#saveLocation").on("click", saveCurrentLocation);
    $("#deleteLocation").on("click", deleteCurrentLocation);
    loadStackExchangeSites();
    refreshLocationList();

    //get the main stackexchange-sites and add them to the stackexchange-sites dropdowns
    function loadStackExchangeSites() {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://api.stackexchange.com/2.2/sites?key=bF8kysNL8Z2W7K5llHJgGg((", false);
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && (xhttp.status >= 200 && xhttp.status <300)) {

                var seSites = [];
                var items = JSON.parse(xhttp.responseText).items;
                for (var i = 0; i < items.length; i++) {

                    if(items[i].site_type == 'main_site') { //display only the main stackexchange sites
                        seSites.push(new StackSite(items[i].name, items[i].api_site_parameter));
                    }
                }

                document.getElementById("stackexSite").innerHTML = '';
                seSites.forEach(function(site) {
                    document.getElementById("stackexSite").innerHTML += '<option value="' + site.apiParam + '">' + site.title + '</option>';
                });
            }
        };
        xhttp.send();
    }

    function StackSite(title, apiParam) {
        this.title = title;
        this.apiParam = apiParam;
    }

    /*
        example for a valid location
            locationName="FH Joanneum Kapfenberg",
            fieldName="IT"
            StackExchange Site="Stack Overflow"
     */
    function saveCurrentLocation(){

        var locations = [];

        if(localStorage["locations"] != null){
            locations = JSON.parse(localStorage["locations"]);
        }

        var locationName = $("#locationName").val();
        var fieldName = $("#fieldName").val();
        var stackexSite = $("#stackexSite option:selected").text();
        var stackexParam = $("#stackexSite").val();
        var currentLocation  = {"locationName": locationName, "fieldName":fieldName, "siteName":stackexSite, "siteParam":stackexParam};
        var searchURL = 'http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + currentLocation.locationName;
        
        $.getJSON(searchURL, function(data){

            if(data.length == 0){
                alert("Unable to find requested location '" + locationName + "'!");
            }
            else {

                var position = data[0]; //get the position form the response data
                var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
                var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
                position = new OpenLayers.LonLat(position.lon, position.lat).transform(fromProjection, toProjection);

                currentLocation["position"] = position;
                locations.push(currentLocation);

                localStorage["locations"] = JSON.stringify(locations); //save current location
                console.log("Saved location: " + JSON.stringify(currentLocation));
                refreshLocationList();
            }
        });
    }

    // if there are more than one locations with the same name
    // only one of them will be deleted
    function deleteCurrentLocation(){

        var storage =localStorage["locations"];
        if(storage == null){
            return;
        }

        var locationName =  $("#locationName").val();
        var location = getLocationByName(locationName);
        if(location == null){
            return;
        }

        var locations = JSON.parse(localStorage["locations"]);

        var index = getLocationIndex(locationName);
        if(index >= 0) {
            locations.splice(index, 1);
        }

        localStorage["locations"] = JSON.stringify(locations);
        refreshLocationList();
    }

    function refreshLocationList(){

        var storage = localStorage["locations"];
        if(storage == null){
            return;
        }
        var locations = JSON.parse(storage);

        $("#locationList").empty();
        locations.forEach(function(location){

            var node = document.createElement("LI");
            var textNode = document.createTextNode(location.locationName + ", " + location.fieldName + ", " + location.siteName);
            var att = document.createAttribute("id");
            att.value = location.locationName;
            var classAtt = document.createAttribute("class");
            classAtt.value = "location";

            node.setAttributeNode(classAtt);
            node.setAttributeNode(att);
            node.appendChild(textNode);
            $("#locationList").append(node);
        });
    }

    $(document).on("click", ".location", function() {
        var location = getLocationByName(this.id);
        if(location == null){
            return;
        }

        $("#locationName").val(location.locationName);
        $("#fieldName").val(location.fieldName);
    });

    //returns locationdata for the given name
    function getLocationByName(name){

        var storage = localStorage["locations"];
        var l = null;

        if(storage ==null) {
            return l;
        }


        var index = getLocationIndex(name);
        if (index >= 0){
            var locations = JSON.parse(storage);
            l = locations[index];
        }

        return l;
    }

    //returns the index of the given locationname in the localstorage(locations)
    function getLocationIndex(name){
        var storage = localStorage["locations"];
        var index = -1;

        if(storage ==null) {
            return index;
        }

        var locations = JSON.parse(storage);
        for (var i = 0; i < locations.length; i++) {
            if(locations[i].locationName === name){
                index = i;
            }
        }
        return index;
    }
}());




