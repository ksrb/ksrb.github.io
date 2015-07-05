"use strict";

class NavbarController {
    constructor($location, $anchorScroll) {
        this.$location = $location;
        this.$anchorScroll = $anchorScroll;
    }

    scrollTo(id) {
        var old = this.$location.hash();
        this.$location.hash(id);
        this.$anchorScroll();
        this.$location.hash(old);
    }
}


NavbarController.$inject = ["$location", "$anchorScroll"];

export default NavbarController;