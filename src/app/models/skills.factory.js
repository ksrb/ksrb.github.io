"use strict";

function SkillsFactory() {

    var skillsObjs = {
        java: {
            name: "Java",
            category: "programming",
            site: "//en.wikipedia.org/wiki/Java_%28programming_language%29"
        },
        javascript: {
            name: "javascript",
            short_name: "js",
            category: "programming",
            site: "//en.wikipedia.org/wiki/JavaScript"
        },
        angularJS: {
            name: "AngularJS",
            short_name: "Angular",
            category: "programming",
            site: "//en.wikipedia.org/wiki/AngularJS"
        },
        gwt: {
            name: "GWT",
            category: "programming",
            site: "//en.wikipedia.org/wiki/Google_Web_Toolkit"
        },
        html: {
            name: "HTML",
            category: "design",
            site: "//en.wikipedia.org/wiki/HTML"
        },
        css: {
            name: "css",
            category: "design",
            site: "//en.wikipedia.org/wiki/Cascading_Style_Sheets"
        },
        photoshop: {
            name: "Photoshop",
            short_name: "Ps",
            category: "design",
            site: "//en.wikipedia.org/wiki/Adobe_Photoshop"
        },
        illustrator: {
            name: "Illustrator",
            short_name: "Ai",
            category: "design",
            site: "//en.wikipedia.org/wiki/Adobe_Illustrator"
        },
        eclipse: {
            name: "Eclipse",
            category: "tools",
            site: "//en.wikipedia.org/wiki/Eclipse_%28software%29"
        },
        intellij: {
            name: "Intellij",
            category: "tools",
            site: "//en.wikipedia.org/wiki/IntelliJ_IDEA"
        },
        git: {
            name: "git",
            category: "tools",
            site: "//en.wikipedia.org/wiki/Git_%28software%29"
        }

    };

    var skills = [
        {
            obj: skillsObjs.java,
            level: 7
        },
        {
            obj: skillsObjs.javascript,
            level: 5
        },
        {
            obj: skillsObjs.angularJS,
            level: 4
        },
        {
            obj: skillsObjs.gwt,
            level: 6
        },
        {
            obj: skillsObjs.html,
            level: 7
        },
        {
            obj: skillsObjs.css,
            level: 7
        },
        {
            obj: skillsObjs.photoshop,
            level: 8
        },
        {
            obj: skillsObjs.illustrator,
            level: 5
        },
        {
            obj: skillsObjs.eclipse,
            level: 7
        },
        {
            obj: skillsObjs.intellij,
            level: 6
        },
        {
            obj: skillsObjs.git,
            level: 6
        }
    ];


    var legends = [
        {
            name: "beginner",
            level: 2,
            description: "Secondary use, would require significant training to use commercially.",
            colloquial: "Kind of know what I'm doing with it, this would be like how well I know php from using Wordpress casually."
        },
        {
            name: "familiar",
            level: 4,
            description: "Used at least once professionally, some training required to use commercially.",
            colloquial: "Something I would gladly learn more about given the chance like Gradle."
        },
        {
            name: "proficient",
            level: 6,
            description: "Used multiple times professionally, minimal direction required to use commercially.",
            colloquial: "Something that I'm pretty good with and generally able to solve problems given some time."
        },
        {
            name: "instructor",
            level: 8,
            description: "Taught professionally, capable of assisting team leaders commercially.",
            colloquial: "Some of these things I've used for years (Photoshop) and would love teaching them."
        },
        {
            name: "expert",
            level: 10,
            description: "Capable of leading team commercially.",
            colloquial: "I consider this someone who has at least 3-5 years experience and has succeeded delivering several products and at least failed to deliver once."
        },
        {
            name: "master",
            level: 12,
            description: "Capable of authoring a book, significant contributions to field.",
            colloquial: "This is like Douglas Crock level, someone who is a member of W3C and shaping the future of the web."
        }
    ];

    return {
        getSkills: function () {
            return skills;
        },
        getLegends: function () {
            return legends;
        },
        getSkillsObjs: function (skill) {
            return skillsObjs[skill];
        }
    };
}

export default SkillsFactory;