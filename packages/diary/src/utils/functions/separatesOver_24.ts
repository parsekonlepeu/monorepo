import { EventDiary } from "../../types";

export const separatesOver_24 = (
  events: EventDiary[]
): { moreThan_24: EventDiary[]; lessThan_24: EventDiary[] } => {
  const eventsMoreThan_24 = events.filter(
    (event) => event.duration >= 24 * 60 || event.allDay
  );
  const eventsLessThan_24 = events.filter(
    (event) => event.duration < 24 * 60 && !event.allDay
  );
  return { moreThan_24: eventsMoreThan_24, lessThan_24: eventsLessThan_24 };
};
