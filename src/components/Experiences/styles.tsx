import { makeStyles } from "@material-ui/styles";
import { Theme } from "src/theme";

const history_titleTransitionDuration = "200ms";
const history_titleTransitionFunction = "ease";

const history_titleTransition = [
  `${history_titleTransitionDuration} height ${history_titleTransitionFunction}`,
  `${history_titleTransitionDuration} margin ${history_titleTransitionFunction}`,
].join(", ");

const history_titleFontSize = "16px";
const history_titleLineHeight = "1.2";

export default makeStyles<Theme>(
  ({
    spacing,
    palette: {
      common: { black },
      divider,
    },
    marginBottom,
    primaryColor,
    secondaryColor,
    trinaryColor,
  }) => ({
    root: {
      marginBottom: marginBottom,

      "& $experience:last-child": {
        "& $experience_content": {
          marginBottom: 0,
          borderBottom: "none",
        },
      },
    },

    experience: {
      display: "flex",
    },

    experience_content: {
      flex: 1,
      marginBottom: marginBottom,
      borderBottom: `2px solid ${divider}`,
      "& > $history": {
        marginBottom: marginBottom,
      },
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: marginBottom,
    },

    company: {},
    company_name: {
      fontWeight: 600,
    },
    company_location: {
      color: black,
      fontWeight: 500,
    },

    header_right: {
      textAlign: "right",
      color: "#555555",
      fontWeight: 500,
    },
    role: {},
    startEndDate: {},

    purpose: {
      marginBottom: marginBottom,
    },

    accomplishments: {},

    // History
    history_title__expanded: {
      height: `calc(${history_titleFontSize} * ${history_titleLineHeight})`,
      width: "auto",
      margin: `0 3px ${spacing(1)}px`,
      padding: "1px 5px",
      borderRadius: 2,

      fontSize: history_titleFontSize,
      lineHeight: history_titleLineHeight,
    },
    history: {
      flex: 1,
      "&:hover > $histories > $history > $history_title": {
        extend: "history_title__expanded",
      },
    },
    history__expanded: {
      "& $history_title": {
        extend: "history_title__expanded",
      },
      "& > $histories": {
        flexWrap: "wrap",
      },
    },
    histories: {
      display: "flex",
    },
    history_title: {
      display: "block",

      height: "0",
      width: "0",
      margin: "0",
      padding: "0",

      borderRadius: "0",

      whiteSpace: "nowrap",
      overflow: "hidden",
      textAlign: "center",

      transition: history_titleTransition,
    },
    history_title__root: {
      extend: "history_title__expanded",
      borderRadius: 0,
      margin: 0,
    },
    history_title__frontend: {
      backgroundColor: primaryColor,
    },
    history_title__backend: {
      backgroundColor: secondaryColor,
    },
    history_title__build: {
      backgroundColor: trinaryColor,
    },

    sampleWorks: {
      marginBottom: marginBottom,
    },
    sampleWork: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    sampleWork_image: {
      maxWidth: "100%",
      maxHeight: 200,
    },
    carousel_image: {
      display: "block",
      margin: `0 auto ${marginBottom}px auto`,
      maxHeight: "80vh",
      maxWidth: "100%",
    },
  }),
);
