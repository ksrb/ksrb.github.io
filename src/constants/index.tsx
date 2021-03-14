export enum Anchors {
  About = "about",
  Skills = "skills",
  Experience = "experience",
}

export const DAY = 24 * 60 * 60 * 1000;

let id = 0;
export const providerListenerId = id++;
export const aboutListenerId = id++;
export const navbarListenerId = id++;
export const skillsListenerId = id++;
export const experiencesListenerId = id++;
