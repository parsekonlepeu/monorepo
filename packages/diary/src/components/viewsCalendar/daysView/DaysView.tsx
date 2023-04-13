import * as React from "react";
import {
  HEIGHT_ROW_CONTNAIR_EVENT_ALL_DAY,
  HEIGHT_SLICE_15_MINUTE,
  HEIGHT_TOP_DAY_VIEW,
  WIDTH_BAR_LEFT,
} from "../../../utils/constants";
import { DateTime } from "luxon";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/hooks/hooksTypedRedux";
import {
  changeDisplayMode,
  changeMultipleDatesDiary,
  changeMultipleDatesInitPicker,
  changeSelectedDateDiary,
  changeSelectedDateInitPicker,
} from "../../../store/slices/generalSlice";
import { SelectedDate } from "../../../types";
import { EventDay } from "./EventDay";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import { EventAllDay } from "./EventAllDay";
import { WithPopper } from "../../withPopper/WithPopper";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material";
import { HoursLeft } from "./HoursLeft";
import { forClickColumnDaysView } from "../../../utils/functions/forClickColumnDayView";
import { useDataDaysView } from "../../../hooks/useEventDaysView";

const daysViewCss = {
  mainContenair: css({
    flex: 1,
    position: "relative",
  }),
  backgroundDividerContenair: css({
    position: "absolute",
    display: "flex",
    top: "0px",
    left: "43px",
    height: "calc(100% - 60px)",
    width: "calc(100% - 60px)",
  }),
  backgroundDivider: css({
    borderLeft: "1px solid #bdbdbd",
    flex: 1,
  }),
  clickAllDayContenair: css({
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "calc(100% - 15px)",
    display: "flex",
    flexDirection: "row",
    transition: "0.05s",
  }),
  clickAllDayLeft: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    width: "43px",
  }),
  clickAllDayLeftButton: css({
    width: "30px",
    height: "30px",
    borderRadius: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  }),
  clickAllDayRigth: css({
    flex: 1,
    display: "flex",
    flexDirection: "row",
  }),
  clickAllDayRigthColumn: css({
    flex: 1,
  }),
  topDayView: css({
    flex: 1,
    display: "flex",
    height: `${HEIGHT_TOP_DAY_VIEW}px`,
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: "1px",
  }),
  topDay: css({
    height: "65px",
    width: "50px",
    paddingBottom: "7px",
    display: "flex",
    flexDirection: "column",
  }),
  nameDay: css({
    height: "20px",
    width: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  numberDay: css({
    height: "45px",
    width: "45px",
    borderRadius: "45px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "auto",
    cursor: "pointer",
  }),
  clickAllDayBorderBottom: css({
    position: "absolute",
    bottom: "0px",
    left: "0px",
    height: "1px",
    width: "100%",
  }),
  eventAllDayContenair: css({
    position: "absolute",
    left: "43px",
    top: "75px",
    width: "calc(100% - 60px)",
    height: "15px",
    pointerEvents: "none",
  }),
  mainDaysView: css({
    position: "absolute",
    display: "flex",
    top: "90px",
    left: "0px",
    height: "calc(100% - 90px)",
    width: "calc(100% - 5px)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "8px",
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-button": {
      height: "0px",
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#bdbdbd",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  }),
  rowDayViewContenair: css({
    top: "0px",
    left: "43px",
    position: "absolute",
    display: "flex",
    backgroundColor: "transparent",
    width: "calc(100% - 46px)",
    height: `${HEIGHT_SLICE_15_MINUTE * 4 * 24}px`,
  }),
};

interface DayViewProps {
  numbersOfDay: number;
}

export const DaysView: React.FC<DayViewProps> = ({ numbersOfDay }) => {
  const theme = useTheme();
  const leftExtend = useAppSelector((state) => state.general.leftExtend);
  const diarys = useAppSelector((state) => state.diarys.diarys);

  const dispatch = useAppDispatch();

  const {
    dayOne,
    daysDisplay,
    eventLessThan_24,
    eventMoreThan_24,
    eventMoreThan_24Trunc,
    reducedAllDay,
    handleReduceAllDay,
  } = useDataDaysView(numbersOfDay);

  const handleClickNumbersOfDay = (date: DateTime): void => {
    const newSelectedDateDiary: SelectedDate = date.toObject();
    dispatch(changeSelectedDateDiary(newSelectedDateDiary));
    dispatch(changeMultipleDatesDiary(null));
    dispatch(changeSelectedDateInitPicker(newSelectedDateDiary));
    dispatch(changeMultipleDatesInitPicker(null));
    dispatch(changeDisplayMode("Day"));
  };

  const widthContenair = leftExtend
    ? window.innerWidth - WIDTH_BAR_LEFT - 60
    : window.innerWidth - 60;
  const widthColumn = widthContenair / numbersOfDay;
  const HEIGHTINFOREDUCEALLDAY =
    eventMoreThan_24Trunc.length === 0 ? 0 : HEIGHT_ROW_CONTNAIR_EVENT_ALL_DAY;
  const HEIGHTEVENTSALLDAY =
    eventMoreThan_24[0] && eventMoreThan_24[0].length !== 0
      ? eventMoreThan_24.length * HEIGHT_ROW_CONTNAIR_EVENT_ALL_DAY +
        HEIGHTINFOREDUCEALLDAY
      : 0;

  return (
    <div css={daysViewCss.mainContenair}>
      <div
        css={daysViewCss.backgroundDividerContenair}
        id="background-divider-contenair"
        style={{
          top: `${HEIGHT_TOP_DAY_VIEW}px`,
          height: `calc(100% - ${HEIGHT_TOP_DAY_VIEW}px)`,
        }}
      >
        {new Array(numbersOfDay).fill(null).map((day, index) => (
          <div
            key={index.toString()}
            css={daysViewCss.backgroundDivider}
          />
        ))}
      </div>
      <div
        css={[
          daysViewCss.clickAllDayContenair,
          {
            height: `${HEIGHTEVENTSALLDAY + HEIGHT_TOP_DAY_VIEW}px`,
          },
        ]}
      >
        <div
          css={daysViewCss.clickAllDayLeft}
          onClick={handleReduceAllDay}
        >
          {(eventMoreThan_24.length >= 4 ||
            eventMoreThan_24Trunc.length !== 0) && (
            <WithPopper
              textDisplay={
                reducedAllDay
                  ? "développer la section 'Toute la journée'"
                  : "réduire la section 'Toute la journée"
              }
            >
              <div
                css={[
                  daysViewCss.clickAllDayLeftButton,
                  {
                    "&:hover": {
                      backgroundColor: theme.google.hairlineHover,
                    },
                  },
                ]}
              >
                {reducedAllDay ? (
                  <KeyboardArrowDownRounded />
                ) : (
                  <KeyboardArrowUpRounded />
                )}
              </div>
            </WithPopper>
          )}
        </div>
        <div css={daysViewCss.clickAllDayRigth}>
          {daysDisplay.map((day, index) => {
            const clickColumn = forClickColumnDaysView(
              day,
              true,
              dispatch,
              diarys
            );
            const handleClick: React.MouseEventHandler<HTMLDivElement> = (
              e
            ) => {
              e.preventDefault();
              e.stopPropagation();
              handleClickNumbersOfDay(dayOne.plus({ days: index }));
            };
            return (
              <div
                css={daysViewCss.clickAllDayRigthColumn}
                id={`for-click-all-day-rigth-column-${index}`}
                onMouseDown={clickColumn}
                key={day.toString()}
              >
                <div css={daysViewCss.topDayView}>
                  <div css={daysViewCss.topDay}>
                    <div css={daysViewCss.nameDay}>
                      <p
                        css={{
                          fontSize: "0.7rem",
                          color: theme.google.onSurfaceVariantAgm,
                        }}
                      >
                        {dayOne
                          .plus({ days: index })
                          .toFormat("ccc")
                          .toUpperCase() + "."}
                      </p>
                    </div>
                    <div
                      css={[
                        daysViewCss.numberDay,
                        {
                          backgroundColor: theme.google.surface,
                          "&:hover": {
                            backgroundColor: theme.google.textfieldSurface,
                          },
                        },
                      ]}
                      onMouseDown={handleClick}
                    >
                      <p
                        css={{
                          fontSize: "1.8rem",
                          fontWeight: 500,
                          color: theme.google.onSurface,
                        }}
                      >
                        {dayOne.plus({ days: index }).day}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          css={[
            daysViewCss.clickAllDayBorderBottom,
            {
              background: `linear-gradient(to left, white 0%, ${theme.google.onSurfaceVariantAgm} 8% 92%, white 100%)`,
            },
          ]}
        />
      </div>
      <div
        css={[
          daysViewCss.eventAllDayContenair,
          {
            top: `${HEIGHT_TOP_DAY_VIEW}px`,
          },
        ]}
        style={{
          height:
            eventMoreThan_24.length === 1 && eventMoreThan_24[0].length === 0
              ? "0px"
              : HEIGHTEVENTSALLDAY,
        }}
      >
        {eventMoreThan_24.map((eventsRow, indexEventsRow) =>
          eventsRow.map((event) => {
            const colorDiary = diarys.find(
              (diary) => diary.id === event.idDiary
            )?.color;
            return (
              <EventAllDay
                key={indexEventsRow.toString()}
                colorDiary={colorDiary ? colorDiary : "fff"}
                widthColumn={widthColumn}
                numbersOfDay={numbersOfDay}
                dayOne={dayOne}
                idDiary={event.idDiary}
                idEvent={event.id}
                rowNumber={indexEventsRow}
                event={event}
                start={DateTime.fromObject(event.start)}
              />
            );
          })
        )}
      </div>
      <div
        css={daysViewCss.mainDaysView}
        style={{
          top: `${
            eventMoreThan_24.length === 1 && eventMoreThan_24[0].length === 0
              ? HEIGHT_TOP_DAY_VIEW
              : HEIGHT_TOP_DAY_VIEW + HEIGHTEVENTSALLDAY
          }px`,
          height: `${
            window.innerHeight -
            HEIGHT_TOP_DAY_VIEW -
            60 -
            eventMoreThan_24.length * HEIGHT_ROW_CONTNAIR_EVENT_ALL_DAY -
            HEIGHTINFOREDUCEALLDAY
          }px`,
        }}
        id="main-days-view"
      >
        <HoursLeft />
        <div
          css={daysViewCss.rowDayViewContenair}
          id="contenairRowDaysView"
        >
          {daysDisplay.map((day, index) => {
            const clickColumn = forClickColumnDaysView(
              day,
              false,
              dispatch,
              diarys
            );
            return (
              <div
                css={{ flex: 1 }}
                id={`column-day-for-click-${index}`}
                onMouseDown={clickColumn}
                key={day.toString()}
              />
            );
          })}
          {eventLessThan_24.map((event) => {
            const colorDiary = diarys.find(
              (diary) => diary.id === event.idDiary
            )?.color;
            return (
              <EventDay
                key={event.id}
                widthColumn={widthColumn}
                numberParts={event.numberParts}
                numbersOfDay={numbersOfDay}
                colorDiary={colorDiary ? colorDiary : "fff"}
                colorEvent={event.color}
                dayOne={dayOne}
                durationTrunc={event.durationTruncate}
                duration={event.duration}
                idDiarys={event.idDiary}
                idEvent={event.id}
                title={event.title}
                startTrunc={DateTime.fromObject(event.startTruncate)}
                start={DateTime.fromObject(event.start)}
                event={event}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
