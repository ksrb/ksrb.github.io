"use strict";


function experienceDirective(ExperienceFactory) {
    return {
        templateUrl: "app/components/experience/experience.view.html",
        link: function (scope) {
            scope.experiences = ExperienceFactory.getExperience();
        }
    };
}

experienceDirective.$inject = ["ExperienceFactory"];

export default experienceDirective;