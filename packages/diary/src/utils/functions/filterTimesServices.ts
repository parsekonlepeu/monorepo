import { DateTime } from "luxon";
import { Diary, EventDiary, ListTime } from "../../types";

export const filterTimesServices = (
  times: ListTime,
  diarys: Diary[],
  eventTemp: EventDiary
): ListTime => {
  let timeFilter: ListTime = [];
  const idDiaryEvent = eventTemp.idDiary;
  const diary = diarys.find((diary) => diary.id === idDiaryEvent);
  if (diary) {
    const eventFilter = diary.events.filter(
      (event) =>
        event.start.year === eventTemp.start.year &&
        event.start.month === eventTemp.start.month &&
        event.type === "service"
    );
    console.log("eventFilter", eventFilter);
    console.log("eventTemp.duration", eventTemp.duration);
    for (const time of times) {
      let validTime = true;
      const timeWithEventTemp = {
        ...time.dateObject,
        day: eventTemp.start.day,
        month: eventTemp.start.month,
        year: eventTemp.start.year,
      };
      const unixIntegerTimeStart =
        DateTime.fromObject(timeWithEventTemp).toUnixInteger();
      const unixIntegerTimeEnd = unixIntegerTimeStart + eventTemp.duration * 60;
      for (const event of eventFilter) {
        const unixIntegerEventStart = event.startUnixInteger;
        const unixIntegerEventEnd =
          event.startUnixInteger + event.duration * 60;
        if (
          (unixIntegerTimeStart >= unixIntegerEventStart &&
            unixIntegerTimeStart < unixIntegerEventEnd) ||
          (unixIntegerTimeEnd > unixIntegerEventStart &&
            unixIntegerTimeEnd <= unixIntegerEventEnd)
        ) {
          validTime = false;
          break;
        }
      }
      !validTime && console.log("time retiré", time);
      validTime && timeFilter.push(time);
    }
  } else {
    console.error("diary is undefined");
  }
  console.log("timeFilter", timeFilter);
  return timeFilter;
};
