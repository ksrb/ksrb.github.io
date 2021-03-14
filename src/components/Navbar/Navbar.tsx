import { Grid } from "@material-ui/core";
import clsx from "clsx";
import React, { FC, useCallback } from "react";
import Header from "src/components/Header";
import Link from "src/components/Link";
import {
  useScrollElementTracker,
  useScrollElementTrackerRefCallback,
} from "src/components/ScrollElementTracker";
import {
  aboutListenerId,
  Anchors,
  experiencesListenerId,
  navbarListenerId,
  skillsListenerId,
} from "src/constants";
import useStyles from "./styles";

const Navbar: FC = () => {
  const scrollElementTrackerRef = useScrollElementTrackerRefCallback(
    navbarListenerId,
  );

  const {
    [aboutListenerId]: aboutListener,
    [navbarListenerId]: navbarListener,
    [experiencesListenerId]: experiencesListener,
    [skillsListenerId]: skillsListener,
  } = useScrollElementTracker();

  const classes = useStyles();

  const Items = useCallback(
    () => (
      <>
        <div className={classes.item}>
          <Link
            href={`#${Anchors.About}`}
            target="_self"
            active={aboutListener.inViewPort}
          >
            ABOUT
          </Link>
        </div>
        <div className={classes.item}>
          <Link
            href={`#${Anchors.Skills}`}
            target="_self"
            active={skillsListener.inViewPort}
          >
            SKILLS
          </Link>
        </div>
        <div className={classes.item}>
          <Link
            href={`#${Anchors.Experience}`}
            target="_self"
            active={experiencesListener.inViewPort}
          >
            EXPERIENCE
          </Link>
        </div>
      </>
    ),
    [
      aboutListener.inViewPort,
      classes.item,
      experiencesListener.inViewPort,
      skillsListener.inViewPort,
    ],
  );

  return (
    <div className={classes.root} ref={scrollElementTrackerRef}>
      <Grid
        item
        xs={12}
        className={clsx(classes.content, classes.content__centered)}
      >
        <Items />
      </Grid>
      <div
        className={clsx(
          classes.content,
          classes.content__fixed,
          !navbarListener.inViewPort && classes.content__fixedExpanded,
        )}
      >
        <Header
          classes={{
            root: clsx(
              classes.header,
              !navbarListener.inViewPort && classes.header__expanded,
            ),
          }}
          variant="navbar"
        />
        <Items />
      </div>
    </div>
  );
};

export default Navbar;
