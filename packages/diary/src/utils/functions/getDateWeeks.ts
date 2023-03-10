import { DateTime } from "luxon";
import { FirstDay, SelectedDate } from "../../types";
import { getDayOneWeek } from "./getDayOneWeek";

export const getDateWeeks = (
  firstDay: FirstDay,
  selectedDateDiary: SelectedDate,
  numbersOfWeek: number
): DateTime[][] => {
  const dayOne = getDayOneWeek(
    DateTime.fromObject(selectedDateDiary),
    firstDay
  );
  const datesReturn: DateTime[][] = [];
  for (let i = 0; i < numbersOfWeek; i++) {
    const weekAdd: DateTime[] = [];
    for (let j = 0; j < 7; j++) {
      weekAdd.push(dayOne.plus({ days: i * 7 + j }));
    }
    datesReturn.push(weekAdd);
  }
  return datesReturn;
};
