import { DateTime } from "luxon";
import { EventDiary } from "../../types";

export const sortEventByDateStart = (eventList: EventDiary[]): EventDiary[] => {
  return eventList.sort((event_1, event_2) => {
    const event_1StartDt = DateTime.fromObject(event_1.start);
    const event_2StartDt = DateTime.fromObject(event_2.start);
    return event_1StartDt.toUnixInteger() - event_2StartDt.toUnixInteger();
  });
};
