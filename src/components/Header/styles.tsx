import { makeStyles } from "@material-ui/styles";
import { Theme } from "src/theme";

export default makeStyles<Theme>(
  ({
    spacing,
    marginBottom,
    primaryColor,
    breakpoints: {
      values: { sm },
    },
  }) => {
    return {
      header: {
        cursor: "pointer",
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

      [`@media (max-width: ${sm}px)`]: {
        header__navbar: {
          "& $header_name:first-child": {
            margin: 0,
          },
          "& $header_name:last-child": {
            margin: 0,
          },
          "& $header_name__small": {
            display: "none",
          },
        },
      },
    };
  },
);
