import { Diary, EventDiary } from "../../types";

export const getEventDisplay = (
  diarys: Diary[],
  diarysDisplay: string[]
): EventDiary[] => {
  let eventsReturn: EventDiary[] = [];
  for (const diary of diarys) {
    if (diarysDisplay.includes(diary.id)) {
      eventsReturn = [...eventsReturn, ...diary.events];
    }
  }
  return eventsReturn;
};
