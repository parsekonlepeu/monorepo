import { DateTime } from "luxon";
import * as React from "react";
import { EventDiary, EventDiaryDisplay, SelectedDate } from "../types";
import { divideLess_24MultDay } from "../utils/functions/divideLess_24MultDay";
import { filterEventAllDayDisplay } from "../utils/functions/filterEventAllDayDisplay";
import { filterEventDisplay } from "../utils/functions/filterEventDisplay";
import { formatMoreThan_24 } from "../utils/functions/formatMoreThan_24";
import { getDayOneWeek } from "../utils/functions/getDayOneWeek";
import { getEventDisplay } from "../utils/functions/getEventDisplay";
import { secondFilterEventDipslay } from "../utils/functions/secondFilterEventDisplay";
import { separatesOver_24 } from "../utils/functions/separatesOver_24";
import { sortEventByDateStart } from "../utils/functions/sortEventByDateStart";
import { useAppSelector } from "../utils/hooks/hooksTypedRedux";

export const useDataDaysView = (numbersOfDay: number) => {
  const selectedDateDiary = useAppSelector(
    (state) => state.general.selectedDateDiary
  );
  const displayMode = useAppSelector((state) => state.general.displayMode);
  const multipleDatesDiary = useAppSelector(
    (state) => state.general.multipleDatesDiary
  );
  const firstDayWeek = useAppSelector((state) => state.options.firstDayWeek);
  const diarys = useAppSelector((state) => state.diarys.diarys);
  const diarysDisplay = useAppSelector((state) => state.diarys.diarysDisplay);
  const eventTemp = useAppSelector((state) => state.diarys.eventTemp);
  const flowChangeEvent = useAppSelector(
    (state) => state.diarys.flowChangeEvent
  );
  const [reducedAllDay, setReducedAllDay] = React.useState<boolean>(false);

  const [dayOne, setDayOne] = React.useState<DateTime>(
    DateTime.fromObject({
      ...DateTime.now().toObject(),
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    })
  );
  const [daysDisplay, setDaysDisplay] = React.useState<DateTime[]>([]);
  const [eventLessThan_24, setEventLessThan_24] = React.useState<
    EventDiaryDisplay[]
  >([]);
  const [eventMoreThan_24, setEventMoreThan_24] = React.useState<
    EventDiary[][]
  >([]);
  const [eventMoreThan_24Trunc, setEventMoreThan_24Trunc] = React.useState<
    EventDiary[][]
  >([]);

  React.useEffect(() => {
    if (multipleDatesDiary) {
      const start = DateTime.fromObject(multipleDatesDiary.start);
      const end = DateTime.fromObject(multipleDatesDiary.end);
      const diff = end.diff(start, "days").days;
      const dates: DateTime[] = [start];
      for (let i = 1; i <= diff; i++) {
        dates.push(start.plus({ days: i }));
      }
      setDaysDisplay(dates);
    } else {
      const selectedDateDiaryDt = DateTime.fromObject(selectedDateDiary);
      const dateSelected =
        displayMode === "Week"
          ? getDayOneWeek(selectedDateDiaryDt, firstDayWeek)
          : selectedDateDiaryDt;
      const dates: DateTime[] = [dateSelected];
      for (let i = 1; i < numbersOfDay; i++) {
        dates.push(dateSelected.plus({ days: i }));
      }
      setDaysDisplay(dates);
    }
  }, [multipleDatesDiary, numbersOfDay, selectedDateDiary, firstDayWeek]);

  React.useEffect(() => {
    if (!flowChangeEvent) {
      let events = getEventDisplay(diarys, diarysDisplay);
      eventTemp && events.push(eventTemp);
      const { moreThan_24, lessThan_24 } = separatesOver_24(events);
      const firstDateForFilterBase =
        displayMode === "Week"
          ? (getDayOneWeek(
              DateTime.fromObject(selectedDateDiary),
              firstDayWeek
            ).toObject() as SelectedDate)
          : selectedDateDiary;
      const firstDateForFilter: SelectedDate = {
        ...firstDateForFilterBase,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      };
      const lessThan_24Filter = filterEventDisplay(
        lessThan_24,
        firstDateForFilter,
        numbersOfDay,
        multipleDatesDiary
      );
      const lessThan_24FilterDivide = divideLess_24MultDay(lessThan_24Filter);
      const lessThan_24FilterDivideFilter = secondFilterEventDipslay(
        lessThan_24FilterDivide,
        firstDateForFilter,
        numbersOfDay
      );
      const moreThan_24Filter = filterEventAllDayDisplay(
        moreThan_24,
        firstDateForFilter,
        numbersOfDay
      );
      const moreThen_24Format = formatMoreThan_24(
        sortEventByDateStart([...moreThan_24Filter])
      );
      setEventLessThan_24(lessThan_24FilterDivideFilter);
      if (eventMoreThan_24Trunc.length !== 0) {
        setEventMoreThan_24(moreThen_24Format.slice(0, 2));
        setEventMoreThan_24Trunc(moreThen_24Format.slice(2));
      } else {
        setEventMoreThan_24(moreThen_24Format);
      }
    }
  }, [
    diarys,
    diarysDisplay,
    eventTemp,
    selectedDateDiary,
    flowChangeEvent,
    multipleDatesDiary,
    numbersOfDay,
  ]);

  React.useEffect(() => {
    if (multipleDatesDiary !== null) {
      setDayOne(DateTime.fromObject(multipleDatesDiary.start));
    } else {
      const dt = DateTime.fromObject({
        ...selectedDateDiary,
        hour: 0,
        minute: 0,
        second: 0,
      });
      switch (displayMode) {
        case "Day":
          setDayOne(dt);
          break;
        case "Week":
          setDayOne(getDayOneWeek(dt, firstDayWeek));
          break;
      }
    }
  }, [multipleDatesDiary, selectedDateDiary, displayMode, firstDayWeek]);

  React.useEffect(() => {
    if (reducedAllDay) {
      const newEventMoreThan_24 = eventMoreThan_24.slice(0, 2);
      const newEventMoreThan_24Trunc = eventMoreThan_24.slice(2);
      setEventMoreThan_24(newEventMoreThan_24);
      setEventMoreThan_24Trunc(newEventMoreThan_24Trunc);
    } else {
      const newEventMoreThan_24 = [
        ...eventMoreThan_24,
        ...eventMoreThan_24Trunc,
      ];
      const newEventMoreThan_24Trunc: EventDiary[][] = [];
      setEventMoreThan_24(newEventMoreThan_24);
      setEventMoreThan_24Trunc(newEventMoreThan_24Trunc);
    }
  }, [reducedAllDay]);

  const handleReduceAllDay = React.useCallback(() => {
    setReducedAllDay((currentReducedAllDay) => !currentReducedAllDay);
  }, []);

  return {
    dayOne: dayOne,
    daysDisplay: daysDisplay,
    eventLessThan_24: eventLessThan_24,
    eventMoreThan_24: eventMoreThan_24,
    eventMoreThan_24Trunc: eventMoreThan_24Trunc,
    reducedAllDay: reducedAllDay,
    handleReduceAllDay: handleReduceAllDay,
  };
};
