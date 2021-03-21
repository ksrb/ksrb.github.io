import { makeStyles } from "@material-ui/styles";
import { Theme } from "src/theme";

export default makeStyles<Theme>(({ spacing, marginBottom, primaryColor }) => ({
  root: {
    padding: spacing(0, 2),
  },

  header: {
    justifyContent: "center",
    marginTop: spacing(6),
    marginBottom: marginBottom,
  },
  header__navbar: {
    margin: 0,
    width: "auto",
    "& $header_name": {
      fontSize: 24,
      "&:first-child": {
        marginRight: 3,
      },
      "&:last-child": {
        marginLeft: 3,
      },
    },
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
    fontSize: "80%",
  },
}));
