import { base_date } from "@parsekonlepeu/utils";
import { DateTime } from "luxon";
import { getDateEndRow } from "./getDateEndRow";

const date_1 = DateTime.fromObject({
  day: 12,
  month: 2,
  year: 2023,
  ...base_date,
});

const date_2 = DateTime.fromObject({
  day: 15,
  month: 2,
  year: 2023,
  ...base_date,
});

const date_3 = DateTime.fromObject({
  day: 18,
  month: 2,
  year: 2023,
  ...base_date,
});

describe("getDateEndRow", () => {
  test("for firstday equal to monday", () => {
    const r_1 = getDateEndRow(date_1, "monday");
    const r_2 = getDateEndRow(date_2, "monday");
    const r_3 = getDateEndRow(date_3, "monday");
    expect(r_1.day).toBe(12);
    expect(r_1.month).toBe(2);
    expect(r_1.year).toBe(2023);
    expect(r_2.day).toBe(19);
    expect(r_2.month).toBe(2);
    expect(r_2.year).toBe(2023);
    expect(r_3.day).toBe(19);
    expect(r_3.month).toBe(2);
    expect(r_3.year).toBe(2023);
  });
  test("for firstday equal to saturday", () => {
    const r_1 = getDateEndRow(date_1, "saturday");
    const r_2 = getDateEndRow(date_2, "saturday");
    const r_3 = getDateEndRow(date_3, "saturday");
    expect(r_1.day).toBe(17);
    expect(r_1.month).toBe(2);
    expect(r_1.year).toBe(2023);
    expect(r_2.day).toBe(17);
    expect(r_2.month).toBe(2);
    expect(r_2.year).toBe(2023);
    expect(r_3.day).toBe(24);
    expect(r_3.month).toBe(2);
    expect(r_3.year).toBe(2023);
  });
  test("for firstday equal to sunday", () => {
    const r_1 = getDateEndRow(date_1, "sunday");
    const r_2 = getDateEndRow(date_2, "sunday");
    const r_3 = getDateEndRow(date_3, "sunday");
    expect(r_1.day).toBe(18);
    expect(r_1.month).toBe(2);
    expect(r_1.year).toBe(2023);
    expect(r_2.day).toBe(18);
    expect(r_2.month).toBe(2);
    expect(r_2.year).toBe(2023);
    expect(r_3.day).toBe(18);
    expect(r_3.month).toBe(2);
    expect(r_3.year).toBe(2023);
  });
});
