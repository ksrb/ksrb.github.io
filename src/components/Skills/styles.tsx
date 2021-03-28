import { makeStyles } from "@material-ui/styles";
import { Theme } from "src/theme";
import { toggleMapValues } from "./constants";

export const stroke = 3;

export const skill_titleFontSize = 12;
export const skill_titleLineHeight = 1.4;
export const skill_titleHeight = skill_titleFontSize * skill_titleLineHeight;

export const meter_rootPadding = 3;
export const meter_rootIconSize = 32;
export const meter_rootSize =
  meter_rootIconSize + meter_rootPadding * 2 + stroke * 2;
export const meter_rootExpanded = {
  height: meter_rootSize,
  width: meter_rootSize,
};

export const meter_nodeSize = 16;
export const meter_nodeExpanded = {
  height: meter_nodeSize,
  width: meter_nodeSize,
};

export const meter_edgeSize = 50;
export const meter_edgeExpanded = {
  flexBasis: meter_edgeSize,
};

export default makeStyles<Theme>(
  ({
    palette: {
      primary,
      common: { white },
    },
  }) => {
    return toggleMapValues.reduce<{
      [key: string]: any;
    }>(
      (aggregator, { color, className }) => {
        aggregator[className] = {
          borderColor: color,
        };
        aggregator.skills[`& $${className}`] = {
          borderColor: color,
          color,
        };
        aggregator.skills["& $meterRootContent__selected"][`&$${className}`] = {
          background: color,
        };

        return aggregator;
      },
      {
        root: {},

        skills: {
          "& $meter_edge": {
            flexBasis: meter_edgeSize - meter_rootSize / 2,
          },

          "& $meterRootContent__selected": {
            background: primary.main,
          },

          "& $skill_title__selected": {
            color: white,
          },

          "& $skill:last-child $meter_edgeVertical": {
            display: "none",
          },
        },
        skill: {},
        skill_title__selected: {},

        meterRootContent__selected: {},
        meter_edge: {},
        meter_edgeVertical: {},

        autoComplete: {
          flexBasis:
            meter_rootSize * 4 +
            meter_rootSize / 2 +
            (meter_edgeSize - meter_rootSize / 2) *
              (toggleMapValues.length - 1),
          overflow: "visible",
          // TODO (ksuen): figure out why border-radius is overridden in production
          "& $autoComplete_inputRoot": {
            borderRadius: "28px / 50%",
          },
        },
        autoComplete_inputRoot: {},

        filters: {
          height: 0,
          width: 0,
        },
      },
    );
  },
);
