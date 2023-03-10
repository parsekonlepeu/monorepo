import { getFirstDayNumber } from "./getFirstDayNumber";

describe("getFirstDayNumber", () => {
  test("should return 1 if firstday is monday", () => {
    expect(getFirstDayNumber("monday")).toBe(1);
  });
  test("should return 6 if firstday is saturday", () => {
    expect(getFirstDayNumber("saturday")).toBe(6);
  });
  test("should return 7 if firstday is sunday", () => {
    expect(getFirstDayNumber("sunday")).toBe(7);
  });
});
