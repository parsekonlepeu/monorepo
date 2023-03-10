import { DateTime } from "luxon";
import { ListTime } from "../../types";

export const getListTime = () => {
  const dateInit = DateTime.local(1990, 10, 11, 0, 0, 0, 0);
  const listReturn: ListTime = [];
  for (let i = 0; i < 24 * 4; i++) {
    const dt = dateInit.plus({ minutes: i * 15 });
    const time24 = dt.toLocaleString(DateTime.TIME_24_SIMPLE);
    const time12 = dt.toFormat("h:mma");
    listReturn.push({
      time12: time12,
      time24: time24,
    });
  }
  return listReturn;
};
