import { css } from "@emotion/react";
import * as React from "react";

const spanOverFlowCss = {
  span: css({
    position: "absolute",
    width: "0px",
    height: "0px",
    borderStyle: "solid",
  }),
};

interface SpanOverflowProps {
  colorDiary: string;
  overflowLeft: boolean;
  overflowRight: boolean;
}

export const SpanOverflow: React.FC<SpanOverflowProps> = ({
  colorDiary,
  overflowLeft,
  overflowRight,
}) => {
  return (
    <>
      {overflowLeft && (
        <span
          css={[
            spanOverFlowCss.span,
            {
              borderWidth: "9px 8px 9px 0",
              left: "-5px",
            },
          ]}
          style={{
            borderColor: `transparent ${colorDiary} transparent transparent`,
          }}
        />
      )}
      {overflowRight && (
        <span
          css={[
            spanOverFlowCss.span,
            {
              right: "-5px",
              borderWidth: "9px 0 9px 8px",
            },
          ]}
          style={{
            borderColor: `transparent transparent transparent ${colorDiary}`,
          }}
        />
      )}
    </>
  );
};
