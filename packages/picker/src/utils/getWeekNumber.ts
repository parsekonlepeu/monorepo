import { WeekNumbers } from "luxon";

export const getWeekNumber = (indexWeek: number): WeekNumbers => {
  switch (indexWeek) {
    case 0:
      return 6;
    case 1:
      return 5;
    case 2:
      return 4;
    case 3:
      return 3;
    case 4:
      return 2;
    case 5:
      return 1;
  }
  return 1;
};
