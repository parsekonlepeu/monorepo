import { DateTime } from "luxon";
import { FirstDay } from "./typesPickerDiary";
import { getLocationOfFirst } from "./getLocationOfFirst";

export const getDates = (
  firstDay: FirstDay,
  month: number,
  year: number
): DateTime[][] => {
  const dt = DateTime.local(year, month, 1);

  const row_1 = new Array(7).fill(0);
  const row_2 = new Array(7).fill(0);
  const row_3 = new Array(7).fill(0);
  const row_4 = new Array(7).fill(0);
  const row_5 = new Array(7).fill(0);
  const row_6 = new Array(7).fill(0);

  const daysReturn = [row_1, row_2, row_3, row_4, row_5, row_6];

  const arrayIndex = [0, 1, 2, 3, 4, 5, 6];

  const locationOfFirst = getLocationOfFirst(firstDay, dt);

  const indexFilling = arrayIndex.findIndex((item) => item === locationOfFirst);

  const lengthLeft = arrayIndex.slice(0, indexFilling).length;

  const lengthRight =
    indexFilling === 6 ? 0 : arrayIndex.slice(indexFilling + 1).length;

  for (let j = 1; j <= lengthLeft; j++) {
    for (let i = 0; i < 6; i++) {
      daysReturn[i][indexFilling - j] = dt
        .plus({
          days: i * 7,
        })
        .minus({
          days: j,
        });
    }
  }
  for (let j = 1; j <= lengthRight; j++) {
    for (let i = 0; i < 6; i++) {
      daysReturn[i][indexFilling + j] = dt.plus({
        days: i * 7 + j,
      });
    }
  }

  for (let i = 0; i < 6; i++) {
    daysReturn[i][indexFilling] = dt.plus({
      days: i * 7,
    });
  }

  return daysReturn as DateTime[][];
};
