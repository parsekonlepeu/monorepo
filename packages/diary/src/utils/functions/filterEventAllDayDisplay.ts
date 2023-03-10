import { DateTime } from "luxon";
import { EventDiary, SelectedDate } from "../../types";

export const filterEventAllDayDisplay = (
  events: EventDiary[],
  selectedDate: SelectedDate,
  numbersOfDay: number
): EventDiary[] => {
  const startPeriodDisplay = DateTime.fromObject(selectedDate).set({
    minute: 0,
    hour: 0,
  });
  const endPeriodDisplay = startPeriodDisplay
    .plus({
      days: numbersOfDay - 1,
    })
    .set({
      minute: 59,
      hour: 23,
    });

  return events.filter((event) => {
    const startEvent = DateTime.fromObject(event.start);
    const endEvent = startEvent.plus({
      minutes: event.duration,
    });
    const diffStartEventStartPeriodDisplay = startEvent
      .diff(startPeriodDisplay, "minutes")
      .toObject().minutes;
    const diffStartEventEndPeriodDisplay = startEvent
      .diff(endPeriodDisplay, "minutes")
      .toObject().minutes;
    const diffEndEventStartPeriodDisplay = endEvent
      .diff(startPeriodDisplay, "minutes")
      .toObject().minutes;
    const diffEndEventEndPeriodDisplay = endEvent
      .diff(endPeriodDisplay, "minutes")
      .toObject().minutes;
    const startEventIsInPeriodDisplay =
      diffStartEventStartPeriodDisplay &&
      diffStartEventEndPeriodDisplay &&
      diffStartEventStartPeriodDisplay >= 0 &&
      diffStartEventEndPeriodDisplay <= 0;
    const endEventIsInPeriodDisplay =
      diffEndEventStartPeriodDisplay &&
      diffEndEventEndPeriodDisplay &&
      diffEndEventStartPeriodDisplay >= 0 &&
      diffEndEventEndPeriodDisplay <= 0;
    const periodDisplayIsInEvent =
      diffStartEventStartPeriodDisplay &&
      diffEndEventEndPeriodDisplay &&
      diffStartEventStartPeriodDisplay <= 0 &&
      diffEndEventEndPeriodDisplay >= 0;
    return (
      startEventIsInPeriodDisplay ||
      endEventIsInPeriodDisplay ||
      periodDisplayIsInEvent
    );
  });
};
