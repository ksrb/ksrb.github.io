import { makeStyles } from "@material-ui/styles";
import { Theme } from "src/theme";

export default makeStyles<Theme>(
  ({
    palette: {
      primary,
      common: { white },
    },
  }) => ({
    root: {
      position: "relative",
      "&::after": {
        content: "''",
        position: "absolute",
        left: "50%",
        bottom: 0,
        transform: "translateX(-50%)",
        width: 0,
        borderBottom: `1px solid ${primary.main}`,
        transition: "width 0.3s ease, border-color 0.3s ease",
      },
      "&:hover": {
        textDecoration: "none",
        "&::after": {
          width: "100%",
        },
      },
    },
    root__active: {
      "&::after": {
        width: "100%",
      },
    },
    root__white: {
      color: white,
      "&::after": {
        borderBottomColor: white,
      },
    },
  }),
);
