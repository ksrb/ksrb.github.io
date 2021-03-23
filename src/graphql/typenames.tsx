import {
  Address,
  Company,
  Experience,
  History,
  Language,
  SampleWork,
  Skill,
  Tool,
  Use,
} from "./__generated__";

interface Typenames {
  Address: NonNullable<Address["__typename"]>;
  Company: NonNullable<Company["__typename"]>;
  Experience: NonNullable<Experience["__typename"]>;
  History: NonNullable<History["__typename"]>;
  Tool: NonNullable<Tool["__typename"]>;
  Language: NonNullable<Language["__typename"]>;
  Use: NonNullable<Use["__typename"]>;
  SampleWork: NonNullable<SampleWork["__typename"]>;
  Skill: NonNullable<Skill["__typename"]>;
}

const typenames: Typenames = {
  Address: "Address",
  Company: "Company",
  Experience: "Experience",
  History: "History",
  Tool: "Tool",
  Language: "Language",
  Use: "Use",
  SampleWork: "SampleWork",
  Skill: "Skill",
};

export default typenames;
