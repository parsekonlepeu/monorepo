import { css } from "@emotion/react";
import { DateTime } from "luxon";
import * as React from "react";
import { HEIGHT_ROW_CONTNAIR_EVENT_ALL_DAY } from "../../../utils/constants";
import { getInfoForEventAllDay } from "../../../utils/functions/getInfoForEventAllDay";
import { getNumberColumnDisplay } from "../../../utils/functions/getNumberColemnDisplay";
import { SpanOverflow } from "./SpanOverFlow";

const forChangeEventAllDayCss = {
  mainContenair: css({
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    cursor: "pointer",
    "& p": {
      color: "white",
      fontSize: "13px",
      fontWeight: 600,
      marginLeft: "5px",
    },
  }),
};

interface ForChangeEventAllDayProps {
  title: string;
  duration: number;
  start: DateTime;
  widthColumn: number;
  dayOne: DateTime;
  color: string;
  colorDiary: string;
  rowNumber: number;
  numbersOfDay: number;
}

export const ForChangeEventAllDay: React.FC<ForChangeEventAllDayProps> = ({
  title,
  duration,
  start,
  widthColumn,
  dayOne,
  color,
  colorDiary,
  rowNumber,
  numbersOfDay,
}) => {
  const { overflowRight, overflowLeft } = getInfoForEventAllDay(
    start,
    duration,
    rowNumber,
    dayOne,
    numbersOfDay
  );

  const numberColumnDisplay = getNumberColumnDisplay(
    start,
    start.plus({ minutes: duration }),
    dayOne,
    numbersOfDay
  );

  const diff = start.diff(dayOne, "days").toObject().days;

  return (
    <div
      css={forChangeEventAllDayCss.mainContenair}
      style={{
        height: `${HEIGHT_ROW_CONTNAIR_EVENT_ALL_DAY - 6}px`,
        top: `${3}px`,
        left:
          diff &&
          `calc(${
            (Math.max(0, Math.floor(diff)) * 100) / numbersOfDay - 1 / 7
          }%)`,
        width: `calc(${numberColumnDisplay * (100 / numbersOfDay)}% - 10px)`,
        backgroundColor: color,
      }}
    >
      <p>{title}</p>
      <SpanOverflow
        colorDiary={colorDiary}
        overflowLeft={overflowLeft}
        overflowRight={overflowRight}
      />
    </div>
  );
};
