"use strict";

function ExperienceFactory(SkillsFactory) {
    var experience = [
        {
            organization: "Table Design Art",
            location: "Irvine, CA",
            website: "//www.tabledesignart.com",
            skills_used: [
                {
                    name: "Liquid",
                    usage: "40"
                },
                {
                    obj: SkillsFactory.getSkillsObjs("css"),
                    usage: "30"
                },
                {
                    obj: SkillsFactory.getSkillsObjs("javascript"),
                    usage: "30"
                }

            ],
            title: "Web Developer - Part time",
            start: new Date("2015-04-1"),
            purpose: "Startup company specializing in creating decorative table banners for special occasion.",
            contributions: [
                "Used Shopify to rapidly create webstore, used the Liquid templating language to customize appearance.",
                "Simplified shipping process by integrating webstore with shipping providers such as FedEx and UPS.",
                "Helping manage social media campaign on Facebook, Pinterest, and Twitter."
            ]
        },
        {
            organization: "Niksun",
            location: "Princeton, NJ",
            website: "//www.niksun.com",
            skills_used: [
                {
                    obj: SkillsFactory.getSkillsObjs("gwt"),
                    usage: "70"
                },
                {
                    obj: SkillsFactory.getSkillsObjs("javascript"),
                    usage: "20"
                },
                {
                    obj: SkillsFactory.getSkillsObjs("css"),
                    usage: "10"
                }
            ],
            title: "Web Developer - Full time",
            start: new Date("2013-09-1"),
            end: new Date("2015-03-1"),
            purpose: "Company focused on providing network analysis software.",
            contributions: [
                /*
                 * It was a web app that polled a file analysis service (virus scanner) telling the client when the analysis was completed
                 */
                "Created a real time reporting web application for Niksun's file analysis service, used by several clients including Wells Fargo.",
                /*
                 * Contributed the most LOC to the project, responsible for mocking and creating several prototypes.
                 */
                "Rapidly designed and wireframed several prototypes in an effort to modernize Niksun's client facing applications.",
                /*
                 * Created a build script using Gradle to automate workspace setup and running the project
                 */
                "Created a workspace setup and build script using Gradle, significantly reducing onboarding time of new developers."
            ],
            samples: [
                {
                    image: "Website-Template",
                    caption: "Proposal for new company homepage, designed using Photoshop."
                },
                {
                    image: "Template-with-Pods",
                    caption: "Prototype of new NetDetector, Niksun's network analysis software, implemented using GWT. This is a mock I designed in Photoshop, screenshots of the actually product are proprietary."
                },
                {
                    image: "Login-Template",
                    caption: "Redesigned login page for Niksun client facing applications."
                }
            ]
        },
        {
            organization: "Scholars for Charity",
            location: "New Brunswick, NJ",
            skills_used: [
                {
                    obj: SkillsFactory.getSkillsObjs("css"),
                    usage: "50"
                },
                {
                    obj: SkillsFactory.getSkillsObjs("photoshop"),
                    usage: "40"
                },
                {
                    obj: SkillsFactory.getSkillsObjs("illustrator"),
                    usage: "10"
                }
            ],
            title: "Webmaster - Volunteer",
            start: new Date("2012-12-1"),
            end: new Date("2013-05-1"),
            purpose: "Nonprofit organization that designs websites for charity.",
            contributions: [
                "Gathered requirements, designed graphics, and created sites for clients.",
                "Lead session for web and graphic design training new members in basic development techniques and best practices.",
                "Actively promoted organization responsible for recruiting several members."
            ],
            samples: [
                {
                    image: "quintessence",
                    caption: "Designed banner for client, Quintessence Music, a organization that helps promote local music groups."
                },
                {
                    image: "scholars-for-charity-banner",
                    caption: "Redesigned banner for organization's site"
                }
            ]
        }
    ];
    return {
        getExperience: function () {
            return experience;
        }
    };
}

ExperienceFactory.$inject = ["SkillsFactory"];

export default ExperienceFactory;