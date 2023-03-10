import { DateTime } from "luxon";
import { EventDiary } from "../../types";

export const formatMoreThan_24 = (
  moreThan_24: EventDiary[]
): EventDiary[][] => {
  if (moreThan_24.length === 0) {
    return [[]];
  }
  const firstEventShift = moreThan_24.shift() as EventDiary;
  let moreThan_24Format: EventDiary[][] = [[firstEventShift]];
  while (moreThan_24.length > 0) {
    const eventShift = moreThan_24.shift() as EventDiary;
    let canAddInRow = false;
    let indexForAdd;
    for (const [index, row] of moreThan_24Format.entries()) {
      if (canAddInRow) {
        break;
      }
      for (const event of row) {
        const eventShiftStartDt = DateTime.fromObject(eventShift.start).set({
          minute: 0,
          hour: 0,
        });
        const eventEndDt = DateTime.fromObject(event.start)
          .plus({ minutes: event.duration })
          .set({
            minute: 59,
            hour: 23,
          });
        const diff = eventShiftStartDt
          .diff(eventEndDt, "minutes")
          .toObject().minutes;
        if (diff && diff > 0) {
          canAddInRow = true;
          indexForAdd = index;
        } else {
          canAddInRow = false;
          break;
        }
      }
    }
    if (canAddInRow && indexForAdd !== undefined) {
      moreThan_24Format[indexForAdd].push(eventShift);
    } else {
      moreThan_24Format.push([eventShift]);
    }
  }
  return moreThan_24Format;
};
