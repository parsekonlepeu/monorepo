import * as React from "react";
import {
  EventDiary,
  EventDiaryDisplay,
  FirstDay,
  SelectedDate,
} from "../../../types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/hooks/hooksTypedRedux";
import { DateTime } from "luxon";
import {
  changeDisplayMode,
  changeSelectedDateDiary,
} from "../../../store/slices/generalSlice";
import { v4 as uuidv4 } from "uuid";
import {
  HEIGHT_NEW_EVENT,
  HEIGHT_TOP,
  WIDTH_NEW_EVENT,
} from "../../../utils/constants";
import { EventWeek } from "./EventWeek";
import {
  addEventTemp,
  changeModalNewEvent,
  changeModalWarningNotDiarys,
  changePosModalNewEvent,
  initEventTemp,
} from "../../../store/slices/diarysSlice";
import { ToObjectOutput } from "luxon/src/datetime";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material";
import { getDateWeeks } from "../../../utils/functions/getDateWeeks";
import { more_24Divide } from "../../../utils/functions/more_24Divide";
import { refreshDatasDatesDisplay } from "../../../utils/functions/refresheDataDatesDisplay";
import { getDates } from "@parsekonlepeu/sharedutils";
import { getEventDisplay } from "../../../utils/functions/getEventDisplay";
import { separatesOver_24 } from "../../../utils/functions/separatesOver_24";

