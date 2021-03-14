import { Link as MaterialUILink, LinkProps } from "@material-ui/core";
import clsx from "clsx";
import React, { FC } from "react";
import useStyles from "./styles";

type Props = LinkProps & {
  active?: boolean;
  /**
   * TODO: this prop is mainly used for the <Navbar> and needs to be revised
   * to something like 'color: LinkProps["color"] | "white"' but there issues
   * with both merging and using string literals
   */
  colorOverride?: "white";
};

const Link: FC<Props> = ({
  active,
  children,
  colorOverride,
  href,
  rel = "noreferrer",
  target = "_blank",
  ...props
}) => {
  const classes = useStyles();

  return (
    <>
      {href ? (
        <MaterialUILink
          className={clsx(
            classes.root,
            colorOverride === "white" && classes.root__white,
            active && classes.root__active,
          )}
          href={href}
          rel={rel}
          target={target}
          {...props}
        >
          {children}
        </MaterialUILink>
      ) : (
        <span
          className={clsx(colorOverride === "white" && classes.root__white)}
          {...props}
        >
          {children}
        </span>
      )}
    </>
  );
};

export default Link;
