import * as React from "react";
import { TimeType } from "../../types";
import { DateTime } from "luxon";
import { PopoverChoiceHour } from "./PopoverChoiceHour";
import { modifEventTempDiary } from "../../store/slices/diarysSlice";
import { useAppDispatch } from "../../utils/hooks/hooksTypedRedux";
import { buttonChoiceDateCss } from "./ButtonChoiceDate";

type ButtonChoiceHourProps = {
  endOrStart: "end" | "start";
  eventTempStartDt: DateTime;
  eventTempEndDt: DateTime;
  eventTempDuration: number;
  startWithoutEnd?: boolean;
};

export const ButtonChoiceHour: React.FC<ButtonChoiceHourProps> = ({
  endOrStart,
  eventTempStartDt,
  eventTempEndDt,
  eventTempDuration,
  startWithoutEnd,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const onClick = React.useCallback(() => setIsOpen((isOpen) => !isOpen), []);
  const onClose = React.useCallback(() => setIsOpen(false), []);

  const dispatch = useAppDispatch();

  const refButtonHour = React.useRef<HTMLButtonElement | null>(null);

  const makeOnClickStartWithoutEnd = React.useCallback(
    (time: TimeType): (() => void) => {
      return () => {
        const newDateStart = DateTime.fromISO(time.time24).set({
          year: eventTempStartDt.year,
          month: eventTempStartDt.month,
          day: eventTempStartDt.day,
        });
        dispatch(
          modifEventTempDiary({
            keys: ["start", "startUnixInteger"],
            values: [newDateStart.toObject(), newDateStart.toUnixInteger()],
          })
        );
        onClose();
      };
    },
    [eventTempStartDt, eventTempEndDt, eventTempDuration]
  );

  const makeOnClickStart = React.useCallback(
    (time: TimeType): (() => void) => {
      return () => {
        const newDateStart = DateTime.fromISO(time.time24).set({
          year: eventTempStartDt.year,
          month: eventTempStartDt.month,
          day: eventTempStartDt.day,
        });
        const diff = eventTempStartDt
          .diff(newDateStart, "minutes")
          .toObject().minutes;
        const diffStartEnd = eventTempEndDt
          .diff(newDateStart, "minutes")
          .toObject().minutes;
        if (diffStartEnd && diffStartEnd > 0 && diff) {
          diff &&
            dispatch(
              modifEventTempDiary({
                keys: ["start", "duration", "startUnixInteger"],
                values: [
                  newDateStart.toObject(),
                  eventTempDuration + diff,
                  newDateStart.toUnixInteger(),
                ],
              })
            );
        }
        onClose();
      };
    },
    [eventTempStartDt, eventTempEndDt, eventTempDuration]
  );

  const makeOnClickEnd = React.useCallback(
    (time: TimeType): (() => void) => {
      return () => {
        const newDateEnd = DateTime.fromISO(time.time24).set({
          year: eventTempEndDt.year,
          month: eventTempEndDt.month,
          day: eventTempEndDt.day,
        });
        const newDuration = newDateEnd
          .diff(eventTempStartDt, "minutes")
          .toObject().minutes;
        if (newDuration && newDuration > 0) {
          dispatch(
            modifEventTempDiary({
              keys: ["duration"],
              values: [newDuration],
            })
          );
        }
        onClose();
      };
    },
    [eventTempStartDt, eventTempEndDt]
  );

  return (
    <>
      <button
        css={buttonChoiceDateCss.button}
        ref={refButtonHour}
        onClick={onClick}
      >
        <p>
          {endOrStart === "end"
            ? eventTempEndDt?.toLocaleString({
                hour: "2-digit",
                minute: "2-digit",
              })
            : eventTempStartDt?.toLocaleString({
                hour: "2-digit",
                minute: "2-digit",
              })}
        </p>
      </button>
      <PopoverChoiceHour
        makeOnClick={
          endOrStart === "start"
            ? startWithoutEnd
              ? makeOnClickStartWithoutEnd
              : makeOnClickStart
            : makeOnClickEnd
        }
        isOpen={isOpen}
        anchorEl={refButtonHour.current as HTMLButtonElement}
        onClose={onClose}
      />
    </>
  );
};
