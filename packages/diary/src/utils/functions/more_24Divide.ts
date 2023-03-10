import { DateTime } from "luxon";
import { DatesDatasDisplay } from "../../components/viewsCalendar/weeksView/WeekView";
import { EventDiary, EventDiaryDisplay, FirstDay } from "../../types";

export const more_24Divide = (
  more_24: EventDiary[],
  firstDay: FirstDay,
  datesDisplay: DatesDatasDisplay[][]
): EventDiaryDisplay[] => {
  const firstDayPeriod = datesDisplay[0][0].date;
  const lastDayPeriod = datesDisplay.at(-1)?.at(-1)?.date;
  const more_24Return: EventDiaryDisplay[] = [];
  if (lastDayPeriod) {
    for (const event of more_24) {
      if (event.duration < 24 * 60) {
        more_24Return.push({
          ...event,
          numberParts: 1,
          startTruncate: event.start,
          durationTruncate: event.duration,
        });
        continue;
      }
      let eventTemp: EventDiary = structuredClone(event);
      // period truncation
      let startEventTempDt = DateTime.fromObject(eventTemp.start);
      let endEventTempDt = DateTime.fromObject(eventTemp.start).plus({
        minutes: event.duration,
      });
      const diffStartEventFirstDayPeriod = startEventTempDt
        .diff(firstDayPeriod, "minutes")
        .toObject().minutes;
      const diffEndEventLastDayPeriod = endEventTempDt
        .diff(lastDayPeriod, "minutes")
        .toObject().minutes;
      if (diffStartEventFirstDayPeriod && diffStartEventFirstDayPeriod < 0) {
        startEventTempDt = firstDayPeriod;
      }
      if (diffEndEventLastDayPeriod && diffEndEventLastDayPeriod > 0) {
        endEventTempDt = lastDayPeriod;
      }
      // week truncation
      let numberPartForEventTrunc: number = 1;
      for (const week of datesDisplay) {
        const lastDayWeek = week.at(-1)?.date as DateTime;
        const firstDayWeek = week[0].date as DateTime;
        const diffEventTempStartLastDayWeek = startEventTempDt
          .diff(lastDayWeek, "days")
          .toObject().days as number;
        const diffEventTempStartFirstDayWeek = startEventTempDt
          .diff(firstDayWeek, "days")
          .toObject().days as number;
        const startEventInLastDay =
          startEventTempDt.day === lastDayWeek.day &&
          startEventTempDt.month === lastDayWeek.month &&
          startEventTempDt.year === lastDayWeek.year;
        if (
          !(
            (diffEventTempStartFirstDayWeek >= 0 &&
              diffEventTempStartLastDayWeek <= 0) ||
            startEventInLastDay
          )
        ) {
          continue;
        }
        if (lastDayWeek) {
          const diffEventTempEndLastDayWeek = endEventTempDt
            .diff(lastDayWeek, "minutes")
            .toObject().minutes;
          if (diffEventTempEndLastDayWeek && diffEventTempEndLastDayWeek <= 0) {
            const durationTruncate = endEventTempDt
              .diff(startEventTempDt, "minutes")
              .toObject().minutes as number;
            more_24Return.push({
              ...event,
              numberParts: numberPartForEventTrunc,
              startTruncate: startEventTempDt.toObject(),
              durationTruncate: durationTruncate,
            });
            break;
          } else {
            const durationTruncate = lastDayWeek
              .diff(startEventTempDt, "minutes")
              .toObject().minutes as number;

            const durationTruncateDay = Math.ceil(
              lastDayWeek.diff(startEventTempDt, "days").toObject()
                .days as number
            );
            more_24Return.push({
              ...event,
              numberParts: numberPartForEventTrunc,
              startTruncate: startEventTempDt.toObject(),
              durationTruncate: durationTruncateDay * (24 * 60) + 15,
            });
            numberPartForEventTrunc++;
            startEventTempDt = lastDayWeek.plus({ days: 1 });
            eventTemp.start = startEventTempDt.toObject();
            eventTemp.duration -= durationTruncateDay * (24 * 60) + 15;
          }
        }
      }
    }
  }

  return more_24Return;
};
