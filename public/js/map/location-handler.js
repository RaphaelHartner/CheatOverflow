// created by Hartner & Adelmann

(function(){
    console.log("initialized address handler");

    $("#saveLocation").on("click", saveCurrentLocation);
    $("#deleteLocation").on("click", deleteCurrentLocation);
    refreshLocationList();

    function saveCurrentLocation(){

        var locations = [];

        if(localStorage["locations"] != null){
            locations = JSON.parse(localStorage["locations"]);
        }

        var displayName =  $("#displayName").val();
        var city =  $("#city").val();
        var street =  $("#street").val();
        var houseNumber=  $("#houseNumber").val();
        var currentLocation  = {"displayName": displayName, "city":city, "street": street, "houseNumber":houseNumber};

        locations.push(currentLocation);

        localStorage["locations"] = JSON.stringify(locations);
        console.log("Saved location: " + JSON.stringify(currentLocation));
        refreshLocationList();
    }

    function deleteCurrentLocation(){
        // if there are more than one locations with the same display name
        // only one of them will be deleted

        var storage =localStorage["locations"];
        if(storage == null){
            return;
        }

        var displayName =  $("#displayName").val();
        var location = getLocationByDisplayName(displayName);
        if(location == null){
            return;
        }

        var locations = JSON.parse(localStorage["locations"]);
        locations.splice(locations.indexOf(location), 1);
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
            var textNode = document.createTextNode(location.displayName);
            var att = document.createAttribute("id");
            att.value = location.displayName;
            var classAtt = document.createAttribute("class");
            classAtt.value = "location";

            node.setAttributeNode(classAtt);
            node.setAttributeNode(att);
            node.appendChild(textNode);
            $("#locationList").append(node);

        });

    }

    $(document).on("click", ".location", function() {
        var location = getLocationByDisplayName(this.id);
        if(location == null){
            return;
        }

        $("#displayName").val(location.displayName);
        $("#city").val(location.city);
        $("#street").val(location.street);
        $("#houseNumber").val(location.houseNumber);
    });

    function getLocationByDisplayName(displayName){

        var storage = localStorage["locations"];
        var l = null;

        if(storage ==null) {
            return l;
        }

        var locations = JSON.parse(storage);
        locations.forEach(function(location){
            if(location.displayName === displayName){
                l = location;
            }
        });
        return l;
    }

}());




