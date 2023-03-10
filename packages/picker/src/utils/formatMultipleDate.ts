import { DateTime, ToObjectOutput } from "luxon";
import { FirstDay, MultipleDates } from "../types";
import { getDateEndRow } from "./getDateEndRow";
import { getDateStartRow } from "./getDateStartRow";

export const formatMultipleDate = (
  multipleDate: MultipleDates,
  firstDayWeek: FirstDay
): MultipleDates => {
  const diff =
    multipleDate &&
    (DateTime.fromObject(multipleDate.end)
      .diff(DateTime.fromObject(multipleDate.start), "days")
      .toObject().days as number);
  let multipleDateReturn = { ...multipleDate };
  if (Math.abs(diff) < 7) {
    diff < 0
      ? (multipleDateReturn = {
          start: multipleDate.end,
          end: multipleDate.start,
        })
      : (multipleDateReturn = multipleDate);
  } else if (Math.abs(diff) >= 7 && Math.abs(diff) < 28) {
    if (diff < 0) {
      const dateEnd = getDateEndRow(
        DateTime.fromObject(multipleDate.start),
        firstDayWeek
      );
      const dateStart = getDateStartRow(
        DateTime.fromObject(multipleDate.end),
        firstDayWeek
      );
      const multipleDatesFormated = {
        start: dateStart.toObject(),
        end: dateEnd.toObject(),
      };
      multipleDateReturn = multipleDatesFormated;
    } else {
      const dateStart = getDateStartRow(
        DateTime.fromObject(multipleDate.start),
        firstDayWeek
      );
      const dateEnd = getDateEndRow(
        DateTime.fromObject(multipleDate.end),
        firstDayWeek
      );
      const multipleDatesFormated = {
        start: dateStart.toObject(),
        end: dateEnd.toObject(),
      };
      multipleDateReturn = multipleDatesFormated;
    }
  } else {
    if (diff < 0) {
      const dateEnd = getDateEndRow(
        DateTime.fromObject(multipleDate.start),
        firstDayWeek
      );
      const dateStart = dateEnd.minus({ days: 27 });
      const multipleDatesFormated = {
        start: dateStart.toObject(),
        end: dateEnd.toObject(),
      };
      multipleDateReturn = multipleDatesFormated;
    } else {
      const dateStart = getDateStartRow(
        DateTime.fromObject(multipleDate.start),
        firstDayWeek
      );
      const dateEnd = getDateEndRow(dateStart.plus({ days: 27 }), firstDayWeek);
      const multipleDatesFormated = {
        start: dateStart.toObject(),
        end: dateEnd.toObject(),
      };
      multipleDateReturn = multipleDatesFormated;
    }
  }
  return multipleDateReturn;
};