const weekViewCss = {
  mainContenair: css({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    paddingTop: "20px",
  }),
  nameDayContenair: css({
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "20px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }),
  nameDay: css({
    flex: 1,
    height: "100%",
    borderLeft: "solid 1px #bdbdbd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& p": {
      fontSize: "11px",
      fontWeight: 500,
    },
  }),
  rowWeekContenair: css({
    flex: 1,
    height: "calc(100% - 20px)",
    borderBottom: "solid 1px #bdbdbd",
    display: "flex",
    flexDirection: "row",
  }),
  dayWeekContenair: css({
    borderLeft: "solid 1px #bdbdbd",
    flex: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: `${100 / 7}%`,
  }),
  dayWeekTop: css({
    height: "25px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& p": {
      margin: "0px",
      fontSize: "12px",
    },
  }),
  numberDayWeekContenair: css({
    width: "25px",
    height: "25px",
    borderRadius: "25px",
    marginTop: "3px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    zIndex: 15,
    alignItems: "center",
    cursor: "pointer",
  }),
  eventWeekContenair: css({
    display: "flex",
    flexDirection: "column",
    flex: 1,
  }),
  lineEventWeek: css({
    flex: 1,
    height: "24px",
    position: "relative",
  }),
};

type Datas = EventDiaryDisplay | "forPlacement" | undefined;

export interface DatesDatasDisplay {
  date: DateTime;
  datas: Datas[];
}

interface WeekViewProps {
  numbersOfWeek: number;
}

export const WeekView: React.FC<WeekViewProps> = ({ numbersOfWeek }) => {
  const theme = useTheme();
  const displayMode = useAppSelector((state) => state.general.displayMode);
  const selectedDateDiary = useAppSelector(
    (state) => state.general.selectedDateDiary
  );
  const diarys = useAppSelector((state) => state.diarys.diarys);
  const diarysDisplay = useAppSelector((state) => state.diarys.diarysDisplay);
  const eventTemp = useAppSelector((state) => state.diarys.eventTemp);
  const eventWeekOnChange = useAppSelector(
    (state) => state.diarys.eventWeekOnChange
  );
  const firstDayWeek = useAppSelector((state) => state.options.firstDayWeek);

  const [datesDisplay, setDatesDisplay] =
    React.useState<DatesDatasDisplay[][] | null>(null);
  const [lineNumber, setLineNumber] = React.useState<number>(0);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (datesDisplay && datesDisplay.length) {
      const onResize: EventListenerOrEventListenerObject = (e) => {
        const target = e.currentTarget as Window;
        const rowNumber = datesDisplay.length;
        const heightOther = 20 + rowNumber * 25;
        const heightGrille = target.innerHeight - HEIGHT_TOP - heightOther;
        const caseHeight = heightGrille / rowNumber;
        const lineNumber = Math.floor(caseHeight / 24);
        setLineNumber(lineNumber);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
  }, [datesDisplay]);

  React.useEffect(() => {
    if (datesDisplay && datesDisplay.length && !eventWeekOnChange) {
      const rowNumber = datesDisplay.length;
      const heightOther = 20 + rowNumber * 25;
      const heightGrille = window.innerHeight - HEIGHT_TOP - heightOther;
      const caseHeight = heightGrille / rowNumber;
      const lineNumber = Math.floor(caseHeight / 24);
      setLineNumber(lineNumber);
    }
  }, [datesDisplay]);

  const handleClickNumbersOfDay = (date: DateTime): void => {
    const newSelectedDateDiary: SelectedDate = date.toObject();
    dispatch(changeSelectedDateDiary(newSelectedDateDiary));
    dispatch(changeDisplayMode("Day"));
  };

  React.useEffect(() => {
    if (!eventWeekOnChange) {
      let datesArray: DateTime[][] = [];

      switch (displayMode) {
        case "Month":
          datesArray = getDates(
            firstDayWeek,
            selectedDateDiary.month,
            selectedDateDiary.year
          ).filter(
            (week) =>
              week[0].month === selectedDateDiary.month ||
              week[6].month === selectedDateDiary.month
          );
          break;
        case "2 weeks":
          datesArray = getDateWeeks(firstDayWeek, selectedDateDiary, 2);
          break;
        case "3 weeks":
          datesArray = getDateWeeks(firstDayWeek, selectedDateDiary, 3);
          break;
        case "4 weeks":
          datesArray = getDateWeeks(firstDayWeek, selectedDateDiary, 4);
          break;
      }

      const DatesDisplay: DatesDatasDisplay[][] = [];

      for (const week of datesArray) {
        const weekAdd: DatesDatasDisplay[] = [];
        for (const day of week) {
          weekAdd.push({
            date: day,
            datas: [],
          });
        }
        DatesDisplay.push(weekAdd);
      }

      let events = getEventDisplay(diarys, diarysDisplay);
      eventTemp && events.push(eventTemp);
      const { moreThan_24, lessThan_24 } = separatesOver_24(events);
      const moreThan_24Divide = more_24Divide(
        moreThan_24,
        firstDayWeek,
        DatesDisplay
      );
      refreshDatasDatesDisplay(moreThan_24Divide, lessThan_24, DatesDisplay);
      setDatesDisplay(DatesDisplay);
    }
  }, [
    firstDayWeek,
    selectedDateDiary,
    displayMode,
    eventTemp,
    diarysDisplay,
    diarys,
  ]);

  const forClickColumn = (
    day: SelectedDate
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
            allDay: true,
            type: "event",
            description: "",
            nbRecurrence: 1,
            idDiary: diarys[0].id,
            start: start,
            startUnixInteger: DateTime.fromObject(start).toUnixInteger(),
          };
          const posX =
            e.currentTarget.getBoundingClientRect().right + WIDTH_NEW_EVENT >
            window.innerWidth
              ? e.currentTarget.getBoundingClientRect().left - WIDTH_NEW_EVENT
              : e.currentTarget.getBoundingClientRect().right;
          const posY =
            e.clientY < window.innerHeight / 2
              ? e.clientY
              : e.clientY - HEIGHT_NEW_EVENT;
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

  let eventWeekOnChangeDivide: EventDiaryDisplay[] | null = null;

  if (eventWeekOnChange && datesDisplay) {
    const { moreThan_24, lessThan_24 } = separatesOver_24([eventWeekOnChange]);
    const moreThan_24Divide = more_24Divide(
      moreThan_24,
      firstDayWeek,
      datesDisplay
    );
    const LessThan_24: EventDiaryDisplay[] = [];
    for (let i = 0; i < lessThan_24.length; i++) {
      LessThan_24[i] = {
        ...lessThan_24[i],
        startTruncate: lessThan_24[i].start,
        durationTruncate: lessThan_24[i].duration,
        numberParts: 1,
      } as EventDiaryDisplay;
    }
    eventWeekOnChangeDivide = [...moreThan_24Divide, ...LessThan_24];
  }

  return (
    <div
      css={weekViewCss.mainContenair}
      id="week-view-contenair"
      // onWheel={(e) => {
      //   console.log(e.deltaY)
      // }}
    >
      <div css={weekViewCss.nameDayContenair}>
        {datesDisplay &&
          datesDisplay[0] &&
          datesDisplay[0].map((day, indexDay) => {
            return (
              <div css={weekViewCss.nameDay} key={indexDay.toString()}>
                <p>
                  {day.date
                    .toLocaleString({
                      weekday: "short",
                    })
                    .toUpperCase()}
                </p>
              </div>
            );
          })}
      </div>
      {datesDisplay &&
        datesDisplay.map((week, indexWeek) => {
          return (
            <div css={weekViewCss.rowWeekContenair} key={indexWeek.toString()}>
              {week.map((day, indexDay) => {
                const handleClick: React.MouseEventHandler<HTMLDivElement> = (
                  e
                ) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClickNumbersOfDay(day.date);
                };
                const handleClickNewEvent = forClickColumn(day.date);
                let eventWeekOnChangeDisplay;
                if (eventWeekOnChangeDivide) {
                  for (const event of eventWeekOnChangeDivide) {
                    if (
                      event.startTruncate.day === day.date.day &&
                      event.startTruncate.month === day.date.month &&
                      event.startTruncate.year === day.date.year
                    ) {
                      eventWeekOnChangeDisplay = event;
                    }
                  }
                }
                return (
                  <div
                    css={weekViewCss.dayWeekContenair}
                    key={indexDay.toString()}
                    onPointerDown={handleClickNewEvent}
                  >
                    <div css={weekViewCss.dayWeekTop}>
                      <div
                        css={[
                          weekViewCss.numberDayWeekContenair,
                          {
                            backgroundColor: theme.google.surface,
                            "&:hover": {
                              backgroundColor:
                                theme.google.textfieldOnSurfaceVariant,
                            },
                          },
                        ]}
                        onPointerDown={handleClick}
                      >
                        <p>{day.date.day}</p>
                      </div>
                    </div>
                    <div
                      css={weekViewCss.eventWeekContenair}
                      className="event-week-view-contenair"
                    >
                      {eventWeekOnChangeDisplay && (
                        <EventWeek
                          event={eventWeekOnChangeDisplay}
                          numberWeek={datesDisplay.length}
                          forChange={true}
                        />
                      )}
                      {new Array(lineNumber).fill(null).map((line, index) => {
                        const data = day.datas[index];
                        const display = data && data !== "forPlacement";
                        return (
                          <div
                            css={weekViewCss.lineEventWeek}
                            key={index.toString()}
                          >
                            {display && (
                              <EventWeek
                                event={data}
                                numberWeek={datesDisplay.length}
                                forChange={false}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};
