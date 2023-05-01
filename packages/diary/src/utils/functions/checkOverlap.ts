import { Diary, EventDiary } from "../../types";

export const checkOverlap = (
  eventDiary: EventDiary,
  diarys: Diary[]
): boolean => {
  const diary = diarys.find((diary) => diary.id === eventDiary.idDiary);
  if (diary) {
    for (const event of diary?.events) {
      if (event.duration >= 60 * 24 || event.allDay) {
        continue;
      }
      if (
        (event.startUnixInteger <= eventDiary.startUnixInteger &&
          eventDiary.startUnixInteger <=
            event.startUnixInteger + event.duration * 60) ||
        (event.startUnixInteger <=
          eventDiary.startUnixInteger + eventDiary.duration * 60 &&
          eventDiary.startUnixInteger + eventDiary.duration * 60 <=
            event.startUnixInteger + event.duration * 60)
      ) {
        return true;
      }
    }
  } else {
    console.error("diary into event temp is not defined");
  }
  return false;
};
