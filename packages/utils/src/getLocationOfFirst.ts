import { DateTime, WeekdayNumbers } from "luxon";
import { FirstDay } from "./typesPickerDiary";

export const getLocationOfFirst = (
  firstDay: FirstDay,
  dt: DateTime
): number => {
  const weekDay: WeekdayNumbers = dt.weekday;
  const startSunday: number[] = [7, 1, 2, 3, 4, 5, 6];
  const startMonday: number[] = [1, 2, 3, 4, 5, 6, 7];
  const startSaturday: number[] = [6, 7, 1, 2, 3, 4, 5];

  switch (firstDay) {
    case "monday":
      return startMonday.indexOf(weekDay);
    case "saturday":
      return startSaturday.indexOf(weekDay);
    case "sunday":
      return startSunday.indexOf(weekDay);
  }
};
