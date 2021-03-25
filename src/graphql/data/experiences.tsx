import { DAY } from "src/constants";
import { experienceAssetsDirectory } from "src/constants/config";
import { Experience, History, SampleWork } from "src/graphql/__generated__";
import typenames from "src/graphql/typenames";
import { RequiredByElsePartial } from "src/types";
import companies from "./companies";
import languages from "./languages";
import tools from "./tools";
import uses from "./uses";

let experienceId = 0;

function createExperience(
  experience: RequiredByElsePartial<
    Experience,
    "accomplishments" | "company" | "histories" | "startDate"
  >,
): Experience {
  const { startDate: startDateStr, endDate: endDateStr } = experience;
  const endDate = endDateStr ? new Date(endDateStr) : new Date();
  const startDate = new Date(startDateStr);
  const days = (endDate.getTime() - startDate.getTime()) / DAY;

  return {
    __typename: typenames.Experience,
    id: experienceId.toString(),
    endDate: null,
    hidden: false,
    index: experienceId++,
    jobType: "",
    role: "",
    days,
    sampleWorks: [],
    ...experience,
  };
}

let sampleWorkId = 0;

function createSampleWork(
  sampleWork: RequiredByElsePartial<SampleWork, "caption" | "image">,
): SampleWork {
  return {
    __typename: typenames.SampleWork,
    id: (sampleWorkId++).toString(),
    thumbnail: false,
    ...sampleWork,
  };
}

let historyId = 0;

function createHistory(
  history: RequiredByElsePartial<History, "values">,
): History {
  const { values } = history;
  const title = values.reduce((previousValue, { title }, index) => {
    const slash = index !== values.length - 1 ? "/" : "";
    return previousValue + title + slash;
  }, "");

  return {
    __typename: typenames.History,
    id: (historyId++).toString(),
    children: null,
    title,
    utilization: null,
    ...history,
  };
}

