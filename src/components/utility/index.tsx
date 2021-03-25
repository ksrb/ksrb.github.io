import { useMemo } from "react";
import { Displayed, Tool, Use } from "src/graphql/__generated__";
import uses from "src/graphql/data/uses";
import typenames from "src/graphql/typenames";
import theme from "src/theme";

const { primaryColor, languagesColor, secondaryColor, trinaryColor } = theme;

function getColorByUse(use: Use): string {
  const { id } = use;

  switch (id) {
    case uses.Frontend.id:
      return primaryColor;
    case uses.Backend.id:
      return secondaryColor;
    case uses.Build.id:
      return trinaryColor;
  }

  return "";
}

export function getColorByType(
  displayedNode: Displayed[] | Displayed,
  parentDisplayedNodes?: Displayed[],
): string {
  // TODO: consider nodes with mixed use
  const node = Array.isArray(displayedNode) ? displayedNode[0] : displayedNode;

  // @ts-ignore
  const { __typename } = node;

  switch (__typename) {
    case typenames.Use:
      return getColorByUse(node as Use);
    case typenames.Tool:
      return getColorByUse((node as Tool).use);
    case typenames.Language:
      return parentDisplayedNodes
        ? getColorByType(parentDisplayedNodes)
        : languagesColor;
    default:
      return "";
  }
}

type ColorsByTypeParameters = Parameters<typeof getColorByType>;

export function useColorByType(
  displayNode: ColorsByTypeParameters[0],
  parentDisplayedNodes?: ColorsByTypeParameters[1],
) {
  return useMemo(() => getColorByType(displayNode, parentDisplayedNodes), [
    displayNode,
    parentDisplayedNodes,
  ]);
}
