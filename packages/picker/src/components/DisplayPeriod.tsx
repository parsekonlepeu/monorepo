import { FC, MouseEvent, useCallback, useContext } from "react";
import { ContextOption } from "../context/ContextOption";
import { DatepickerProps, DisplayPeriodProps } from "../types";
import { getBottom } from "../utils/getBottom";
import { getLeft } from "../utils/getLeft";
import { getWidth } from "../utils/getWidth";
import { css } from "@emotion/react";

const DisplayPeriodCss = {
  contenair: css({
    position: "absolute",
    zIndex: 0,
  }),
};

export const DisplayPeriod: FC<DisplayPeriodProps> = ({ start, end, week }) => {
  const { caseSize, colors, verticalGap, horizontalGap } = useContext(
    ContextOption
  ) as DatepickerProps;

  const preventDefault = useCallback((e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const Width =
    start !== null && end !== null
      ? getWidth(start, end, caseSize, horizontalGap)
      : 0;
  const Bottom = week !== null ? getBottom(week, caseSize, verticalGap) : 0;
  const Left = start !== null ? getLeft(start, caseSize, horizontalGap) : 0;

  return (
    <div
      css={DisplayPeriodCss.contenair}
      style={{
        backgroundColor: colors.selectedDay,
        width: Width,
        bottom: Bottom,
        left: Left,
        height: caseSize,
        borderRadius: caseSize,
      }}
      onClick={preventDefault}
      onMouseEnter={preventDefault}
    ></div>
  );
};
