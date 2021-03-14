import { makeStyles } from "@material-ui/styles";
import { Theme } from "src/theme";
import { Anchors } from "src/constants";
import { navbarHeight } from "src/components/Navbar/styles";

export default makeStyles<Theme>(({ typography: { fontFamily } }) => ({
  "@global": {
    "html, body, #root": {
      width: "100%",
      height: "100%",
    },
    body: {
      margin: 0,
      fontFamily,
      "-webkit-font-smoothing": "antialiased",
      "-moz-osx-font-smoothing": "grayscale",
    },
    code: {
      fontFamily:
        "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
    },
    [Object.values(Anchors)
      .map((anchor) => `#${anchor}`)
      .join(",")]: {
      scrollMarginTop: `${navbarHeight}px`,
    },
  },
}));
