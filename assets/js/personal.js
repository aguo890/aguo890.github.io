window.onload = function () {
    typeWriter();
};

var i = 0;
var txt = "Hi! My name is Aaron, I'm a Junior at the George Washington University with a passion for Data.";
/* The text */
var speed = 40; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("demo").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}
