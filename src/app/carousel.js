"use strict";

var Carousel = function () {
    var $slides = $("#slides");
    var $middle = $slides.find(".slide.middle");
    var $left = $slides.find(".slide.left");
    var $right = $slides.find(".slide.right");
    var slides = [$left, $right, $middle];

    var interval;

    var rotateSlide = function (slide) {
        if (slide.hasClass("middle")) {
            slide.removeClass("middle");
            slide.addClass("left");
        } else if (slide.hasClass("left")) {
            slide.removeClass("left");
            slide.addClass("right");
        } else if (slide.hasClass("right")) {
            slide.removeClass("right");
            slide.addClass("middle");
        }
    };

    var rotateSlides = function () {
        for (var i = 0; i < slides.length; i++) {
            rotateSlide(slides[i]);
        }
    };

    var setSlideListeners = function () {
        $slides.mouseover(stopCarousel);
        $slides.mouseout(startCarousel);
        $slides.click(rotateSlides);
    };

    var startCarousel = function () {
        interval = setInterval(function () {
            rotateSlides();
        }, 3 * 1000);
    };

    var stopCarousel = function () {
        clearInterval(interval);
    };

    this.init = function () {
        setSlideListeners();
        startCarousel();
    };
};


export default Carousel;