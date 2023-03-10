import { DateTime } from "luxon";
import { FirstDay } from "../types";
import { getFirstDayNumber } from "./getFirstDayNumber";

export const getDateStartRow = (
  date: DateTime,
  firstDay: FirstDay
): DateTime => {
  const firstDayNumber = getFirstDayNumber(firstDay);

  let stop = false;

  let dateReturn = date;

  while (!stop) {
    if (dateReturn.weekday === firstDayNumber) {
      stop = true;
      continue;
    }

    dateReturn = dateReturn.minus({ days: 1 });
  }

  return dateReturn;
};
