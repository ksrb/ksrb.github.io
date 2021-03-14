import { makeStyles } from "@material-ui/styles";
import { Theme } from "src/theme";

export const header__navbarHeader_nameFontSize = 24;
export const header_nameLineHeight = 1.2;
export const header__navbarHeight =
  header__navbarHeader_nameFontSize * header_nameLineHeight;

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
      fontSize: header__navbarHeader_nameFontSize,
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
    lineHeight: header_nameLineHeight,
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
