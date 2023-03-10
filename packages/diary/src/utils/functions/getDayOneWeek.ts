import { DateTime } from "luxon";
import { FirstDay } from "../../types";

export const getDayOneWeek = (
  selectedDate: DateTime,
  firstDayWeek: FirstDay
): DateTime => {
  let numberDayWeekDayOne;
  switch (firstDayWeek) {
    case "monday":
      numberDayWeekDayOne = 1;
      break;
    case "saturday":
      numberDayWeekDayOne = 6;
      break;
    case "sunday":
      numberDayWeekDayOne = 7;
      break;
    default:
      numberDayWeekDayOne = 1;
      break;
  }
  if (selectedDate.weekday === numberDayWeekDayOne) {
    return selectedDate;
  }
  let dateReturn = selectedDate;
  for (let i = 1; i <= 7; i++) {
    const dateTemp = selectedDate.minus({ days: i });
    if (dateTemp.weekday === numberDayWeekDayOne) {
      dateReturn = dateTemp;
      break;
    }
  }
  return dateReturn;
};
