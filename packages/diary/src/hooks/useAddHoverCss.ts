import * as React from "react";
import { css, SerializedStyles } from "@emotion/react";

export const useAddHoverCss = (
  hoverColor: string,
  baseCss: SerializedStyles
): SerializedStyles[] => {
  const hoverCss = React.useMemo(
    () =>
      css({
        "&:hover": {
          backgroundColor: hoverColor,
        },
      }),
    []
  );

  return [baseCss, hoverCss];
};
