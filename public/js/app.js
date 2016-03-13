window.onload = function(){
	loadQuestions();
	startTimer();
};


function startTimer(){
	var timer = setInterval(loadQuestions, 10000);
}

//could have been done in a webworker, but we didn't manage to run webworkers :(
function loadQuestions(){
	console.log("lade Fragen");
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged=json&site=stackoverflow&key=bF8kysNL8Z2W7K5llHJgGg((", true);
	xhttp.onreadystatechange = function() { 
		if (xhttp.readyState == 4 && (xhttp.status >= 200 && xhttp.status <300)) {
			var questions = [];
			var items = JSON.parse(xhttp.responseText).items;
			for (var i = 0; i < 5; i++)
			{
				questions.push(new Question(items[i].question_id, items[i].title, items[i].link));
			}

			document.getElementById("resentJSONquestions").innerHTML = "";
			questions.forEach(function(question) {
				document.getElementById("resentJSONquestions").innerHTML += question.toString();
			});
		};
	};	
	xhttp.send();
}

function Question(id, title, link) {
	this.link = link;
	this.title = title;
	this.id = id;
}

Question.prototype.toString = function() {
	return this.title + ": " + "  <a href=\"" + this.link + "\" target=\"_blank\">zur Frage</a>" + "<br />";
}