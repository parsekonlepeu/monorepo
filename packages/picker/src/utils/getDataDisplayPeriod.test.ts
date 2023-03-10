import { MultipleDates } from "../types";
import { getDataDisplayPeriod } from "./getDataDisplayPeriod";
import { base_date, getDates } from "@parsekonlepeu/sharedutils";

const arrayDate = getDates("sunday", 2, 2023);

describe("getDataDisplayPeriod", () => {
  test("should return a void array if multipleDate is null", () => {
    const r = getDataDisplayPeriod(null, arrayDate);
    expect(r).toEqual([]);
  });
  test("should return an array of size 1 with correct period", () => {
    const dateStart = {
      year: 2023,
      month: 2,
      day: 8,
      ...base_date,
    };
    const dateEnd = {
      year: 2023,
      month: 2,
      day: 10,
      ...base_date,
    };
    const multDate: MultipleDates = {
      start: dateStart,
      end: dateEnd,
    };
    const r = getDataDisplayPeriod(multDate, arrayDate);
    expect(r.length).toBe(1);
    expect(r[0].start).toBe(4);
    expect(r[0].end).toBe(6);
    expect(r[0].week).toBe(5);
  });
  test("should return an array of size 2 with correct period", () => {
    const dateStart = {
      year: 2023,
      month: 2,
      day: 8,
      ...base_date,
    };
    const dateEnd = {
      year: 2023,
      month: 2,
      day: 14,
      ...base_date,
    };
    const multDate: MultipleDates = {
      start: dateStart,
      end: dateEnd,
    };
    const r = getDataDisplayPeriod(multDate, arrayDate);
    expect(r.length).toBe(2);
    expect(r[0].start).toBe(4);
    expect(r[0].end).toBe(7);
    expect(r[0].week).toBe(5);
    expect(r[1].start).toBe(1);
    expect(r[1].end).toBe(3);
    expect(r[1].week).toBe(4);
  });
  test("should return an array of size 4 with correct period", () => {
    const dateStart = {
      year: 2023,
      month: 2,
      day: 5,
      ...base_date,
    };
    const dateEnd = {
      year: 2023,
      month: 3,
      day: 4,
      ...base_date,
    };
    const multDate: MultipleDates = {
      start: dateStart,
      end: dateEnd,
    };
    const r = getDataDisplayPeriod(multDate, arrayDate);
    expect(r.length).toBe(4);
    expect(r[0].start).toBe(1);
    expect(r[0].end).toBe(7);
    expect(r[0].week).toBe(5);
    expect(r[1].start).toBe(1);
    expect(r[1].end).toBe(7);
    expect(r[1].week).toBe(4);
    expect(r[2].start).toBe(1);
    expect(r[2].end).toBe(7);
    expect(r[2].week).toBe(3);
    expect(r[3].start).toBe(1);
    expect(r[3].end).toBe(7);
    expect(r[3].week).toBe(2);
  });
});
