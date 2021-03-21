import { makeStyles } from "@material-ui/styles";
import { Theme } from "src/theme";

export default makeStyles<Theme>(
  ({
    palette: {
      common: { black, white },
      text: { primary },
    },
  }) => ({
    contact: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 3,
      margin: "0px 2px",
      borderRadius: 4,
      transition: "background .3s ease",
      "& $contact_link": {
        color: primary,
        transition: "color .3s ease",
      },
      "&:hover": {
        color: white,
        background: black,
        "& $contact_link": {
          color: white,
        },
      },
    },
    contact_link: {},
  }),
);
