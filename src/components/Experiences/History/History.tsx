import clsx from "clsx";
import React, { FC, useCallback, useMemo } from "react";
import { useStyles } from "src/components/Experiences/StylesProvider";
import Link from "src/components/Link";
import { useColorByType } from "src/components/utility";
import { ExperienceFieldsFragment } from "src/graphql/__generated__";
import {
  computeUtilization,
  HistoryWithChildren,
} from "src/graphql/data/skills";
import typenames from "src/graphql/typenames";
import { ExtractArrayType } from "src/types";

type HistoryType = ExtractArrayType<ExperienceFieldsFragment["histories"]>;

export const History: FC<{
  history: HistoryType;
  historyParent?: HistoryWithChildren;
  historyParentUtilization: number;
  histories?: HistoryType[];
  depth: number;
}> = ({
  history,
  historyParent,
  historyParentUtilization,
  histories,
  depth,
}) => {
  const { children, title, values } = history;
  let utilization = computeUtilization(
    history,
    historyParent,
    historyParentUtilization,
    histories,
  );

  const utilizationRounded = Math.round(utilization);

  const backgroundColor = useColorByType(
    values,
    historyParent && historyParent.values,
  );

  const url = useMemo(() => {
    const value = values[0];
    // Value type is Language or Tool
    if (
      value.__typename === typenames.Language ||
      value.__typename === typenames.Tool
    ) {
      return value.url;
    }
  }, [values]);

  const stopPropagation = useCallback((e) => url && e.stopPropagation(), [url]);

  const classes = useStyles();

  return (
    <div className={classes.history} style={{ flexBasis: `${utilization}%` }}>
      <div
        className={clsx(
          classes.history_title,
          depth === 0 && classes.history_title__root,
        )}
        style={{ backgroundColor }}
      >
        <Link href={url} colorOverride="white" onClick={stopPropagation}>
          {title} {utilizationRounded}%
        </Link>
      </div>
      {children && (
        <div className={classes.histories}>
          {children.map((childHistory) => {
            const component = (
              <History
                key={childHistory.id}
                history={childHistory}
                // Typecast is necessary as history is guaranteed to have
                // children here but TypeScript cannot identify
                historyParent={history as HistoryWithChildren}
                historyParentUtilization={100}
                depth={++depth}
              />
            );
            --depth;
            return component;
          })}
        </div>
      )}
    </div>
  );
};

export default History;
