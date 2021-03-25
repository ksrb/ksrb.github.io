import React, { createContext, useContext } from "react";
import useStylesRoot from "./styles";

const context = createContext<ReturnType<typeof useStylesRoot>>({});

export const { Provider } = context;

export function useStyles() {
  return useContext(context);
}
