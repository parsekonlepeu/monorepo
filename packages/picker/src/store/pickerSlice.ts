import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { DateTime, ToObjectOutput } from "luxon";
import { FirstDay, PickerState, SelectedDate } from "../types";
import { formatMultipleDate } from "../utils/formatMultipleDate";

const now = DateTime.now();

const initialState: PickerState = {
  monthPicker: now.month,
  yearPicker: now.year,
  selectedDatePicker: now.toObject(),
  multipleDates: null,
  flowSelected: false,
};

const pickerSlice: Slice<PickerState> = createSlice({
  name: "pickerState",
  initialState: initialState,
  reducers: {
    changeFlowSelected: (state, action: PayloadAction<boolean>) => {
      state.flowSelected = action.payload;
    },
    changeMonthYearPicker: (
      state,
      action: PayloadAction<{ month: number; year: number }>
    ) => {
      state.monthPicker = action.payload.month;
      state.yearPicker = action.payload.year;
    },
    changeMultipleDatePicker: (
      state,
      action: PayloadAction<{
        newMultipleDates: {
          start: ToObjectOutput;
          end: ToObjectOutput;
        } | null;
        firstDayWeek: FirstDay;
      }>
    ) => {
      state.multipleDates = action.payload.newMultipleDates;
      if (action.payload.newMultipleDates) {
        state.multipleDates = formatMultipleDate(
          action.payload.newMultipleDates,
          action.payload.firstDayWeek
        );
      } else {
        state.multipleDates = action.payload.newMultipleDates;
      }
    },
    changeSelectedDatePicker: (state, action: PayloadAction<SelectedDate>) => {
      state.selectedDatePicker = action.payload;
    },
  },
});

export const {
  changeFlowSelected,
  changeMonthYearPicker,
  changeMultipleDatePicker,
  changeSelectedDatePicker,
} = pickerSlice.actions;

export default pickerSlice.reducer;
