import { makeStyles } from "@material-ui/styles";
import defaultTheme, { Theme } from "src/theme";
import { header__navbarHeight } from "src/components/Header/styles";

export const content__fixedExpandedPaddingUsingSpacing = 1;
export const navbarHeight =
  header__navbarHeight +
  defaultTheme.spacing(content__fixedExpandedPaddingUsingSpacing) * 2;

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
        padding: spacing(
          content__fixedExpandedPaddingUsingSpacing,
          0,
          content__fixedExpandedPaddingUsingSpacing,
          0,
        ),
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
      overflow: "hidden",
    },
    content__centered: {
      justifyContent: "center",
      marginBottom: marginBottom,
    },
    content__fixed: {
      display: "flex",
      alignItems: "center",
      position: "fixed",
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

    item: {
      margin: "0 5px",
    },

    header: {
      marginRight: spacing(2),
      overflow: "hidden",
      maxWidth: 0,
      flexWrap: "nowrap",
      justifyContent: "initial",
    },
    header__expanded: {
      animationDelay: ".3s",
      animationDuration: ".3s",
      animationFillMode: "forwards",
      animationName: "$slideFromLeft",
    },
  }),
);
