window.onload = function () {
    loadQuestions();
    //document.getElementById("SaveQuestionToLocalStorage").addEventListener("click", function(){saveToLocalStorage(id, stackexsite)});
};

function loadQuestions() {
    var savedQuestions = [];
    if(localStorage["savedQuestions"] != null){
        savedQuestions = JSON.parse(localStorage["savedQuestions"]);
    }

    savedQuestions.forEach(function(question){
        document.getElementById("savedQuestions").innerHTML +=
            (question.questiontitle + ": <a href=\"answer.html?id="+ question.id + "&site=" + question.stackexsite + "\">Zur Frage</a> " +
            "<a href='#' onclick='deleteQuestion("+question.id +");return null;'>Löschen</a> <br/>");
    });
}

function deleteQuestion(id){

    var savedQuestions = localStorage["savedQuestions"];
    if(savedQuestions == null){
        return;
    }

    var index = getQuestionIndex(id);
    if(index == -1){
        return;
    }

    var questions = JSON.parse(localStorage["savedQuestions"]);
    questions.splice(index, 1);
    localStorage["savedQuestions"] = JSON.stringify(questions);
    window.location.reload(false);
}

function getQuestionIndex(id){

    var savedQuestions = localStorage["savedQuestions"];
    if(savedQuestions == null) {
        return -1;
    }

    var questions = JSON.parse(savedQuestions);
    var index = -1;
    for(var i = 0, len = questions.length; i < len; i++) {
        if (questions[i].id == id) {
            index = i;
            return index;
        }
    }
    return -1;
}