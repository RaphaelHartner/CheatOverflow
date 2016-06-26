window.onload = function () {
    loadQuestions();
    navigator.geolocation.getCurrentPosition(getNearestLocationFromStorage);
    document.getElementById("searchStackExchange").addEventListener("click", loadSearchedQuestions);
    startTimer();
};

var stackexForumParam = 'stackoverflow';

function startTimer() {
    setInterval(loadQuestions, 10000);
}

//could have been done in a webworker, but we didn't manage to run webworkers :(
function loadQuestions() {
    console.log("lade Fragen");
    loadJSONQuestions();
    loadJavaScriptQuestions();
    loadHTMLQuestions();
}

function getNearestLocationFromStorage(position) {

    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var convertedPosition = new OpenLayers.LonLat(position.coords.longitude, position.coords.latitude).transform( fromProjection, toProjection);

    var storage = localStorage["locations"];
    if (storage == null) {
        return;
    }
    var locations = JSON.parse(storage);

    var nearest = 999999999;

    locations.forEach(function (location){

        //distance long
        var distlong = Math.abs(convertedPosition.lon - location.position.lon);

        //distance lat
        var distlat = Math.abs(convertedPosition.lat - location.position.lat);

        var distance = distlong + distlat;

        if (distance < nearest){

            nearest = distance;
            stackexForumParam = location.siteParam;
            document.getElementById("currentForum").innerHTML = location.siteName;
        }
    });
}

function loadSearchedQuestions() {

    var searchParameter = document.getElementById("searchParam").value;

    var storage = localStorage["locations"];
    if (storage == null) {
        return;
    }
    var locations = JSON.parse(storage);

    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&answers=1&title="+ searchParameter +"&site=" + stackexForumParam + "&key=bF8kysNL8Z2W7K5llHJgGg((", true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && (xhttp.status >= 200 && xhttp.status < 300)) {

            var questions = [];
            var items = JSON.parse(xhttp.responseText).items;
            for (var i = 0; i < 10; i++) {
                questions.push(new Question(items[i].question_id, items[i].title, items[i].link, stackexForumParam));
            }

            document.getElementById("QuestionsFound").innerHTML = "";
            questions.forEach(function (question) {
                document.getElementById("QuestionsFound").innerHTML += question.toString();
            });
        }
    };
    xhttp.send();
}

function loadJSONQuestions() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged=json&site=stackoverflow&key=bF8kysNL8Z2W7K5llHJgGg((", true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && (xhttp.status >= 200 && xhttp.status < 300)) {

            var questions = [];
            var items = JSON.parse(xhttp.responseText).items;
            for (var i = 0; i < 5; i++) {
                questions.push(new Question(items[i].question_id, items[i].title, items[i].link, 'stackoverflow'));
            }

            document.getElementById("resentJSONquestions").innerHTML = "";
            questions.forEach(function (question) {
                document.getElementById("resentJSONquestions").innerHTML += question.toString();
            });
        }
    };
    xhttp.send();
}

function loadJavaScriptQuestions() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged=javascript&site=stackoverflow&key=bF8kysNL8Z2W7K5llHJgGg((", true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && (xhttp.status >= 200 && xhttp.status < 300)) {
            var questions = [];
            var items = JSON.parse(xhttp.responseText).items;
            for (var i = 0; i < 5; i++) {
                questions.push(new Question(items[i].question_id, items[i].title, items[i].link, 'stackoverflow'));
            }

            document.getElementById("resentJavaScriptQuestions").innerHTML = "";
            questions.forEach(function (question) {
                document.getElementById("resentJavaScriptQuestions").innerHTML += question.toString();
            });
        }
    };
    xhttp.send();
}

function loadHTMLQuestions() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged=html5&site=stackoverflow&key=bF8kysNL8Z2W7K5llHJgGg((", true);
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && (xhttp.status >= 200 && xhttp.status < 300)) {
            var questions = [];
            var items = JSON.parse(xhttp.responseText).items;
            for (var i = 0; i < 5; i++) {
                questions.push(new Question(items[i].question_id, items[i].title, items[i].link, 'stackoverflow'));
            }

            document.getElementById("resentHTMLquestions").innerHTML = "";
            questions.forEach(function (question) {
                document.getElementById("resentHTMLquestions").innerHTML += question.toString();
            });
        }
    };
    xhttp.send();
}

function Question(id, title, link, stackexParam) {
    this.link = link;
    this.title = title;
    this.id = id;
    this.stackexParam = stackexParam;
}

Question.prototype.toString = function () {
    return this.title + ": " + "  <a href=\"html/answer.html?id=" + this.id + "&site=" + this.stackexParam + "\" target=\"_self\">zur Frage</a>" + "<br />";
    //return this.title + ": " + "  <a href=\"" + this.link + "\" target=\"_blank\">zur Frage</a>" + "<br />";
};

