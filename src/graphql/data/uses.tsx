import typenames from "src/graphql/typenames";
import { Use } from "src/graphql/__generated__";

import { RequiredByElsePartial } from "src/types";

let id = 0;
function createUse(use: RequiredByElsePartial<Use, "title">): Use {
  return {
    __typename: typenames.Use,
    id: (id++).toString(),
    ...use,
  };
}

const uses = {
  Backend: createUse({
    title: "Backend",
  }),
  Build: createUse({
    title: "Build",
  }),
  Frontend: createUse({
    title: "Frontend",
  }),
  None: createUse({
    title: "None",
  }),
};

export default uses as { [key in keyof typeof uses]: Use };
