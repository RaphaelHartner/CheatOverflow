window.onload = function () {
    var id = getQuestionID();
    var stackexsite = getStackexSite();
    loadQuestion(id, stackexsite);
    document.getElementById("SaveQuestionToLocalStorage").addEventListener("click", function(){saveToLocalStorage(id, stackexsite)});
};

//Question ID is in the URL in the GET-Parameter called "id"
function getQuestionID() {
    var url = window.location.href;
    var captured = /id=([^&]+)/.exec(url)[1];
    return resultID = captured ? captured : '0'; //if no id is found, return 0
}

function getStackexSite() {
    var url = window.location.href;
    var captured = /site=([^&]+)/.exec(url)[1];
    return result = captured ? captured : 'stackoverflow'; //if no site is found, use stackoverflow
}

function loadQuestion(id, stackexsite)
{
    var loadedFromLocalStorage = false;
    var savedQuestions = [];
    if(localStorage["savedQuestions"] != null){
        savedQuestions = JSON.parse(localStorage["savedQuestions"]);
    }

    for (var i = 0; i < savedQuestions.length; i++) {
        if(savedQuestions[i].id == id && savedQuestions[i].stackexsite == stackexsite)
        {
            document.getElementById("StackExchangeQuestionTitle").innerHTML = savedQuestions[i].questiontitle;
            document.getElementById("StackExchangeQuestionText").innerHTML = savedQuestions[i].question;
            document.getElementById("StackExchangeAnswers").innerHTML = savedQuestions[i].answers;
            loadedFromLocalStorage = true;
            break;
        }
    }

    if (!loadedFromLocalStorage) {
        var xhttp = new XMLHttpRequest();

        //&filter=!-*f(6rc.(Xr5&key=bF8kysNL8Z2W7K5llHJgGg((", true) --> to get the format of the answers
        xhttp.open("GET", "https://api.stackexchange.com/2.2/questions/" + id + "?order=desc&sort=activity&site=" + stackexsite + "&filter=!-*f(6rc.(Xr5&key=bF8kysNL8Z2W7K5llHJgGg((", true);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && (xhttp.status >= 200 && xhttp.status < 300)) {

                var items = JSON.parse(xhttp.responseText).items;

                document.getElementById("StackExchangeQuestionTitle").innerHTML = items[0].title;
                document.getElementById("StackExchangeQuestionText").innerHTML = items[0].body; //content incl. format

                var answers = items[0].answers;
                answers.forEach(function (answer) {
                    if (answer.is_accepted) {
                        document.getElementById("StackExchangeAnswers").innerHTML += "<article class=\"acceptedAnswer\">" + answer.body + "</article><hr />";
                    }
                    else {
                        document.getElementById("StackExchangeAnswers").innerHTML += "<p>" + answer.body + "</p><hr />"; //content incl. format
                    }
                });
            }
        };
        xhttp.send();
    }
}

function saveToLocalStorage(id, stackexsite) {
    var savedQuestions = [];
    if(localStorage["savedQuestions"] != null){
        savedQuestions = JSON.parse(localStorage["savedQuestions"]);
    }

    var questiontitle = document.getElementById("StackExchangeQuestionTitle").innerHTML;
    var question = document.getElementById("StackExchangeQuestionText").innerHTML;
    var answers = document.getElementById("StackExchangeAnswers").innerHTML;
    var currentQuestion = {"id": id, "stackexsite": stackexsite, "questiontitle": questiontitle, "question": question, "answers": answers};

    savedQuestions.push(currentQuestion);
    localStorage["savedQuestions"] = JSON.stringify(savedQuestions);
    alert("Frage für Offline-Verwendung gespeichert")
}