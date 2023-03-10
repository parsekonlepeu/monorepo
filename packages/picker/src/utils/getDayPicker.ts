import { Info } from "luxon";
import { FirstDay } from "../types";

export const getDayPicker = (
  locale: string,
  firstDay: FirstDay
): string[][] => {
  const listDayNarrow = Info.weekdays("narrow", { locale: locale });
  const listDayLong = Info.weekdays("long", { locale: locale });

  const listDay: string[][] = [];

  for (let i = 0; i < 7; i++) {
    listDay.push([listDayNarrow[i], listDayLong[i]]);
  }

  switch (firstDay) {
    case "monday":
      return listDay;
    case "sunday":
      return [listDay[listDay.length - 1], ...listDay.slice(0, 6)];
    case "saturday":
      return [...listDay.slice(5), ...listDay.slice(0, 5)];
  }
};
