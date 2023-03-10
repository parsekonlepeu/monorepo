import { DateTime, WeekNumbers } from "luxon";
import { MultipleDates, Period, StartEndPeriod } from "../types";
import { getWeekNumber } from "./getWeekNumber";
import { cloneDeep } from "lodash";

/**
 * separate multiple date in several
 * pieces according to the dates
 * of the month display if necessary
 * for the display
 * @param multipleDates
 * @param arrayDates
 * @returns
 */
export const getDataDisplayPeriod = (
  multipleDates: MultipleDates | null,
  arrayDates: DateTime[][]
): Period[] => {
  if (multipleDates !== null) {
    let MultipleDates: MultipleDates | null = null;

    const mD = {
      start: DateTime.fromObject(multipleDates.start),
      end: DateTime.fromObject(multipleDates.end),
    };

    const diff = mD.start.diff(mD.end, "days").toObject();

    if (diff.days && diff.days > 0) {
      MultipleDates = {
        start: mD.end,
        end: mD.start,
      };
    } else {
      MultipleDates = {
        start: mD.start,
        end: mD.end,
      };
    }

    const dateReturn: Period[] = [];

    let periodAdd: Period = {
      start: null,
      end: null,
      week: null,
    };

    let mStartAdd = false;

    for (const [indexRow, row] of arrayDates.entries()) {
      for (const [indexColumn, date] of row.entries()) {
        if (!mStartAdd) {
          if (
            date.day === MultipleDates.start.day &&
            date.month === MultipleDates.start.month &&
            date.year === MultipleDates.start.year
          ) {
            if (indexColumn === 6) {
              periodAdd = {
                start: (indexColumn + 1) as StartEndPeriod,
                end: (indexColumn + 1) as StartEndPeriod,
                week: getWeekNumber(indexRow) as WeekNumbers,
              };

              dateReturn.push(cloneDeep(periodAdd));

              periodAdd = {
                start: 1,
                end: null,
                week: getWeekNumber(indexRow + 1) as WeekNumbers,
              };
            } else {
              periodAdd.start = (indexColumn + 1) as StartEndPeriod;
              periodAdd.week = getWeekNumber(indexRow) as WeekNumbers;
            }

            mStartAdd = true;
          }
        } else {
          if (
            date.day === MultipleDates.end.day &&
            date.month === MultipleDates.end.month &&
            date.year === MultipleDates.end.year
          ) {
            periodAdd.end = (indexColumn + 1) as StartEndPeriod;

            dateReturn.push(cloneDeep(periodAdd));

            return dateReturn;
          } else if (indexColumn === 6) {
            periodAdd.end = (indexColumn + 1) as StartEndPeriod;

            dateReturn.push(cloneDeep(periodAdd));

            periodAdd = {
              start: 1,
              end: null,
              week: getWeekNumber(indexRow + 1) as WeekNumbers,
            };
          }
        }
      }
    }

    return dateReturn;
  }

  return [];
};
