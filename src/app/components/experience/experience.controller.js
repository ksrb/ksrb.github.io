"use strict";

/**
 * Controller is used in ng-repeat, ng-repeat will attach its key to the controllers $scope
 * For example:
 * <div ng-repeat="experience in experiences" ng-controller="MyCtrl"></div>
 *
 * In the controller:
 * $scope.experience //will access the data repeated via ng-repeat
 */
class ExperienceController {

    constructor($modal, $scope) {

        $scope.getLogoImage = function () {
            return getExperienceFolderPath() + "logo.png";
        };

        $scope.getSampleThumbNail = function (sample) {
            return getExperienceFolderPath() + sample.image + "-thumbnail.png";
        };

        $scope.getSample = function (sample) {
            return getExperienceFolderPath() + sample.image + ".png";
        };

        $scope.getSkillName = function (skill, useShort) {
            //If referencing a skill object access the name
            if (skill.obj) {
                if (useShort && skill.obj.short_name) {
                    return skill.obj.short_name;
                }
                return skill.obj.name;
            }
            //If not referencing a skill obj try name obj
            return skill.name;
        };

        $scope.openModal = function (slideNum) {
            $scope.slideNum = slideNum;
            $modal.open({
                //TODO consider a alternative to passing the scope to access common functions
                //Passing scope over to access image utility functions
                scope: $scope,
                templateUrl: "app/components/experience/experience-modal.html"
            });
        };

        function getExperienceFolderPath() {
            return "assets/images/experience/" + $scope.experience.organization.toLowerCase() + "/";
        }
    }
}

ExperienceController.$inject = ["$modal", "$scope"];

export default ExperienceController;