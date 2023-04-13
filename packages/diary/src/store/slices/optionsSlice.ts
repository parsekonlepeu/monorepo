import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import {
  CustomizeView,
  DateFormat,
  FirstDay,
  IdName,
  IdTitleModal,
  OptionsState,
  TimeFormat,
  TypeEvent,
} from "../../types";
import { getTimeZoneInit } from "../../utils/functions/getTimeZoneInit";

const timeZoneInit = getTimeZoneInit();

const initialState: OptionsState = {
  withRecycledBin: true,
  withSearch: true,
  withMoveEvent: true,
  canAddEvent: true,
  canRemoveEvent: true,
  canModifEvent: true,
  canAddDiary: true,
  canRemoveDiary: true,
  configurableOptions: {
    language: true,
    country: true,
    dateFormat: true,
    timeFormat: true,
    timeZone: true,
    notification: true,
    defaultDuration: true,
    firstDayWeek: true,
  },
  modalOption: false,
  typeEvent: {
    event: true,
    service: true,
    appointment: true,
    meeting: true,
  },
  locale: "fr",
  canMoveEvent: true,
  language: "Français",
  country: "France",
  dateFormat: "JJ/MM/YYYY",
  timeFormat: "13:00",
  timeZone: timeZoneInit,
  askCurrentPos: true,
  keyboardShortcut: true,
  defaultDuration: 15,
  firstDayWeek: "monday",
  customizeView: "4 days",
  idTitleModal: "params",
  idName: "langageRegion",
};

const optionsSlice: Slice<OptionsState> = createSlice({
  name: "options",
  initialState: initialState,
  reducers: {
    refreshOption: <K extends keyof OptionsState>(
      state: OptionsState,
      action: PayloadAction<{ key: K; value: OptionsState[K] }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { refreshOption } = optionsSlice.actions;

export default optionsSlice.reducer;
