import clsx from "clsx";
import gsap from "gsap";
import React, { FC, Fragment, ReactNode, useCallback, useMemo } from "react";
import MeterRoot from "src/components/Skills/MeterRoot";
import { useStylesShared } from "src/components/Skills/StylesProvider";
import { useColorByType } from "src/components/utility";
import { Language, SkillsGetQuery, Tool } from "src/graphql/__generated__";
import typenames from "src/graphql/typenames";
import { ExtractArrayType } from "src/types";

function printDateString(
  valueParam: number,
  type: "year" | "month" | "day",
): string {
  const value = (() => {
    switch (type) {
      case "day":
        return Math.floor(valueParam % 30);
      case "month":
        return Math.floor((valueParam % 365) / 30);
      case "year":
        return Math.floor(valueParam / 365);
      default:
        return 0;
    }
  })();

  if (value === 0) {
    return "";
  }

  if (value === 1) {
    return `${value} ${type}`;
  }

  return `${value} ${type}s`;
}

function getLogo({
  values,
}: ExtractArrayType<SkillsGetQuery["skills"]>): string {
  const languages = values as Language[];
  const isOnlyLanguages = !languages.some(
    ({ __typename }) => __typename !== typenames.Language,
  );

  if (isOnlyLanguages) {
    return languages[0].logo;
  }

  const tools = values as Tool[];
  const isOnlyTools = !tools.some(
    ({ __typename }) => __typename !== typenames.Tool,
  );

  if (isOnlyTools) {
    return tools[0].logo;
  }

  return "";
}

export type SkillType = ExtractArrayType<SkillsGetQuery["skills"]>;

export const Skill: FC<{ skill: SkillType }> = ({ skill }) => {
  const { title, utilization, value } = skill;
  const url = useMemo(() => {
    // Value type is Language or Tool
    if (
      value.__typename === typenames.Language ||
      value.__typename === typenames.Tool
    ) {
      return value.url;
    }
  }, [value]);

  const timeline = useMemo(() => gsap.timeline(), []);
  const { classesMeterRoot, classesSkill, classesSkills } = useStylesShared();

  const skillRef = useCallback(
    (element: HTMLDivElement) => {
      if (!element) {
        return;
      }
      const meterRootContentElement = element.querySelector(
        `.${classesMeterRoot.meter_rootContent}`,
      );
      const meterEdgeVerticalElements = element.querySelectorAll(
        `.${classesSkill.meter_edgeVertical}`,
      );
      const meterEdgeElements = element.querySelectorAll(
        `.${classesSkill.meter_edge}`,
      );
      const meterNodeElements = element.querySelectorAll(
        `.${classesSkill.meter_node}`,
      );
      const skillTitleElement = element.querySelector(
        `.${classesSkill.skill_title}`,
      );

      timeline.from(meterEdgeVerticalElements, {
        duration: 0.5,
        ease: "power1",
        height: 0,
      });
      timeline.from(meterRootContentElement, {
        duration: 0.5,
        ease: "power1",
        height: 0,
        width: 0,
        padding: 0,
        borderWidth: 0,
      });

      for (let i = 0; i < meterEdgeElements.length; i++) {
        const meterEdgeElement = meterEdgeElements[i];
        timeline.from(meterEdgeElement, {
          duration: 0.1,
          ease: "power1",
          flexBasis: 0,
        });

        const meterNodeElement = meterNodeElements[i];
        timeline.from(meterNodeElement, {
          duration: 0.1,
          ease: "power1",
          height: 0,
          width: 0,
        });
      }

      timeline.from(
        skillTitleElement,
        {
          duration: 0.1,
          ease: "power1",
          height: 0,
        },
        1.3,
      );
    },
    [
      classesSkill.meter_edgeVertical,
      classesMeterRoot.meter_rootContent,
      classesSkill.meter_edge,
      classesSkill.meter_node,
      classesSkill.skill_title,
      timeline,
    ],
  );

  const nodeCount = useMemo(() => Math.round(Math.log(utilization)), [
    utilization,
  ]);
  const color = useColorByType(value);
  const nodes: ReactNode[] = [];
  const tooltipTitle = useMemo(
    () =>
      `${printDateString(utilization, "year")} ${printDateString(
        utilization,
        "month",
      )} ${printDateString(utilization, "day")}`,
    [utilization],
  );

  for (let i = 0; i < nodeCount; i++) {
    const lastNode = i === nodeCount - 1;
    nodes.push(
      <Fragment key={i}>
        <div
          className={classesSkill.meter_edge}
          style={{ backgroundColor: color }}
        />
        {lastNode ? (
          <div
            className={classesSkill.meter_node}
            style={{ backgroundColor: color }}
          >
            <div className={classesSkill.meter_nodeToolTip}>{tooltipTitle}</div>
          </div>
        ) : (
          <div
            className={classesSkill.meter_node}
            style={{ backgroundColor: color }}
          />
        )}
      </Fragment>,
    );
  }

  const logo = getLogo(skill);

  return (
    <div
      className={clsx(classesSkill.skill, classesSkills.skill)}
      ref={skillRef}
    >
      <div
        className={clsx(
          classesSkill.meter_edgeVertical,
          classesSkills.meter_edgeVertical,
        )}
        style={{ backgroundColor: color }}
      />
      <MeterRoot url={url} color={color} logo={logo} title={title}>
        {nodes}
      </MeterRoot>
      <div className={classesSkill.skill_title}>{title}</div>
    </div>
  );
};

export default Skill;
