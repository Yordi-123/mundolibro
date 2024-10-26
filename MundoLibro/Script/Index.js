const btnLeft = document.querySelector(".btn-left"),
      btnRight = document.querySelector(".btn-right"),
      slider = document.querySelector("#slider"),
      sliderSection = document.querySelectorAll(".slider-section");

btnLeft.addEventListener("click", e => moverLeft())
btnRight.addEventListener("click", e => moverRight())

setInterval (() => {
    moverRight()
}, 3000);

let operacion = 0,
    counter = 0,
    widthImg = 100 / sliderSection.length;

function moverRight() {
    if (counter >= sliderSection.length-1) {
        counter = 0;
        operacion = 0;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "none"
    } else {
        counter ++;

        operacion = operacion + widthImg;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transform = "all ease .6s"
    } 
}

function moverLeft() {
    counter--;
    if (counter < 0 ) {
        counter = sliderSection.length - 1;
        operacion = widthImg * (sliderSection.length - 1)
        console.log(operacion)
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "none"
    } else {
        operacion = operacion - widthImg;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transform = "all ease .6s"
    } 
}

/* visitano en carrusel*/
function App() {}
    window.onload = function(event) {
        var app = new App();
        window.app = app;
    }

    App.prototype.processingButton = function(event) {
        const btn = event.currentTarget;
        const carruselList = event.currentTarget.parentNode;
        const track = event.currentTarget.parentNode.querySelector('#track');
        const carrusel = track.querySelectorAll('.carrusel');

        const carruselWidth = carrusel[0].offsetWidth;

        const trackWidth = track.offsetWidth;
        const listWidth = carruselList.offsetWidth;

        track.style.left == "" ? leftPosition = track.style.left = 0 :  leftPosition = parseFloat(track.style.left.slice(0,-2) * -1);
        btn.dataset.button == "button-prev" ? prevAction(leftPosition,carruselWidth,track) : nextAction(leftPosition,trackWidth, listWidth, carruselWidth, track);
    }

    let prevAction = (leftPosition, carruselWidth, track) => {
        if (leftPosition > 0) {
            track.style.left = `${-1 * (leftPosition - carruselWidth)}px`;
        }
    }

    let nextAction = (leftPosition, trackWidth, listWidth, carruselWidth, track) => {
        if (leftPosition < (trackWidth - listWidth)) {
            track.style.left = `${-1 * (leftPosition + carruselWidth)}px`;
        }
    }

    