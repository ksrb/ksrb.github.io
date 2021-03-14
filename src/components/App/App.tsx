import { Container } from "@material-ui/core";
import React, { FC } from "react";
import About from "src/components/About";
import Experiences from "src/components/Experiences";
import Header from "src/components/Header";
import Navbar from "src/components/Navbar";
import Skills from "src/components/Skills";
import { Anchors } from "src/constants";

import useStyles from "./styles";

const App: FC = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="md">
      <Header />
      <Navbar />
      <div id={Anchors.About}>
        <About />
      </div>
      <div id={Anchors.Skills}>
        <Skills />
      </div>
      <div id={Anchors.Experience}>
        <Experiences />
      </div>
    </Container>
  );
};

export default App;
