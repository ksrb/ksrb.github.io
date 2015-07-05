"use strict";

import 'jquery';
import 'kenwheeler/slick';
import Carousel from './carousel';

import 'angular';
import 'angular-animate';
import 'angular-foundation';

import NavbarController from './components/navbar/navbar.controller';

import SkillsController from './components/skills/skills.controller';
import skillsDirective from './components/skills/skills.directive';
import SkillsFactory from './models/skills.factory';

import ExperienceController from './components/experience/experience.controller';
import ExperienceFactory from './models/experience.factory';
import experienceDirective from './components/experience/experience.directive';

import slickSliderDirective from './components/slider/slider.directive';

angular.module("app", ["ngAnimate", "mm.foundation"])
    .controller("NavbarController", NavbarController)

    .controller("SkillsController", SkillsController)
    .factory("SkillsFactory", SkillsFactory)
    .directive("skills", skillsDirective)

    .controller("ExperienceController", ExperienceController)
    .factory("ExperienceFactory", ExperienceFactory)
    .directive("experience", experienceDirective)

    .directive("slickSlider", slickSliderDirective);

$(document).ready(function () {
    angular.bootstrap(document, ["app"], {strictDi: true});
    var carousel = new Carousel();
    carousel.init();
});
