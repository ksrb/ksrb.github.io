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
        padding: spacing(0, 5, 0, 0),
      },
      to: {
        maxHeight: navbarHeight,
        // Right padding calculated from scrollbar (16px) and <Container>
        // padding (24px)
        padding: spacing(1, 5, 1, 0),
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
    content__inViewPort: {
      justifyContent: "center",
      marginBottom: marginBottom,
    },
    content__fixed: {
      justifyContent: "space-between",
      overflow: "hidden",
      position: "fixed",
      boxSizing: "border-box",
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
        marginRight: spacing(1),
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
