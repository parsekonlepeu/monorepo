import { base_date } from "@parsekonlepeu/sharedutils";
import { DateTime } from "luxon";
import { MultipleDates } from "../types";
import { formatMultipleDate } from "./formatMultipleDate";

const date = DateTime.fromObject({
  year: 2023,
  month: 2,
  day: 1,
  ...base_date,
});

const date_for_reverse = DateTime.fromObject({
  year: 2023,
  month: 2,
  day: 28,
  ...base_date,
});

const withDiffEqualTo5: MultipleDates = {
  start: date.toObject(),
  end: date.plus({ days: 5 }).toObject(),
};

const withDiffEqualTo5Reverse: MultipleDates = {
  start: date_for_reverse.toObject(),
  end: date_for_reverse.minus({ days: 5 }).toObject(),
};

const withDiffEqualTo8: MultipleDates = {
  start: date.toObject(),
  end: date.plus({ days: 8 }).toObject(),
};

const withDiffEqualTo8Reverse: MultipleDates = {
  start: date_for_reverse.toObject(),
  end: date_for_reverse.minus({ days: 8 }).toObject(),
};

const withDiffEqualTo29: MultipleDates = {
  start: date.toObject(),
  end: date.plus({ days: 29 }).toObject(),
};

const withDiffEqualTo29Reverse: MultipleDates = {
  start: date_for_reverse.toObject(),
  end: date_for_reverse.minus({ days: 29 }).toObject(),
};

test("should return multiple date with diff absolute of 5 ", () => {
  const multDateReturn = formatMultipleDate(withDiffEqualTo5, "monday");
  const multDateReverseReturn = formatMultipleDate(
    withDiffEqualTo5Reverse,
    "monday"
  );
  const startMultDateReturn = DateTime.fromObject(multDateReturn.start);
  const endMultDateReturn = DateTime.fromObject(multDateReturn.end);
  const startMultDateReverseReturn = DateTime.fromObject(
    multDateReverseReturn.start
  );
  const endMultDateReverseReturn = DateTime.fromObject(
    multDateReverseReturn.end
  );
  const diffMultDateReturn = Math.abs(
    endMultDateReturn.diff(startMultDateReturn, "days").toObject()
      .days as number
  );
  const diffMultDateReverseReturn = Math.abs(
    endMultDateReverseReturn.diff(startMultDateReverseReturn, "days").toObject()
      .days as number
  );
  expect(diffMultDateReturn).toEqual(5);
  expect(diffMultDateReverseReturn).toEqual(5);
});

