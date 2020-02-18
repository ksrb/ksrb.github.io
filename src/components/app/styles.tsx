import { makeStyles } from "@material-ui/styles";
import { marginBottomClass, primaryColor } from "src/styles";

export default makeStyles({
  ...marginBottomClass,

  "@global": {
    "html, body, #root": {
      width: "100%",
      height: "100%",
    },
    body: {
      margin: 0,
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale",
    },
    code: {
      fontFamily:
        "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
    },
  },

  root: {},

  header: {
    composes: "$marginBottom",
    justifyContent: "center",
    marginTop: "50px",
  },

  header_name: {
    fontSize: 36,
    "&:first-child": {
      marginRight: 5,
    },
    "&:last-child": {
      marginLeft: 5,
    },
  },
  header_name__last: {
    color: primaryColor,
  },
  header_name__small: {
    fontSize: 30,
  },

  graph: {
    width: "100%",
    height: "100%",
  },
});