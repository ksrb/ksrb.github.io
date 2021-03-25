import { Grid } from "@material-ui/core";
import React, { FC } from "react";
import { useScrollElementTrackerRefCallback } from "src/components/ScrollElementTracker";
import { experiencesListenerId } from "src/constants";
import { useExperiencesGetQuery } from "src/graphql/__generated__";
import Experience from "./Experience";
import { useStyles } from "./StylesProvider";

const Experiences: FC = () => {
  const { data } = useExperiencesGetQuery();
  const experiences = data?.experiences ?? [];

  const scrollElementTrackerRef = useScrollElementTrackerRefCallback(
    experiencesListenerId,
  );

  const classes = useStyles();

  return (
    <Grid container className={classes.root} ref={scrollElementTrackerRef}>
      {experiences
        .filter(({ hidden }) => !hidden)
        .map((experience) => (
          <Experience key={experience.id} experience={experience} />
        ))}
    </Grid>
  );
};

export default Experiences;
