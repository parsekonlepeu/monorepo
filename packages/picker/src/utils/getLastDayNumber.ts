import type { FirstDay } from "../types";

export const getLastDayNumber = (firstDay: FirstDay): number | null => {
  const firstDayNumber: number | null =
    firstDay === "monday"
      ? 7
      : firstDay === "saturday"
      ? 5
      : firstDay === "sunday"
      ? 6
      : null;

  return firstDayNumber;
};
