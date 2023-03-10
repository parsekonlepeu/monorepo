import { FirstDay } from "../types";

export const getFirstDayNumber = (firstDay: FirstDay): number | null => {
  const firstDayNumber: number | null =
    firstDay === "monday"
      ? 1
      : firstDay === "saturday"
      ? 6
      : firstDay === "sunday"
      ? 7
      : null;

  return firstDayNumber;
};
