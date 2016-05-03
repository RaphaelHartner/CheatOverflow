/**
 * Created by student on 3/10/16.
 */

var canvas = $("#header_canvas")[0];//document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var dashLen = 60;
var dashOffset = dashLen;
var speed = 10;
var txt = "Cheat-Overflow";
var x = 0;
var i = 0;

function animateHeader() {
    ctx.clearRect(0, 0, canvas.height, canvas.width);
    ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
    dashOffset -= speed;                                         // reduce dash length
    ctx.strokeText(txt[i], x, 30);                               // stroke letter

    if (dashOffset > 0)
        requestAnimationFrame(animateHeader);             // animate
    else {
        ctx.fillText(txt[i], x, 30);                               // fill letter
        dashOffset = dashLen;                                      // prep next char
        x += ctx.measureText(txt[i++]).width + ctx.lineWidth;

        if (i < txt.length)
            requestAnimationFrame(animateHeader);
    }
}

function redraw(){
    // not possible in css, because it will be handled like an image
    // therefore it doesn't changes the size of the coordination system
    canvas.width = 350;
    canvas.height = 50;
    setContexProperties();
    x = (canvas.width / 2) - (ctx.measureText(txt).width + ctx.lineWidth*txt.length) / 2;
    i=0;

    animateHeader();
}

function setContexProperties(){
    ctx.font = "30px Comic Sans MS, cursive, TSCu_Comic, sans-serif";
    ctx.lineWidth = 1;
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1f2f90";
    ctx.fillStyle = "#1f2f90";
}

$(document).ready(redraw);