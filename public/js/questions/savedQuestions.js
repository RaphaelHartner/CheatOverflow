/**
 * Created by Adelmann & Hartner
 */
"use strict";

window.onload = function () {
    loadQuestions();
};

//load requested question
function loadQuestions() {
    var savedQuestions = [];
    if(localStorage["savedQuestions"] != null){
        savedQuestions = JSON.parse(localStorage["savedQuestions"]);
    }

    savedQuestions.forEach(function(question){
        document.getElementById("savedQuestions").innerHTML +=
            (question.questiontitle + ": <a href=\"answer.html?id="+ question.id + "&site=" + question.stackexsite + "\">Details</a> " +
            "<a href='#' onclick='deleteQuestion("+question.id +");return null;'>Delete</a> <br/>");
    });
}

// deletes question with the given id from the local storage
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
    window.location.reload(false); //refreshes the page without getting it from the server 
}

//returns the the index of the requested id(local storage)
//if the id doesn't exist the function returns -1
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