import { Grid } from "@material-ui/core";
import React, { FC } from "react";
import { useScrollElementTrackerRefCallback } from "src/components/ScrollElementTracker";
import { aboutListenerId } from "src/constants";
import useStyles from "./styles";

const About: FC = () => {
  const scrollElementTrackerRef = useScrollElementTrackerRefCallback(
    aboutListenerId,
  );

  const classes = useStyles();

  return (
    <Grid container className={classes.root} ref={scrollElementTrackerRef}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras scelerisque
      lacus magna, at dignissim purus pretium sed. Proin ac facilisis diam. Sed
      auctor leo id tortor scelerisque, id ultricies tellus blandit. Suspendisse
      sagittis erat non lacinia egestas. Phasellus in efficitur eros. Ut blandit
      nulla convallis felis ultrices ornare. Praesent sed sapien feugiat nulla
      rhoncus rutrum. Cras justo libero, laoreet ac sem sed, semper blandit
      erat. Curabitur vestibulum, odio vel fermentum posuere,
    </Grid>
  );
};

export default About;
