"use strict";

function skillsDirective() {
    return {
        templateUrl: "app/components/skills/skills.view.html",
        controller: "SkillsController",
        controllerAs: "SkillsCtrl"
    };
}

export default skillsDirective;