const experiences: Experience[] = [
  createExperience({
    company: companies.pmat,
    role: "Senior Frontend Developer",
    jobType: "Full time",
    startDate: new Date(2018, 6, 9).toString(),
    endDate: new Date(2021, 2, 12).toString(),
    histories: [
      createHistory({
        values: [uses.Frontend],
        utilization: 65,
        children: [
          createHistory({
            values: [languages.javascript, languages.typescript],
            children: [
              createHistory({ values: [tools.react] }),
              createHistory({ values: [tools.redux] }),
              createHistory({ values: [tools.graphql] }),
              createHistory({ values: [tools.apollo] }),
              createHistory({ values: [tools.cesium] }),
              createHistory({ values: [tools.leaflet] }),
            ],
          }),
          createHistory({ values: [languages.sass], utilization: 5 }),
        ],
      }),
      createHistory({
        values: [uses.Backend],
        utilization: 20,
        children: [
          createHistory({
            values: [languages.java],
            children: [
              createHistory({ values: [tools.graphqlJava] }),
              createHistory({ values: [tools.javaServlet] }),
            ],
          }),
        ],
      }),
      createHistory({
        values: [uses.Build],
        utilization: 15,
        children: [
          createHistory({ values: [languages.bash] }),
          createHistory({ values: [tools.docker] }),
          createHistory({ values: [tools.gradle] }),
          createHistory({ values: [tools.webpack] }),
          createHistory({ values: [tools.git] }),
        ],
      }),
    ],
    accomplishments: [
      "Lead a team of 3 frontend developers transitioning core Angular application to one utilizing ReactJS + Apollo + Typescript improving overall code quality and performance.",
      "Designed and implemented core application code, significant contributions include major rendering improvements by utilizing HTML canvas to render 50k+ entities on a map.",
      "Introduced and maintaining GraphQL service, streamlining development process between backend and frontend teams.",
    ],
    sampleWorks: [
      createSampleWork({
        caption:
          "The purpose of this application was to provide situation awareness to a operator, at the most basic level this was accomplished by providing the operator with a map that showed all entities in a area of interest. The position of these entities would be constantly updated via a constant stream of data from a websockets.",
        image: `${experienceAssetsDirectory}/pmat/base.png`,
        thumbnail: true,
      }),
      createSampleWork({
        caption:
          "A operator could select a entity on the map to further extract details about the given entity and determine it's threat level. Multiple entities could be simultaneously selected for later comparison.",
        image: `${experienceAssetsDirectory}/pmat/dialog-quick-list.png`,
      }),
      createSampleWork({
        caption:
          "Various overlays and configurations were available to the operator to further enhance their capabilities to determine the threat level of a entity.",
        image: `${experienceAssetsDirectory}/pmat/left-panel.png`,
      }),
      createSampleWork({
        caption:
          "Overlaying weather reports was frequently used by operators conducting search and rescue operations",
        image: `${experienceAssetsDirectory}/pmat/left-panel-layers.png`,
      }),
      createSampleWork({
        caption:
          "The 3D mode could be used to quickly understand the relatively altitudes of multiple entities.",
        image: `${experienceAssetsDirectory}/pmat/base-3d.png`,
      }),
      createSampleWork({
        caption:
          "A example of the application handling 100,000 entities, the entities shown here are generated.",
        image: `${experienceAssetsDirectory}/pmat/base-generated.png`,
        thumbnail: true,
      }),
      createSampleWork({
        caption:
          "KML (Key-hole Markup Language) was supported to allow operators to import overlays from Google Earth.",
        image: `${experienceAssetsDirectory}/pmat/kml.png`,
      }),
      createSampleWork({
        caption:
          "The alerting system allowed a operator to set specific conditions to notify them of certain threats.",
        image: `${experienceAssetsDirectory}/pmat/alerts.png`,
        thumbnail: true,
      }),
      createSampleWork({
        caption:
          "A alert could be set based on specific geospatial bounds or more general criteria such as if the entity was was in the air and at what altitude.",
        image: `${experienceAssetsDirectory}/pmat/alert-editing.png`,
      }),
      createSampleWork({
        caption:
          "A alert's geospatial bounds could be set manually but drawing tools existed allowing the user to convert between different shapes and modes.",
        image: `${experienceAssetsDirectory}/pmat/alert-editing-manual.png`,
      }),
      createSampleWork({
        caption:
          "A alert's geospatial shape could be seamlessly swapped between a from a rectangle to a polygon",
        image: `${experienceAssetsDirectory}/pmat/alert-editing-manual-polygon.png`,
      }),
      createSampleWork({
        caption:
          "A alert's geospatial mode could be seamlessly swapped from manually inputting the latitude and longitude to using a set of drawing tools.",
        image: `${experienceAssetsDirectory}/pmat/alert-editing-drawing-polygon.png`,
      }),
    ],
  }),
  createExperience({
    company: companies.personal,
    startDate: new Date(2018, 1, 1).toString(),
    endDate: new Date(2018, 6, 1).toString(),
    histories: [
      createHistory({ values: [tools.react] }),
      createHistory({ values: [tools.graphql] }),
      createHistory({ values: [languages.sass] }),
      createHistory({
        values: [tools.timeOff],
        utilization: 50,
      }),
    ],
    accomplishments: [
      "Experiment with GraphQL and ApolloJS on attempted website rewrite",
    ],
    hidden: true,
  }),
  createExperience({
    company: companies.lanternCredit,
    role: "Full Stack Developer",
    jobType: "Full time",
    startDate: new Date(2015, 5, 1).toString(),
    endDate: new Date(2018, 1, 1).toString(),
    histories: [
      createHistory({
        values: [uses.Frontend],
        utilization: 55,
        children: [
          createHistory({
            values: [languages.javascript],
            children: [
              createHistory({
                values: [tools.react],
                utilization: 90,
              }),
              createHistory({
                values: [tools.graphql],
                utilization: 10,
              }),
            ],
          }),
          createHistory({ values: [languages.sass], utilization: 10 }),
        ],
      }),
      createHistory({
        values: [uses.Backend],
        utilization: 30,
        children: [createHistory({ values: [languages.golang] })],
      }),
      createHistory({
        values: [uses.Build],
        utilization: 15,
        children: [
          createHistory({ values: [languages.bash] }),
          createHistory({ values: [tools.docker] }),
          createHistory({ values: [tools.webpack] }),
          createHistory({ values: [tools.git] }),
        ],
      }),
    ],
    accomplishments: [
      "Used React to make important contributions to several parts of the core application, with major contributions going towards enhancing user knowledge of the factors that affect their credit score.",
      "Maintained front end build and deployment pipeline and incorporating new technologies to streamline development such as SASS and CSS modules.",
      "Created several microservices using Golang to retrieve data from credit agencies such as Transunion and Equifax.",
      "Built and deployed microservices using Docker, took part in the creation of a 3-tier architecture creating a system that was both secure and scalable.",
    ],
    sampleWorks: [
      createSampleWork({
        caption:
          "Main dashboard, showing user's current credit score and other helpful links to explain how a credit score is determined.",
        image: `${experienceAssetsDirectory}/lantern credit/dashboard.png`,
      }),
      createSampleWork({
        caption:
          "The Interactive Credit Report was the main selling point of the application, allowing the user to simulate changes to their credit score based on the what offer(s) were selected.",
        image: `${experienceAssetsDirectory}/lantern credit/interactive-credit-report.png`,
      }),
      createSampleWork({
        caption:
          "Summary page of the major factors that affect a user's credit score.",
        image: `${experienceAssetsDirectory}/lantern credit/credit-factors.png`,
      }),
      createSampleWork({
        caption:
          "Summary page of the various accounts a user has open and closed.",
        image: `${experienceAssetsDirectory}/lantern credit/credit-factors-total-accounts.png`,
      }),
      createSampleWork({
        caption:
          "Graph showing user where their credit score falls in the United States.",
        image: `${experienceAssetsDirectory}/lantern credit/national-averages.png`,
      }),
    ],
  }),
  createExperience({
    company: companies.tableDesignArt,
    role: "Web Developer",
    jobType: "Part time",
    startDate: new Date(2015, 3, 1).toString(),
    endDate: new Date(2015, 5, 1).toString(),
    histories: [
      createHistory({ values: [tools.liquid] }),
      createHistory({ values: [languages.sass] }),
      createHistory({ values: [languages.javascript] }),
    ],
    accomplishments: [
      "Used Shopify to rapidly create a webstore, used the Liquid templating language to customize appearance.",
      "Simplified shipping process by integrating webstore with shipping providers such as FedEx and UPS.",
      "Helped manage social media campaigns on Facebook, Pinterest, and Twitter.",
    ],
    hidden: true,
  }),
  createExperience({
    company: companies.personal,
    startDate: new Date(2015, 2, 1).toString(),
    endDate: new Date(2015, 5, 1).toString(),
    histories: [
      createHistory({ values: [tools.angularJS] }),
      createHistory({ values: [tools.foundation] }),
      createHistory({ values: [tools.jspm], utilization: 15 }),
      createHistory({ values: [tools.timeOff] }),
    ],
    accomplishments: [
      "Created personal site using AngularJS",
      "Studied JS using Professional JavaScript for Web Developers, 3rd Edition",
      "Studied AngularJS using Build Your Own AngularJS",
    ],
    hidden: true,
  }),
  createExperience({
    company: companies.niksun,
    role: "Web Developer",
    jobType: "Full time",
    startDate: new Date(2013, 8, 1).toString(),
    endDate: new Date(2015, 1, 1).toString(),
    histories: [
      createHistory({
        values: [uses.Frontend],
        utilization: 85,
        children: [
          createHistory({
            values: [tools.smartGwt],
            utilization: 60,
          }),
          createHistory({
            values: [tools.angularJS],
            utilization: 25,
          }),
          createHistory({
            values: [tools.bootstrap],
            utilization: 10,
          }),
          createHistory({ values: [tools.photoshop] }),
          createHistory({ values: [tools.illustrator] }),
        ],
      }),
      createHistory({
        values: [uses.Build],
        utilization: 15,
        children: [
          createHistory({
            values: [tools.gradle],
          }),
          createHistory({
            values: [tools.git],
          }),
        ],
      }),
    ],
    accomplishments: [
      "Created a real time reporting web application for Niksun's file analysis service, used by several clients including Wells Fargo.",
      "Rapidly designed and wireframed several prototypes in an effort to modernize Niksun's client facing applications.",
      "Created a workspace setup and build script using Gradle, significantly reducing onboarding time of new developers.",
    ],
    sampleWorks: [
      createSampleWork({
        caption: "Proposal for new company homepage, designed using Photoshop.",
        image: `${experienceAssetsDirectory}/niksun/website-template.png`,
      }),
      createSampleWork({
        caption:
          "Prototype of new NetDetector, Niksun's network analysis software, implemented using GWT. This is a mock I designed in Photoshop, screenshots of the actually product are proprietary.",
        image: `${experienceAssetsDirectory}/niksun/template-with-pods.png`,
      }),
      createSampleWork({
        caption: "Redesigned login page for Niksun client facing applications.",
        image: `${experienceAssetsDirectory}/niksun/login-template.png`,
      }),
    ],
  }),
  createExperience({
    company: companies.scholarsForCharity,
    role: "Webmaster",
    jobType: "Volunteer",
    startDate: new Date(2012, 4, 1).toString(),
    endDate: new Date(2013, 4, 1).toString(),
    histories: [
      createHistory({
        values: [uses.Frontend],
        utilization: 80,
        children: [
          createHistory({ values: [languages.javascript] }),
          createHistory({ values: [tools.foundation] }),
          createHistory({ values: [tools.photoshop] }),
          createHistory({ values: [tools.illustrator] }),
        ],
      }),
      createHistory({
        values: [uses.Backend],
        children: [
          createHistory({ values: [languages.php] }),
          createHistory({ values: [languages.mysql] }),
        ],
      }),
    ],
    accomplishments: [
      "Gathered requirements, designed graphics, and created sites for clients.",
      "Lead sessions for web and graphic design, training new members in basic development techniques and best practices.",
      "Actively promoted organization and responsible for recruiting several members.",
    ],
    sampleWorks: [
      createSampleWork({
        caption: "Redesigned banner for organization's site",
        image: `${experienceAssetsDirectory}/scholars for charity/banner.png`,
      }),
      createSampleWork({
        caption:
          "Designed banner for client, Quintessence Music, a organization that helps promote local music groups.",
        image: `${experienceAssetsDirectory}/scholars for charity/quintessence.png`,
      }),
    ],
  }),
];

export default experiences;
