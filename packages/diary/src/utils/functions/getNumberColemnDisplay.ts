import { DateTime } from "luxon";

export const getNumberColumnDisplay = (
  start: DateTime,
  end: DateTime,
  dayOne: DateTime,
  numberDay: number
): number => {
  let startTrunc = start.set({
    hour: 0,
    minute: 0,
  });
  let endTrunc = end.set({
    hour: 23,
    minute: 59,
  });

  const lastDay = dayOne.plus({ days: numberDay });

  const diffStartDayOne = start.diff(dayOne, "minutes").toObject().minutes;
  const diffEndLastDay = end.diff(lastDay, "minutes").toObject().minutes;

  if (diffStartDayOne && diffStartDayOne < 0) {
    startTrunc = dayOne;
  }

  if (diffEndLastDay && diffEndLastDay > 0) {
    endTrunc = lastDay;
  }

  const diffEndTruncStartTrunc = endTrunc
    .diff(startTrunc, "days")
    .toObject().days;

  return diffEndTruncStartTrunc ? Math.ceil(diffEndTruncStartTrunc) : 0;
};
