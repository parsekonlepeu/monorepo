import { DateTime } from "luxon";
import { EventDiary, EventDiaryDisplay } from "../../types";

export const divideLess_24MultDay = (
  events: EventDiary[] | EventDiaryDisplay[]
): EventDiaryDisplay[] => {
  const eventsReturn: EventDiaryDisplay[] = [];
  for (const event of events) {
    const hourStart = event.start.hour;
    const minuteStart = event.start.minute;
    const minuteWithDuration = hourStart * 60 + minuteStart + event.duration;
    if (minuteWithDuration <= 24 * 60) {
      eventsReturn.push({
        ...event,
        startTruncate: event.start,
        durationTruncate: event.duration,
        numberParts: 0,
      });
    } else {
      const eventStartDt = DateTime.fromObject(event.start);
      const startTrunc = eventStartDt
        .plus({ days: 1 })
        .set({ hour: 0, minute: 0 });
      const durationTrunc_1 = startTrunc
        .diff(eventStartDt, "minutes")
        .toObject().minutes;
      const durationTrunc_2 =
        durationTrunc_1 && event.duration - durationTrunc_1;
      durationTrunc_1 &&
        durationTrunc_2 &&
        eventsReturn.push(
          {
            ...event,
            startTruncate: event.start,
            durationTruncate: durationTrunc_1,
            numberParts: 1,
          },
          {
            ...event,
            startTruncate: startTrunc.toObject(),
            durationTruncate: durationTrunc_2,
            numberParts: 2,
          }
        );
    }
  }
  return eventsReturn;
};
