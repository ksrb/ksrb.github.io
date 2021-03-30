import { Grid } from "@material-ui/core";
import React, { FC } from "react";
import Link from "src/components/Link";
import { useScrollElementTrackerRefCallback } from "src/components/ScrollElementTracker";
import { aboutListenerId } from "src/constants";
import { siteUrl } from "src/constants/config";
import useStyles from "./styles";

const About: FC = () => {
  const scrollElementTrackerRef = useScrollElementTrackerRefCallback(
    aboutListenerId,
  );

  const classes = useStyles();

  return (
    <Grid container className={classes.root} ref={scrollElementTrackerRef}>
      <Grid item xs={12}>
        <p>
          Thanks for visiting my site, this very much still a work in progress
          but I hope you find what's here interesting.
        </p>

        <p>
          The design of this site is meant to pay homage to GraphQL and GraphQL
          clients like ApolloJS and Relay, technologies which I think are
          leading the way to better developer and user experiences.
        </p>

        <p>
          A legacy site is available{" "}
          <Link href={`${siteUrl}/legacy`}>here</Link>.
        </p>
      </Grid>
    </Grid>
  );
};

export default About;
