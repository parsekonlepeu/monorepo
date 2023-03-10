import { DateTime } from "luxon";
import { HEIGHT_ROW_CONTNAIR_EVENT_ALL_DAY } from "../constants";

export const getInfoForEventAllDay = (
  start: DateTime,
  duration: number,
  rowNumber: number,
  dayOne: DateTime,
  numbersOfDay: number
): {
  top: number;
  overflowRight: boolean;
  overflowLeft: boolean;
} => {
  let top = 0;
  let overflowRight = false;
  let overflowLeft = false;

  const diffDayOneStart = dayOne.diff(start, "days").toObject().days;
  const diffLastDayEnd = dayOne
    .plus({ days: numbersOfDay - 1 })
    .diff(start.plus({ minutes: duration }), "days")
    .toObject().days;

  if (diffDayOneStart && diffDayOneStart > 0) {
    overflowLeft = true;
  }

  if (diffLastDayEnd && diffLastDayEnd <= -1) {
    overflowRight = true;
  }

  top = rowNumber * HEIGHT_ROW_CONTNAIR_EVENT_ALL_DAY;

  return {
    top: top,
    overflowRight: overflowRight,
    overflowLeft: overflowLeft,
  };
};
