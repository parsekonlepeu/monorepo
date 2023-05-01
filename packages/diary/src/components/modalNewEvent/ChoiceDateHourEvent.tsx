import * as React from "react";
import { AccessTime } from "@mui/icons-material";
import { Checkbox, FormControlLabel, useTheme } from "@mui/material";
import { DateTime } from "luxon";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import { modifEventTempDiary } from "../../store/slices/diarysSlice";
import { ButtonChoiceDate } from "./ButtonChoiceDate";
import { ButtonChoiceHour } from "./ButtonChoiceHour";
import { OnChangeDatePicker, SelectedDate } from "@parsekonlepeu/picker";
import { css } from "@emotion/react";
import { WIDTH_MODAL_NEW_EVENT } from "../../utils/constants";

const choiceDateHourEventCss = {
  mainContenair: css({
    paddingRight: "10px",
    minWidth: `${WIDTH_MODAL_NEW_EVENT}px`,
    display: "flex",
    flexDirection: "row",
  }),
  iconContenair: css({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "70px",
    paddingTop: "10px",
  }),
  choicesContenair: css({
    display: "flex",
    paddingTop: "10px",
    flexDirection: "row",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: 600,
    "& p": {
      margin: "0px",
    },
  }),
  checkboxContenair: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10px",
    marginBottom: "10px",
  }),
};

type ChoiceDateHourEventProps = {
  withoutSelectAllDay?: boolean;
  withoutDateEnd?: boolean;
};

export const ChoiceDateHourEvent: React.FC<ChoiceDateHourEventProps> = ({
  withoutSelectAllDay,
  withoutDateEnd,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const eventTemp = useAppSelector((state) => state.diarys.eventTemp);

  if (eventTemp) {
    const eventTempStartDt: DateTime = DateTime.fromObject(eventTemp.start);
    const eventTempEndDt: DateTime = eventTempStartDt.plus({
      minutes: eventTemp.duration,
    });

    const handleChangeDateStart: OnChangeDatePicker = React.useCallback(
      (e, data) => {
        const newDate: SelectedDate = {
          ...eventTemp.start,
          month: data.selectedDate.month,
          day: data.selectedDate.day,
          year: data.selectedDate.year,
        };
        const newUnixInteger: number =
          DateTime.fromObject(newDate).toUnixInteger();
        if (withoutDateEnd) {
          dispatch(
            modifEventTempDiary({
              keys: ["start", "startUnixInteger"],
              values: [newDate, newUnixInteger],
            })
          );
        } else {
          const diff = eventTempEndDt
            .diff(DateTime.fromObject(newDate), "minutes")
            .toObject().minutes;
          if (diff && diff < 0) {
            dispatch(
              modifEventTempDiary({
                keys: ["start", "duration", "startUnixInteger"],
                values: [newDate, 15, newUnixInteger],
              })
            );
          } else {
            const diffNewStartOldStart = DateTime.fromObject(newDate)
              .diff(eventTempStartDt, "minutes")
              .toObject().minutes;
            const diffAllDayNewStartOldStart = DateTime.fromObject(newDate)
              .diff(eventTempStartDt, "days")
              .toObject().days;
            diffNewStartOldStart &&
              diffAllDayNewStartOldStart &&
              dispatch(
                modifEventTempDiary({
                  keys: ["start", "duration", "startUnixInteger"],
                  values: [
                    newDate,
                    eventTemp.duration - diffNewStartOldStart,
                    newUnixInteger,
                  ],
                })
              );
          }
        }
      },
      [eventTemp, eventTempEndDt, eventTempStartDt, withoutDateEnd]
    );

    const handleChangeDateEnd: OnChangeDatePicker = React.useCallback(
      (e, data) => {
        const dateDt = DateTime.fromObject(data.selectedDate).set({
          minute: eventTempEndDt.minute,
          hour: eventTempEndDt.hour,
        });
        const diff = dateDt
          .diff(eventTempStartDt, "minutes")
          .toObject().minutes;
        if (diff && diff >= 0) {
          dispatch(
            modifEventTempDiary({
              keys: ["duration"],
              values: [diff],
            })
          );
        } else if (diff && diff > -(24 * 60)) {
          dispatch(
            modifEventTempDiary({
              keys: ["duration"],
              values: [15],
            })
          );
        }
      },
      [eventTemp, eventTempEndDt, eventTempStartDt]
    );

    const handleClickCheckbox = React.useCallback(() => {
      dispatch(
        modifEventTempDiary({
          keys: ["allDay"],
          values: [!eventTemp.allDay],
        })
      );
    }, [eventTemp.allDay]);

    return (
      <div
        css={[
          choiceDateHourEventCss.mainContenair,
          {
            color: theme.google.onSurfaceVariantAgm,
          },
        ]}
      >
        <div css={choiceDateHourEventCss.iconContenair}>
          <AccessTime />
        </div>
        <div css={{ flexDirection: "column" }}>
          <div css={choiceDateHourEventCss.choicesContenair}>
            <ButtonChoiceDate
              dateDisplay={eventTempStartDt}
              handleChange={handleChangeDateStart}
              selectedDatePicker={eventTemp.start}
            />
            {!eventTemp.allDay ? (
              <ButtonChoiceHour
                endOrStart="start"
                eventTempStartDt={eventTempStartDt}
                eventTempEndDt={eventTempEndDt}
                eventTempDuration={eventTemp.duration}
                startWithoutEnd={withoutDateEnd}
              />
            ) : null}
            {!withoutDateEnd ? <p>{"–"}</p> : null}
            {!eventTemp.allDay && !withoutDateEnd ? (
              <ButtonChoiceHour
                endOrStart="end"
                eventTempStartDt={eventTempStartDt}
                eventTempEndDt={eventTempEndDt}
                eventTempDuration={eventTemp.duration}
              />
            ) : null}
            {!withoutDateEnd ? (
              <ButtonChoiceDate
                dateDisplay={eventTempEndDt}
                handleChange={handleChangeDateEnd}
                selectedDatePicker={eventTempEndDt.toObject()}
              />
            ) : null}
          </div>
          {!withoutSelectAllDay ? (
            <div css={choiceDateHourEventCss.checkboxContenair}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={eventTemp.allDay}
                    onClick={handleClickCheckbox}
                    sx={{
                      fontSize: "11px",
                      my: "0px",
                      py: "0px",
                    }}
                  />
                }
                label="Toute la journée"
                sx={{
                  fontSize: "11px",
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
