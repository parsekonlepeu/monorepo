import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import {
  DisplayMode,
  GeneralState,
  MultipleDates,
  SelectedDate,
  Services,
  SnackbarParams,
} from "../../types";

const initialState: GeneralState = {
  snackbarVisible: false,
  snackbarParams: {
    message: "",
    key: "",
    color: "",
  },
  selectedDateDiary: DateTime.now().toObject(),
  multipleDatesDiary: null,
  selectedDateInitPicker: DateTime.now().toObject(),
  multipleDatesInitPicker: null,
  listServices: [],
  displayMode: "Day",
  leftExtend: true,
};

const generalSlice: Slice<GeneralState> = createSlice({
  name: "general",
  initialState: initialState,
  reducers: {
    refreshListServices: (state, action: PayloadAction<Services[]>) => {
      state.listServices = action.payload;
    },
    changeSnackbarParams: (state, action: PayloadAction<SnackbarParams>) => {
      state.snackbarParams = action.payload;
    },
    changeSnackbarVisible: (state, action: PayloadAction<boolean>) => {
      state.snackbarVisible = action.payload;
    },
    changeSelectedDateDiary: (state, action: PayloadAction<SelectedDate>) => {
      state.selectedDateDiary = action.payload;
    },
    changeMultipleDatesDiary: (
      state,
      action: PayloadAction<MultipleDates | null>
    ) => {
      state.multipleDatesDiary = action.payload;
    },
    changeSelectedDateInitPicker: (
      state,
      action: PayloadAction<SelectedDate>
    ) => {
      state.selectedDateInitPicker = action.payload;
    },
    changeMultipleDatesInitPicker: (
      state,
      action: PayloadAction<MultipleDates | null>
    ) => {
      state.multipleDatesInitPicker = action.payload;
    },
    refreshDisplayMode: (
      state,
      action: PayloadAction<{
        newMultipleDates: MultipleDates | null;
      }>
    ) => {
      if (action.payload.newMultipleDates) {
        const diff = DateTime.fromObject(action.payload.newMultipleDates.end)
          .diff(
            DateTime.fromObject(action.payload.newMultipleDates.start),
            "days"
          )
          .toObject().days;
        if (diff && Math.abs(diff) < 7) {
          switch (Math.abs(diff)) {
            case 1:
              state.displayMode = "2 days";
              break;
            case 2:
              state.displayMode = "3 days";
              break;
            case 3:
              state.displayMode = "4 days";
              break;
            case 4:
              state.displayMode = "5 days";
              break;
            case 5:
              state.displayMode = "6 days";
              break;
            case 6:
              state.displayMode = "7 days";
              break;
          }
        } else if (diff && Math.abs(diff) >= 7 && Math.abs(diff) < 28) {
          if (Math.abs(diff) < 14) {
            state.displayMode = "2 weeks";
          } else if (Math.abs(diff) >= 14 && Math.abs(diff) < 21) {
            state.displayMode = "3 weeks";
          } else if (Math.abs(diff) >= 21 && Math.abs(diff)) {
            state.displayMode = "4 weeks";
          }
        }
      }
    },
    changeDisplayMode: (state, action: PayloadAction<DisplayMode>) => {
      state.displayMode = action.payload;
    },
    changeLeftExtend: (state, action: PayloadAction<boolean>) => {
      state.leftExtend = action.payload;
    },
  },
});

export const {
  refreshListServices,
  changeSnackbarParams,
  changeSnackbarVisible,
  refreshDisplayMode,
  changeSelectedDateDiary,
  changeSelectedDateInitPicker,
  changeMultipleDatesDiary,
  changeMultipleDatesInitPicker,
  changeDisplayMode,
  changeLeftExtend,
} = generalSlice.actions;

export default generalSlice.reducer;
