"use strict";

function slickSliderDirective($timeout) {
    return {
        //TODO there is a serious bug that I can't track down on the first click of the slides
        link: function (scope, element, attrs) {
            //Timeout used to allow DOM to load before attempting to execute slick initialization see http://stackoverflow.com/a/24523463
            $timeout(function () {
                $(element).slick(scope.$eval(attrs.data));
            });
        }
    };
}

slickSliderDirective.$inject = ["$timeout"];

export default slickSliderDirective;