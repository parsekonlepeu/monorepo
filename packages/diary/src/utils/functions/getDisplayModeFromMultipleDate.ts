import { DateTime } from "luxon";
import { DisplayMode, MultipleDates } from "../../types";

export const getDisplayModeFromMultipleDate = (
  multipleDate: MultipleDates
): DisplayMode => {
  const start = DateTime.fromObject(multipleDate.start);
  const end = DateTime.fromObject(multipleDate.end);
  const diff = Math.floor(end.diff(start, "days").toObject().days as number);
  switch (diff) {
    case 0:
      return "Day";
    case 1:
      return "2 days";
    case 2:
      return "3 days";
    case 3:
      return "4 days";
    case 4:
      return "5 days";
    case 5:
      return "6 days";
    case 6:
      return "7 days";
    case 13:
      return "2 weeks";
    case 20:
      return "3 weeks";
    case 27:
      return "4 weeks";
    default:
      return "Day";
  }
};
