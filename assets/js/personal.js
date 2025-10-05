window.onload = function () {
    typeWriter();
};

var i = 0;
var txt = "Hi! My name is Aaron, welcome to my personal website!";
/* The text */
var speed = 40; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("demo").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}
