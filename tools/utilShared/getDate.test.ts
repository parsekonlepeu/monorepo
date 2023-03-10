import { getDates } from "./getDates";
import { random } from "lodash";
import type { FirstDay } from "@parsekonlepeu/picker";

const rand_month = random(1, 12);

const rand_year = random(2000, 2030);

const rand_index_first_day = random(0, 2);

const firstDayList: FirstDay[] = ["monday", "saturday", "sunday"];

describe("getDates", () => {
  test("should return an array of length 6", () => {
    expect(
      getDates(firstDayList[rand_index_first_day], rand_month, rand_year).length
    ).toBe(6);
  });
  test("should return an array containing array of length 7", () => {
    for (let i = 0; i < 6; i++) {
      expect(
        getDates(firstDayList[rand_index_first_day], rand_month, rand_year)[i]
          .length
      ).toBe(7);
    }
  });
});
