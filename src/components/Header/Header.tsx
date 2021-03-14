import { Grid } from "@material-ui/core";
import clsx from "clsx";
import React, { FC } from "react";
import useStyles from "./styles";

type Props = {
  classes?: { root?: string };
  variant?: "header" | "navbar";
};

const Header: FC<Props> = (props) => {
  const { variant = "header" } = props;
  const classes = useStyles();

  return (
    <Grid
      container
      className={clsx(
        props.classes?.root,
        classes.header,
        variant === "navbar" && classes.header__navbar,
      )}
    >
      <div className={classes.header_name}>
        K<span className={classes.header_name__small}>EVIN</span>
      </div>
      <div className={clsx(classes.header_name, classes.header_name__last)}>
        S<span className={classes.header_name__small}>UEN</span>
      </div>
    </Grid>
  );
};

export default Header;
