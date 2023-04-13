import { Diary, EventDiary } from "../../types";

export const checkOverlap = (eventDiary: EventDiary, diarys: Diary[]) => {
  const diary = diarys.find((diary) => diary.id === eventDiary.idDiary);
  console.log("eventDiary dans checkoverlap : ", eventDiary);
  console.log("Diarys : ", diarys);
  console.log("Diary dans checkoverlap : ", diary);
};
