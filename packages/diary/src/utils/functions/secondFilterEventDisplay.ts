import { DateTime } from "luxon";
import { EventDiaryDisplay, SelectedDate } from "../../types";

export const secondFilterEventDipslay = (
  listeEvent: EventDiaryDisplay[],
  dateForFilter: SelectedDate,
  numbersOfDay: number
): EventDiaryDisplay[] => {
  return listeEvent.filter(
    (event) =>
      (DateTime.fromObject(event.startTruncate).toUnixInteger() >
        DateTime.fromObject(dateForFilter).toUnixInteger() &&
        DateTime.fromObject(event.startTruncate).toUnixInteger() <
          DateTime.fromObject(dateForFilter)
            .plus({ days: numbersOfDay })
            .toUnixInteger()) ||
      (DateTime.fromObject(event.startTruncate)
        .plus({ minutes: event.durationTruncate })
        .toUnixInteger() > DateTime.fromObject(dateForFilter).toUnixInteger() &&
        DateTime.fromObject(event.startTruncate)
          .plus({ minutes: event.durationTruncate })
          .toUnixInteger() <
          DateTime.fromObject(dateForFilter)
            .plus({ days: numbersOfDay })
            .toUnixInteger())
  );
};
