(function (angular) {
    "use strict";

    angular.module("app")
        .directive("skills", function () {
            return {
                templateUrl: "app/partials/skills.html",
                controller: "SkillsController",
                controllerAs: "SkillsCtrl"
            };
        }
    );

    angular.module("app")
        .directive("experience", ["ExperienceFactory", function (ExperienceFactory) {
            return {
                templateUrl: "app/partials/experience.html",
                link: function (scope) {
                    scope.experiences = ExperienceFactory.getExperience();
                }
            };
        }]
    );

    angular.module("app")
        .directive('slickSlider', ["$timeout", function ($timeout) {
            return {
                //TODO there is a serious bug that I can't track down on the first click of the slides
                link: function(scope, element, attrs) {
                    //Timeout used to allow DOM to load before attempting to execute slick initialization see http://stackoverflow.com/a/24523463
                    $timeout(function () {
                        $(element).slick(scope.$eval(attrs.data));
                    });
                }
            };
        }]
    );

})(angular);