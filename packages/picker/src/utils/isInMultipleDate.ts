import { DateTime } from "luxon";
import { MultipleDates } from "../types";

export const isInMultipleDate = (
  multDate: MultipleDates,
  date: DateTime
): boolean => {
  const millisDate = date.toMillis();
  const start = DateTime.fromObject(multDate.start);
  const startMillis = start.toMillis();
  const end = DateTime.fromObject(multDate.end);
  const endMillis = end.toMillis();
  return startMillis <= millisDate && endMillis >= millisDate;
};
