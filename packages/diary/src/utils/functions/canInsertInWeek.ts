import { DatesDatasDisplay } from "../../components/viewsCalendar/weeksView/WeekView";

export const canInsertInWeek = (
  indexRowWeek: number,
  indexDay: number,
  numberDay: number,
  week: DatesDatasDisplay[]
): boolean => {
  let canInsert = true;
  if (numberDay === 1) {
    return !Boolean(week[indexDay].datas[indexRowWeek]);
  }
  for (let i = 0; i < numberDay; i++) {
    if (indexDay + i < 7 && week[indexDay + i].datas[indexRowWeek]) {
      canInsert = false;
    }
  }

  return canInsert;
};
