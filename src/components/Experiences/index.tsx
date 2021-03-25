import React, { FC } from "react";
import Experiences from "./Experiences";
import useStyles from "./styles";
import { Provider } from "./StylesProvider";

const Index: FC = () => {
  const classes = useStyles();

  return (
    <Provider value={classes}>
      <Experiences />
    </Provider>
  );
};

export default Index;
