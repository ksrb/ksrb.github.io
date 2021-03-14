import React, { createContext, useContext } from "react";
import useStylesMeterRoot from "./MeterRoot/styles";
import useStylesSkill from "./Skill/styles";
import useStylesSkills from "./styles";

type StylesContextProperties = {
  classesMeterRoot: ReturnType<typeof useStylesMeterRoot>;
  classesSkill: ReturnType<typeof useStylesSkill>;
  classesSkills: ReturnType<typeof useStylesSkills>;
};

const context = createContext<StylesContextProperties>({
  classesMeterRoot: {},
  classesSkill: {},
  classesSkills: {},
});

export const { Provider } = context;

export function useStylesShared() {
  return useContext(context);
}
