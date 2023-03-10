import { DateTime } from "luxon";
import {
  EventDiary,
  EventDiaryDisplay,
  MultipleDates,
  SelectedDate,
} from "../../types";

export const filterEventDisplay = (
  eventTotal: EventDiary[] | EventDiaryDisplay[],
  selectedDate: SelectedDate,
  numbersOfDays: number,
  multipleDates: MultipleDates | null
): EventDiary[] | EventDiaryDisplay[] => {
  const eventsReturn = [];
  if (multipleDates) {
    eventsReturn.push(
      ...eventTotal.filter((event) => {
        const eventStartDt = DateTime.fromObject(event.start);
        const eventEndDt = DateTime.fromObject(event.start).plus({
          minutes: event.duration,
        });
        const multipleDatesStartDt = DateTime.fromObject(multipleDates.start);
        const multipleDatesEndDt = DateTime.fromObject(multipleDates.end);
        const diffStartStart = eventStartDt
          .diff(multipleDatesStartDt, "days")
          .toObject().days;
        const diffEndStart = eventStartDt
          .diff(multipleDatesEndDt, "days")
          .toObject().days;
        const diffStartEnd = eventEndDt
          .diff(multipleDatesStartDt, "days")
          .toObject().days;
        const diffEndEnd = eventEndDt
          .diff(multipleDatesEndDt, "days")
          .toObject().days;
        return (
          (diffEndStart &&
            diffStartStart &&
            diffStartStart > 0 &&
            diffEndStart < 1) ||
          (diffStartEnd && diffEndEnd && diffStartEnd > 0 && diffEndEnd < 1)
        );
      })
    );
    return eventsReturn;
  } else {
    if (numbersOfDays === 1) {
      eventsReturn.push(
        ...eventTotal.filter(
          (event) =>
            DateTime.fromObject(event.start).day === selectedDate.day ||
            DateTime.fromObject(event.start).plus({ minutes: event.duration })
              .day === selectedDate.day
        )
      );
      return eventsReturn;
    } else {
      eventsReturn.push(
        ...eventTotal.filter((event) => {
          const diff = DateTime.fromObject(event.start)
            .diff(DateTime.fromObject(selectedDate), "days")
            .toObject().days;
          const diffEnd = DateTime.fromObject(event.start)
            .plus({ minutes: event.duration })
            .diff(DateTime.fromObject(selectedDate), "days")
            .toObject().days;
          return (
            diffEnd && diff && (diff < numbersOfDays || diffEnd < numbersOfDays)
          );
        })
      );
      return eventsReturn;
    }
  }
};
