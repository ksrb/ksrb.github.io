"use strict";

class SkillsController {
    constructor(SkillsFactory) {
        this.skills = SkillsFactory.getSkills();
        this.legends = SkillsFactory.getLegends();

        this.setSelectedLegend = function (legend) {
            //Double click 'deselect' legend
            if (this.selectedLegend === legend) {
                this.selectedLegend = null;
            } else {
                this.selectedLegend = legend;
            }
        };

        this.skillIsGreaterThanSelectedSkill = function (skill) {
            //if skill hasn't been selected show all
            if (!this.selectedLegend) {
                return true;
            }
            return skill.level >= this.selectedLegend.level - 1;
        }.bind(this);

        this.showMeter = function (skillLevel, meterNum) {
            return skillLevel >= meterNum;
        };

        //Presentational data and functions
        var iconPathPrefix = "assets/images/skills/";
        var iconPathSuffix = ".svg";

        this.getIcon = function (skill) {
            return iconPathPrefix + skill.obj.name.toLowerCase() + iconPathSuffix;
        };

        var gradientStops = {
            programming: [
                ["#354B88", "#29538B"],
                ["#28548B", "#28548B"],
                ["#1C6193", "#4170A0"],
                ["#1C6193", "#4170A0"],
                ["#4471A1", "#6283AD"]
            ],
            design: [
                ["#467463", "#406A5A"],
                ["#3F6859", "#3E6556"],
                ["#3F6859", "#4C7C6A"],
                ["#4F816E", "#62A088"],
                ["#67A38C", "#8DBAA9"]
            ],
            tools: [
                ["#744646", "#744646"],
                ["#694040", "#663F3F"],
                ["#663F3F", "#7C4C4B"],
                ["#8E6261", "#9F6061"],
                ["#A36666", "#BB8E8E"]
            ]
        };

        this.getGradientStop = function (skill) {
            return gradientStops[skill.obj.category];
        };
    }
}

SkillsController.$inject = ["SkillsFactory"];

export default SkillsController;