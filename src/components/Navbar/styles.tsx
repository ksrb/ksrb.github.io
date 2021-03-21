import { makeStyles } from "@material-ui/styles";
import { Theme } from "src/theme";

export const navbarHeight = 49;

export default makeStyles<Theme>(
  ({
    spacing,
    palette: {
      common: { white },
    },
    marginBottom,
  }) => ({
    "@keyframes slideFromTop": {
      from: {
        maxHeight: 0,
        padding: 0,
      },
      to: {
        maxHeight: navbarHeight,
        padding: spacing(1, 0),
      },
    },
    "@keyframes slideFromLeft": {
      from: {
        maxWidth: 0,
      },
      to: {
        // TODO: consider alternative to hard coded width to handle animation,
        // consider rendering a secondary component with visibility: none to
        // determine width followed by using maxWidth: 100%
        maxWidth: 120,
      },
    },

    content: {
      display: "flex",
    },
    content__centered: {
      justifyContent: "center",
      marginBottom: marginBottom,
    },
    content__fixed: {
      display: "flex",
      justifyContent: "space-between",
      overflow: "hidden",
      position: "fixed",
      boxSizing: "border-box",
      // Negative value calculate from:
      // https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui/src/Container/Container.js#L17-L19
      width: `calc(100% - ${spacing(3) * 2}px)`,
      top: 0,
      background: white,
      zIndex: 1,
      maxHeight: 0,
    },
    content__fixedExpanded: {
      animationName: "$slideFromTop",
      animationDuration: ".3s",
      animationFillMode: "forwards",
    },

    contentFixed_left: {
      display: "flex",
      alignItems: "center",
    },
    contentFixed_right: {
      display: "flex",
    },

    item: {
      margin: "0 5px",
    },

    header: {
      "&$header__expanded": {
        flexWrap: "nowrap",
        justifyContent: "initial",
        marginRight: spacing(2),
        maxWidth: 0,
        overflow: "hidden",
        animationDelay: ".3s",
        animationDuration: ".3s",
        animationFillMode: "forwards",
        animationName: "$slideFromLeft",
      },
    },
    header__expanded: {},
  }),
);
