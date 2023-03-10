import { getLastDayNumber } from "./getLastDayNumber";

describe("getFirstDayNumber", () => {
  test("should return 7 if firstday is monday", () => {
    expect(getLastDayNumber("monday")).toBe(7);
  });
  test("should return 5 if firstday is saturday", () => {
    expect(getLastDayNumber("saturday")).toBe(5);
  });
  test("should return 6 if firstday is sunday", () => {
    expect(getLastDayNumber("sunday")).toBe(6);
  });
});
