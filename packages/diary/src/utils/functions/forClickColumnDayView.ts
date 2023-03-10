import { DateTime, ToObjectOutput } from "luxon";
import {
  addEventTemp,
  changeModalNewEvent,
  changeModalWarningNotDiarys,
  changePosModalNewEvent,
  initEventTemp,
} from "../../store/slices/diarysSlice";
import { Diary, EventDiary, SelectedDate } from "../../types";
import { HEIGHT_NEW_EVENT, WIDTH_NEW_EVENT } from "../constants";
import { v4 as uuidv4 } from "uuid";

export const forClickColumnDaysView = (
  day: SelectedDate,
  allDay: boolean,
  dispatch: any,
  diarys: Diary[]
): React.MouseEventHandler<HTMLDivElement> => {
  return (e) => {
    const modal = document.getElementById("modal-new-event");
    e.preventDefault();
    e.stopPropagation();
    if (!modal) {
      const yInDiv = e.clientY - e.currentTarget.getBoundingClientRect().top;
      const minutesGlobal = Math.floor(yInDiv / 12) * 15;
      if (diarys.length === 0) {
        dispatch(changeModalWarningNotDiarys(true));
      } else {
        const start: ToObjectOutput = {
          month: day.month,
          day: day.day,
          year: day.year,
          hour: Math.floor(minutesGlobal / 60),
          minute: minutesGlobal % 60,
          second: 0,
          millisecond: 0,
        };
        const eventAdd: EventDiary = {
          color: diarys[0].color,
          title: "",
          nameClient: "",
          id: uuidv4(),
          duration: 15,
          allDay: allDay,
          type: "event",
          description: "",
          nbRecurrence: 1,
          idDiary: diarys[0].id,
          start: start,
          startUnixInteger: DateTime.fromObject(start).toUnixInteger(),
        };
        let posX =
          e.currentTarget.getBoundingClientRect().right + WIDTH_NEW_EVENT >
          window.innerWidth
            ? e.currentTarget.getBoundingClientRect().left - WIDTH_NEW_EVENT
            : e.currentTarget.getBoundingClientRect().right;
        let posY =
          e.clientY < window.innerHeight / 2
            ? e.clientY
            : e.clientY - HEIGHT_NEW_EVENT;
        posY =
          posY < 0
            ? 10
            : posY + HEIGHT_NEW_EVENT > window.innerHeight
            ? window.innerHeight - HEIGHT_NEW_EVENT
            : posY;
        posX =
          posX < 0
            ? 10
            : posX + WIDTH_NEW_EVENT > window.innerWidth
            ? window.innerWidth - WIDTH_NEW_EVENT
            : posX;
        dispatch(addEventTemp(eventAdd));
        dispatch(
          changePosModalNewEvent({
            x: posX,
            y: posY,
          })
        );
        dispatch(changeModalNewEvent(true));
      }
    } else {
      dispatch(changeModalNewEvent(false));
      dispatch(initEventTemp(null));
    }
  };
};
