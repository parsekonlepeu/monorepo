import { getDayPicker } from "./getDayPicker";

const locale = "fr";

describe("", () => {
  describe("for firstday equal to monday", () => {
    test("should return an array of length 7", () => {
      expect(getDayPicker(locale, "monday").length).toBe(7);
    });
    test("should have monday as first day", () => {
      expect(getDayPicker(locale, "monday")[0][0]).toBe("L");
      expect(getDayPicker(locale, "monday")[0][1]).toBe("lundi");
    });
  });
  describe("for firstday equal to saturday", () => {
    test("should return an array of length 7", () => {
      expect(getDayPicker(locale, "saturday").length).toBe(7);
    });
    test("should have monday as first day", () => {
      expect(getDayPicker(locale, "saturday")[0][0]).toBe("S");
      expect(getDayPicker(locale, "saturday")[0][1]).toBe("samedi");
    });
  });
  describe("for firstday equal to sunday", () => {
    test("should return an array of length 7", () => {
      expect(getDayPicker(locale, "sunday").length).toBe(7);
    });
    test("should have monday as first day", () => {
      expect(getDayPicker(locale, "sunday")[0][0]).toBe("D");
      expect(getDayPicker(locale, "sunday")[0][1]).toBe("dimanche");
    });
  });
});
