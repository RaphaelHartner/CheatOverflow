/**
 * Created by Adelmann & Hartner
 */
"use strict";

function initializeShakerListener(){

    // define the Shake-event --> specified in "shake.js"-file
    var shakeEvent = new Shake({
        threshold: 10,
        timeout: 50
    });

    shakeEvent.start();
    
    window.addEventListener('shake', function(){
        window.open("../index.html", "_self");
    }, false)
}

$(document).ready(initializeShakerListener);