describe("formatMultipleDate", () => {
  describe("first day equal to 'monday'", () => {
    describe("diff between start and end equal to 5", () => {
      test("should return multiple date with diff absolute of 5 ", () => {
        const multDateReturn = formatMultipleDate(withDiffEqualTo5, "monday");
        const multDateReverseReturn = formatMultipleDate(
          withDiffEqualTo5Reverse,
          "monday"
        );
        const startMultDateReturn = DateTime.fromObject(multDateReturn.start);
        const endMultDateReturn = DateTime.fromObject(multDateReturn.end);
        const startMultDateReverseReturn = DateTime.fromObject(
          multDateReverseReturn.start
        );
        const endMultDateReverseReturn = DateTime.fromObject(
          multDateReverseReturn.end
        );
        const diffMultDateReturn = Math.abs(
          endMultDateReturn.diff(startMultDateReturn, "days").toObject()
            .days as number
        );
        const diffMultDateReverseReturn = Math.abs(
          endMultDateReverseReturn
            .diff(startMultDateReverseReturn, "days")
            .toObject().days as number
        );
        expect(diffMultDateReturn).toEqual(5);
        expect(diffMultDateReverseReturn).toEqual(5);
      });
      test("should return the correct multiple date for normal sens", () => {
        const multDateReturn = formatMultipleDate(withDiffEqualTo5, "monday");
        const expectedReturn: MultipleDates = {
          start: withDiffEqualTo5.start,
          end: withDiffEqualTo5.end,
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
      test("should return multiple date with start and end inverts", () => {
        const multDateReturn = formatMultipleDate(
          withDiffEqualTo5Reverse,
          "monday"
        );
        const expectedReturn: MultipleDates = {
          start: withDiffEqualTo5Reverse.end,
          end: withDiffEqualTo5Reverse.start,
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
    });
    describe("diff between start and end equal to 8", () => {
      test("should return multiple date with diff absolute of 14 ", () => {
        const multDateReturn = formatMultipleDate(withDiffEqualTo8, "monday");
        const multDateReverseReturn = formatMultipleDate(
          withDiffEqualTo8Reverse,
          "monday"
        );
        const startMultDateReturn = DateTime.fromObject(multDateReturn.start);
        const endMultDateReturn = DateTime.fromObject(multDateReturn.end);
        const startMultDateReverseReturn = DateTime.fromObject(
          multDateReverseReturn.start
        );
        const endMultDateReverseReturn = DateTime.fromObject(
          multDateReverseReturn.end
        );
        const diffMultDateReturn = Math.abs(
          endMultDateReturn.diff(startMultDateReturn, "days").toObject()
            .days as number
        );
        const diffMultDateReverseReturn = Math.abs(
          endMultDateReverseReturn
            .diff(startMultDateReverseReturn, "days")
            .toObject().days as number
        );
        expect(diffMultDateReturn).toEqual(13);
        expect(diffMultDateReverseReturn).toEqual(13);
      });
      test("should return the correct multipleDate if start is before end", () => {
        const multDateReturn = formatMultipleDate(withDiffEqualTo8, "monday");
        const expectedReturn: MultipleDates = {
          start: {
            year: 2023,
            month: 1,
            day: 30,
            ...base_date,
          },
          end: {
            year: 2023,
            month: 2,
            day: 12,
            ...base_date,
          },
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
      test("should return the correct multiple date for reverse", () => {
        const multDateReturn = formatMultipleDate(
          withDiffEqualTo8Reverse,
          "monday"
        );
        const expectedReturn: MultipleDates = {
          start: {
            year: 2023,
            month: 2,
            day: 20,
            ...base_date,
          },
          end: {
            year: 2023,
            month: 3,
            day: 5,
            ...base_date,
          },
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
    });
    describe("diff between start and end bigger than 29", () => {
      test("should return multiple date with diff absolute of 29 ", () => {
        const multDateReturn = formatMultipleDate(withDiffEqualTo29, "monday");
        const multDateReverseReturn = formatMultipleDate(
          withDiffEqualTo29Reverse,
          "monday"
        );
        const startMultDateReturn = DateTime.fromObject(multDateReturn.start);
        const endMultDateReturn = DateTime.fromObject(multDateReturn.end);
        const startMultDateReverseReturn = DateTime.fromObject(
          multDateReverseReturn.start
        );
        const endMultDateReverseReturn = DateTime.fromObject(
          multDateReverseReturn.end
        );
        const diffMultDateReturn = Math.abs(
          endMultDateReturn.diff(startMultDateReturn, "days").toObject()
            .days as number
        );
        const diffMultDateReverseReturn = Math.abs(
          endMultDateReverseReturn
            .diff(startMultDateReverseReturn, "days")
            .toObject().days as number
        );
        expect(diffMultDateReturn).toEqual(27);
        expect(diffMultDateReverseReturn).toEqual(27);
      });
      test("should return the correct multiple date for normal sens", () => {
        const multDateReturn = formatMultipleDate(withDiffEqualTo29, "monday");
        const expectedReturn: MultipleDates = {
          start: {
            year: 2023,
            month: 1,
            day: 30,
            ...base_date,
          },
          end: {
            year: 2023,
            month: 2,
            day: 26,
            ...base_date,
          },
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
      test("should return the correct multiple date for reverse", () => {
        const multDateReturn = formatMultipleDate(
          withDiffEqualTo29Reverse,
          "monday"
        );
        const expectedReturn: MultipleDates = {
          start: {
            year: 2023,
            month: 2,
            day: 6,
            ...base_date,
          },
          end: {
            year: 2023,
            month: 3,
            day: 5,
            ...base_date,
          },
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
    });
  });
  describe("first day equal to 'saturday'", () => {
    describe("diff between start and end equal to 5", () => {
      test("should return multiple date with diff absolute of 5 ", () => {
        const multDateReturn = formatMultipleDate(withDiffEqualTo5, "monday");
        const multDateReverseReturn = formatMultipleDate(
          withDiffEqualTo5Reverse,
          "saturday"
        );
        const startMultDateReturn = DateTime.fromObject(multDateReturn.start);
        const endMultDateReturn = DateTime.fromObject(multDateReturn.end);
        const startMultDateReverseReturn = DateTime.fromObject(
          multDateReverseReturn.start
        );
        const endMultDateReverseReturn = DateTime.fromObject(
          multDateReverseReturn.end
        );
        const diffMultDateReturn = Math.abs(
          endMultDateReturn.diff(startMultDateReturn, "days").toObject()
            .days as number
        );
        const diffMultDateReverseReturn = Math.abs(
          endMultDateReverseReturn
            .diff(startMultDateReverseReturn, "days")
            .toObject().days as number
        );
        expect(diffMultDateReturn).toEqual(5);
        expect(diffMultDateReverseReturn).toEqual(5);
      });
      test("should return the correct multiple date for normal sens", () => {
        const multDateReturn = formatMultipleDate(withDiffEqualTo5, "saturday");
        const expectedReturn: MultipleDates = {
          start: withDiffEqualTo5.start,
          end: withDiffEqualTo5.end,
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
      test("should return the correct multiple date for reverse", () => {
        const multDateReturn = formatMultipleDate(
          withDiffEqualTo5Reverse,
          "saturday"
        );
        const expectedReturn: MultipleDates = {
          start: withDiffEqualTo5Reverse.end,
          end: withDiffEqualTo5Reverse.start,
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
    });
    describe("diff between start and end equal to 8", () => {
      test("should return the correct multiple date for normal sens", () => {
        const multDateReturn = formatMultipleDate(withDiffEqualTo8, "saturday");
        const expectedReturn: MultipleDates = {
          start: {
            year: 2023,
            month: 1,
            day: 28,
            ...base_date,
          },
          end: {
            year: 2023,
            month: 2,
            day: 10,
            ...base_date,
          },
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
      test("should return the correct multiple date for reverse", () => {
        const multDateReturn = formatMultipleDate(
          withDiffEqualTo8Reverse,
          "saturday"
        );
        const expectedReturn: MultipleDates = {
          start: {
            year: 2023,
            month: 2,
            day: 18,
            ...base_date,
          },
          end: {
            year: 2023,
            month: 3,
            day: 3,
            ...base_date,
          },
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
    });
    describe("diff between start and end bigger than 29", () => {
      test("should return the correct multiple date for normal sens", () => {
        const multDateReturn = formatMultipleDate(
          withDiffEqualTo29,
          "saturday"
        );
        const expectedReturn: MultipleDates = {
          start: {
            year: 2023,
            month: 1,
            day: 28,
            ...base_date,
          },
          end: {
            year: 2023,
            month: 2,
            day: 24,
            ...base_date,
          },
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
      test("should return the correct multiple date for reverse", () => {
        const multDateReturn = formatMultipleDate(
          withDiffEqualTo29Reverse,
          "saturday"
        );
        const expectedReturn: MultipleDates = {
          start: {
            year: 2023,
            month: 2,
            day: 4,
            ...base_date,
          },
          end: {
            year: 2023,
            month: 3,
            day: 3,
            ...base_date,
          },
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
    });
  });
  describe("first day equal to 'sunday'", () => {
    describe("diff between start and end equal to 5", () => {
      test("should return the correct multiple date for normal sens", () => {
        const multDateReturn = formatMultipleDate(withDiffEqualTo5, "sunday");
        const expectedReturn: MultipleDates = {
          start: withDiffEqualTo5.start,
          end: withDiffEqualTo5.end,
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
      test("should return the correct multiple date for reverse", () => {
        const multDateReturn = formatMultipleDate(
          withDiffEqualTo5Reverse,
          "sunday"
        );
        const expectedReturn: MultipleDates = {
          start: withDiffEqualTo5Reverse.end,
          end: withDiffEqualTo5Reverse.start,
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
    });
    describe("diff between start and end equal to 8", () => {
      test("should return the correct multiple date for normal sens", () => {
        const multDateReturn = formatMultipleDate(withDiffEqualTo8, "sunday");
        const expectedReturn: MultipleDates = {
          start: {
            year: 2023,
            month: 1,
            day: 29,
            ...base_date,
          },
          end: {
            year: 2023,
            month: 2,
            day: 11,
            ...base_date,
          },
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
      test("should return the correct multiple date for reverse", () => {
        const multDateReturn = formatMultipleDate(
          withDiffEqualTo8Reverse,
          "sunday"
        );
        const expectedReturn: MultipleDates = {
          start: {
            year: 2023,
            month: 2,
            day: 19,
            ...base_date,
          },
          end: {
            year: 2023,
            month: 3,
            day: 4,
            ...base_date,
          },
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
    });
    describe("diff between start and end bigger than 29", () => {
      test("should return the correct multiple date for normal sens", () => {
        const multDateReturn = formatMultipleDate(withDiffEqualTo29, "sunday");
        const expectedReturn: MultipleDates = {
          start: {
            year: 2023,
            month: 1,
            day: 29,
            ...base_date,
          },
          end: {
            year: 2023,
            month: 2,
            day: 25,
            ...base_date,
          },
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
      test("should return the correct multiple date for reverse", () => {
        const multDateReturn = formatMultipleDate(
          withDiffEqualTo29Reverse,
          "sunday"
        );
        const expectedReturn: MultipleDates = {
          start: {
            year: 2023,
            month: 2,
            day: 5,
            ...base_date,
          },
          end: {
            year: 2023,
            month: 3,
            day: 4,
            ...base_date,
          },
        };
        expect(multDateReturn).toEqual(expectedReturn);
      });
    });
  });
});
