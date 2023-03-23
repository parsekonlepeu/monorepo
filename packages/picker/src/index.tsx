import * as React from "react";
import { DatepickerProps, PickerState } from "./types";
import { MainDatePicker } from "./components/MainDatePicker";
import { TopDatePicker } from "./components/TopDatePicker";
import { Provider } from "react-redux";
import { contextDatePicker, usePickerDispatch } from "./store/hooksTypedRedux";
import { ContextOption } from "./context/ContextOption";
import { DateTime } from "luxon";
import {
  changeMonthYearPicker,
  changeMultipleDatePicker,
  changeSelectedDatePicker,
} from "./store/pickerSlice";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/rootReducer";
import { css } from "@emotion/react";

export * from "./types";

/**
 *
 * @param selectedDate
 * @param multipleDates
 * @param firstDay
 * @param locale
 * @param displayYear
 * @param canSelectPeriod
 * @param canSwipe
 * @param caseSize
 * @param colors
 * @param onChange
 */
export const DatePicker: React.FC<Partial<DatepickerProps>> = ({
  selectedDate = DateTime.now().toObject(),
  multipleDates = null,
  firstDay = "monday",
  locale = "fr",
  displayYear = true,
  canSelectPeriod = true,
  canSwipe = true,
  caseSize = 30,
  verticalGap = 5,
  horizontalGap = 5,
  numberSize = 12,
  month = DateTime.now().month,
  year = DateTime.now().year,
  colors = {
    bgColor: "white",
    currentDay: "#1a73e8",
    textCurrentDay: "white",
    selectedDay: "#d2e3fc",
    textSelectedDay: "#185abc",
    textDisableDay: "#70757a",
    textBase: "#3c4043",
    hover: "#d2e3fc",
    hoverSelectedDay: "#f1f3f4",
  },
  onChange = () => {},
}) => {
  const preloadState: PickerState = {
    monthPicker: month,
    yearPicker: year,
    selectedDatePicker: selectedDate,
    multipleDates: multipleDates,
    flowSelected: false,
  };

  const refStorePicker = React.useRef(
    configureStore({
      reducer: rootReducer,
      preloadedState: { picker: preloadState },
    })
  );

  const valueContextOption = {
    selectedDate: selectedDate,
    multipleDates: multipleDates,
    verticalGap: verticalGap,
    horizontalGap: horizontalGap,
    month: month,
    year: year,
    firstDay: firstDay,
    locale: locale,
    displayYear: displayYear,
    canSelectPeriod: canSelectPeriod,
    canSwipe: canSwipe,
    caseSize: caseSize,
    numberSize: numberSize,
    colors: colors,
    onChange: onChange,
  };

  return (
    <Provider
      context={contextDatePicker}
      store={refStorePicker.current}
    >
      <ContextOption.Provider value={valueContextOption}>
        <PickerContenair />
      </ContextOption.Provider>
    </Provider>
  );
};

const contenairPickerCss = {
  contenair: css({
    display: "flex",
    flexDirection: "column",
    cursor: "default",
  }),
};

const PickerContenair: React.FC = () => {
  const preventDefault = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const {
    selectedDate,
    multipleDates,
    firstDay,
    caseSize,
    canSwipe,
    horizontalGap,
    year,
    month,
  } = React.useContext(ContextOption) as DatepickerProps;

  const dispatch = usePickerDispatch();

  React.useEffect(() => {
    console.log("selectedDate dans picker : ", selectedDate);
    dispatch(changeSelectedDatePicker(selectedDate));
    canSwipe &&
      dispatch(
        changeMultipleDatePicker({
          newMultipleDates: multipleDates,
          firstDayWeek: firstDay,
        })
      );
    canSwipe &&
      dispatch(
        changeMonthYearPicker({
          month: selectedDate.month,
          year: selectedDate.year,
        })
      );
  }, [selectedDate, multipleDates, canSwipe]);

  React.useEffect(() => {
    dispatch(
      changeMonthYearPicker({
        month: month,
        year: year,
      })
    );
  }, [month, year]);

  return (
    <div
      css={contenairPickerCss.contenair}
      style={{ width: caseSize * 7 + 7 * horizontalGap + "px" }}
      onClick={preventDefault}
    >
      <TopDatePicker />
      <MainDatePicker />
    </div>
  );
};
