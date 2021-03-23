export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    Node: [
      "Company",
      "Use",
      "Language",
      "Tool",
      "History",
      "Experience",
      "SampleWork",
      "Skill",
    ],
    Displayed: ["Use", "Language", "Tool"],
    DisplayedNode: ["Tool", "Language", "Use"],
  },
};
export default result;
