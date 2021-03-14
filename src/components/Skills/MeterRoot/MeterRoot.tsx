import { ButtonBase, ButtonBaseProps } from "@material-ui/core";
import clsx from "clsx";
import React, { FC, ReactNode } from "react";
import Link from "src/components/Link";
import { useStylesShared } from "src/components/Skills/StylesProvider";

type Props = {
  color?: string;
  logo?: ReactNode;
  title?: string;
  url?: string;
  classes?: { meter_rootContent?: string };
} & Pick<ButtonBaseProps, "onClick">;

const MeterRoot: FC<Props> = ({
  children,
  classes,
  color,
  logo,
  onClick,
  title,
  url,
}) => {
  const { classesMeterRoot, classesSkill } = useStylesShared();

  return (
    <div className={classesMeterRoot.meter}>
      <Link
        href={url}
        className={classesMeterRoot.meter_root}
        rel="noreferrer"
        target="_blank"
      >
        <ButtonBase
          onClick={onClick}
          className={clsx(
            classesMeterRoot.meter_rootContent,
            classes?.meter_rootContent,
          )}
          style={{ borderColor: color }}
        >
          {typeof logo !== "string" && logo}
          {typeof logo === "string" && (
            <>
              <img
                className={classesMeterRoot.meter_rootIcon}
                src={logo}
                alt={title}
              />
              {color && (
                <img
                  className={clsx(
                    classesSkill.meter_rootIconFader,
                    classesMeterRoot.meter_rootIcon,
                    classesMeterRoot.meter_rootIconFader,
                    classesMeterRoot[color.substring(1)],
                  )}
                  src={logo}
                  alt={title}
                />
              )}
            </>
          )}
        </ButtonBase>
      </Link>
      {children}
    </div>
  );
};

export default MeterRoot;
