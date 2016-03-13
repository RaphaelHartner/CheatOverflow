//var worker = new Worker("worker.js");

window.onload = function(){
	loadQuestions();
	startTimer();
};

function startTimer(){
	var timer = setInterval(loadQuestions, 10000);
}

function loadQuestions(){
	console.log("lade Fragen");
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged=json&site=stackoverflow&key=bF8kysNL8Z2W7K5llHJgGg((", true);
	xhttp.onreadystatechange = function() { 
		if (xhttp.readyState == 4 && (xhttp.status >= 200 && xhttp.status <300)) {
			var items = JSON.parse(xhttp.responseText).items;
			document.getElementById("resentJSONquestions").innerHTML = "";
			for (var i = 0; i < 5; i++)
			{
				document.getElementById("resentJSONquestions").innerHTML += items[i].title + ": " + "  <a href=\"" + items[i].link + "\" target=\"_blank\">zur Frage</a>" + "<br />";
			};
		};
	};	
	xhttp.send();
}