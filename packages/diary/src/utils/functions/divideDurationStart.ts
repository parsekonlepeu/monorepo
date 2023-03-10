import { DateTime } from "luxon";

export const divideDurationStart = (
  start: DateTime,
  duration: number
): { duration: number; start: DateTime }[] => {
  const startPlusOne = start.plus({ days: 1 }).set({ hour: 0, minute: 0 });
  const diff = startPlusOne.diff(start, "minutes").toObject().minutes;
  return [
    {
      duration: diff ? diff : 0,
      start: start,
    },
    {
      duration: diff ? duration - diff : 0,
      start: startPlusOne,
    },
  ];
};
