import { base_date } from "@parsekonlepeu/utils";
import { DateTime } from "luxon";
import { MultipleDates } from "../types";
import { isInMultipleDate } from "./isInMultipleDate";

const multDate: MultipleDates = {
  start: {
    day: 11,
    month: 2,
    year: 2023,
    ...base_date,
  },
  end: {
    day: 20,
    month: 2,
    year: 2023,
    ...base_date,
  },
};
const date_for_test_1: DateTime = DateTime.fromObject({
  day: 5,
  month: 2,
  year: 2023,
  ...base_date,
});
const date_for_test_2: DateTime = DateTime.fromObject({
  day: 15,
  month: 2,
  year: 2023,
  ...base_date,
});
const date_for_test_3: DateTime = DateTime.fromObject({
  day: 27,
  month: 2,
  year: 2023,
  ...base_date,
});

describe("isInMultipleDate", () => {
  test("should return false if date is before start multiple date", () => {
    const r = isInMultipleDate(multDate, date_for_test_1);
    expect(r).toBe(false);
  });
  test("should return true if date is between start and end multiple date", () => {
    const r = isInMultipleDate(multDate, date_for_test_2);
    expect(r).toBe(true);
  });
  test("should return false if date is after end multiple date", () => {
    const r = isInMultipleDate(multDate, date_for_test_3);
    expect(r).toBe(false);
  });
});
