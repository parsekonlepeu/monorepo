import { DateTime, ToObjectOutput } from "luxon";
import { ReactNode } from "react";

export type MultipleDates = {
  start: ToObjectOutput;
  end: ToObjectOutput;
};

export type SelectedDate = {} & ToObjectOutput;

export type ContenairDateProps = {
  date: DateTime;
  refMultipleDate: React.MutableRefObject<MultipleDates | null>;
  refSelectedDatePicker: React.MutableRefObject<SelectedDate>;
  refFlowSelected: React.MutableRefObject<boolean>;
};

export type InfoChange = {
  selectedDate: SelectedDate;
  multipleDate: MultipleDates | null;
  resetMultipleDate: boolean;
};

export type FirstDay = "monday" | "saturday" | "sunday";

export type WeekNumbers = number;

export type StartEndPeriod = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type OnChangeDatePicker = (
  e: globalThis.MouseEvent,
  data: InfoChange
) => void;

export type ColorPicker = {
  bgColor?: string;
  currentDay?: string;
  textCurrentDay?: string;
  selectedDay?: string;
  textSelectedDay?: string;
  disableDay?: string;
  textDisableDay?: string;
  textBase?: string;
  hover?: string;
  hoverSelectedDay?: string;
};

export type DatepickerProps = {
  selectedDate: SelectedDate;
  multipleDates: MultipleDates | null;
  month: number;
  year: number;
  firstDay: FirstDay;
  locale: string;
  colors: ColorPicker;
  displayYear: boolean;
  canSelectPeriod: boolean;
  canSwipe: boolean;
  caseSize: number;
  numberSize: number;
  verticalGap: number;
  horizontalGap: number;
  onChange: OnChangeDatePicker;
};

export type DisplayPeriodProps = {
  start: StartEndPeriod | null;
  end: StartEndPeriod | null;
  week: WeekNumbers | null;
};

export type PickerState = {
  monthPicker: number;
  yearPicker: number;
  selectedDatePicker: SelectedDate;
  multipleDates: MultipleDates | null;
  flowSelected: boolean;
};

export type WithPopperProps = {
  children: ReactNode | JSX.Element;
  textDisplay: string;
  top?: string;
};

export type Period = {
  start: StartEndPeriod | null;
  end: StartEndPeriod | null;
  week: WeekNumbers | null;
};
