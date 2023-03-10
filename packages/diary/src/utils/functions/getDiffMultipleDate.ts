import { DateTime, ToObjectOutput } from "luxon";

export const getDiffMultipleDate = (
  start: ToObjectOutput,
  end: ToObjectOutput
): number => {
  const diff = DateTime.fromObject(end)
    .diff(DateTime.fromObject(start), "days")
    .toObject().days;
  return diff ? diff : 0;
};
