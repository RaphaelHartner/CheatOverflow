/**
 * Created by student on 3/10/16.
 */

var ctx = document.querySelector("canvas").getContext("2d");
var dashLen = 60;
var dashOffset = dashLen;
var speed = 10;
var txt = "Cheat-Overflow";
var x = 0;
var i = 0;

ctx.font = "30px Comic Sans MS, cursive, TSCu_Comic, sans-serif";
//alert(ctx.font);
ctx.lineWidth = 1;
ctx.lineJoin = "round";
//ctx.globalAlpha = 0.65;
ctx.strokeStyle = "#1f2f90";
ctx.fillStyle = "#1f2f90";

function animateHeader() {
    ctx.clearRect(x, 0, 360, 450);
    ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
    dashOffset -= speed;                                         // reduce dash length
    ctx.strokeText(txt[i], x, 30, 300);                               // stroke letter

    if (dashOffset > 0)
        requestAnimationFrame(animateHeader);             // animate
    else {
        ctx.fillText(txt[i], x, 30);                               // fill letter
        dashOffset = dashLen;                                      // prep next char
        x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();

        if (i < txt.length)
            requestAnimationFrame(animateHeader);
    }
};

function redraw(){
    x=0;
    i=0;
    animateHeader();
}

$(document).ready(redraw);