import { DateTime } from "luxon";
import { FirstDay } from "../types";
import { getLastDayNumber } from "./getLastDayNumber";

export const getDateEndRow = (date: DateTime, firstDay: FirstDay): DateTime => {
  const lastDayNumber = getLastDayNumber(firstDay);

  let stop = false;

  let dateReturn = date;

  while (!stop) {
    if (dateReturn.weekday === lastDayNumber) {
      stop = true;
      continue;
    }

    dateReturn = dateReturn.plus({ days: 1 });
  }

  return dateReturn;
};
