import React, { FC } from "react";
import useStylesMeterRoot from "./MeterRoot/styles";
import useStylesSkill from "./Skill/styles";
import Skills from "./Skills";
import useStylesSkills from "./styles";
import { Provider } from "./StylesProvider";

const Index: FC = () => {
  const classesMeterRoot = useStylesMeterRoot();
  const classesSkill = useStylesSkill();
  const classesSkills = useStylesSkills();

  return (
    <Provider
      value={{
        classesMeterRoot,
        classesSkill,
        classesSkills,
      }}
    >
      <Skills />
    </Provider>
  );
};

export default Index;
