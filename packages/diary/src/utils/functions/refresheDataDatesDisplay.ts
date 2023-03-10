import { DateTime } from "luxon";
import { DatesDatasDisplay } from "../../components/viewsCalendar/weeksView/WeekView";
import { EventDiary, EventDiaryDisplay } from "../../types";
import { canInsertInWeek } from "./canInsertInWeek";

export const refreshDatasDatesDisplay = (
  moreThan_24Divide: EventDiaryDisplay[],
  lessThan_24: EventDiary[],
  datesDisplay: DatesDatasDisplay[][]
): void => {
  let MoreThan_24Divide = [...moreThan_24Divide];
  let LessThan_24 = [...lessThan_24];
  for (const [indexWeek, week] of datesDisplay.entries()) {
    for (const [indexDay, day] of week.entries()) {
      const MoreThan_24DivideFilter = MoreThan_24Divide.filter(
        (event) =>
          event.startTruncate.day === day.date.day &&
          event.startTruncate.month === day.date.month &&
          event.startTruncate.year === day.date.year
      );
      const LessThan_24Filter = LessThan_24.filter(
        (event) =>
          event.start.day === day.date.day &&
          event.start.month === day.date.month &&
          event.start.year === day.date.year
      );
      for (const event of MoreThan_24DivideFilter) {
        let eventAdd = false;
        let indexRowWeek = 0;
        const startTruncateDt = DateTime.fromObject(event.startTruncate);
        const endTruncateDt = startTruncateDt.plus({
          minutes: event.durationTruncate,
        });
        const numberDay = Math.ceil(
          endTruncateDt.diff(startTruncateDt, "days").toObject().days as number
        );
        while (!eventAdd) {
          const canInsert = canInsertInWeek(
            indexRowWeek,
            indexDay,
            numberDay,
            week
          );
          if (canInsert) {
            datesDisplay[indexWeek][indexDay].datas[indexRowWeek] = event;
            for (let i = 1; i < numberDay; i++) {
              datesDisplay[indexWeek][indexDay + i].datas[indexRowWeek] =
                "forPlacement";
            }
            eventAdd = true;
          } else {
            indexRowWeek++;
          }
        }
      }
      for (const event of LessThan_24Filter) {
        let eventAdd = false;
        let indexRowWeek = 0;
        while (!eventAdd) {
          const canInsert = canInsertInWeek(indexRowWeek, indexDay, 1, week);
          if (canInsert) {
            datesDisplay[indexWeek][indexDay].datas[indexRowWeek] = {
              ...event,
              startTruncate: event.start,
              durationTruncate: event.duration,
              numberParts: 1,
            };
            eventAdd = true;
          } else {
            indexRowWeek++;
          }
        }
      }
      MoreThan_24Divide = MoreThan_24Divide.filter(
        (event) =>
          event.startTruncate.day !== day.date.day ||
          event.startTruncate.month !== day.date.month ||
          event.startTruncate.year !== day.date.year
      );
      LessThan_24 = LessThan_24.filter(
        (event) =>
          event.start.day !== day.date.day ||
          event.start.month !== day.date.month ||
          event.start.year !== day.date.year
      );
    }
  }
};
