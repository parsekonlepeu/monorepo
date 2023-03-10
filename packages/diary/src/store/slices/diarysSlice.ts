import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { Diary, DiarysState, EventDiary, PosModal } from "../../types";

const initialState: DiarysState = {
  flowChangeEvent: null,
  flowChangeEventAllDay: null,
  flowChangeWeekEvent: null,
  diarysDisplay: [],
  diarys: [],
  eventTemp: undefined,
  eventWeekOnChange: null,
  flowMoveModalEvent: false,
  modalUnsubscribeDiary: false,
  idDiaryForDelete: null,
  modalChoiceColor: false,
  idDiarysModalChoiceColor: "",
  modalNewEvent: false,
  modalWarningNotDiarys: false,
  modalNewEventIsInAnchor: false,
  modalNewEventWouldBeLeft: false,
  posModalNewEvent: {
    x: 0,
    y: 0,
  },
};

const diarysSlice: Slice<DiarysState> = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {
    changeIdDiaryForDelete: (state, action: PayloadAction<string | null>) => {
      state.idDiaryForDelete = action.payload;
    },
    changeEventWeekOnChange: (state, action: PayloadAction<EventDiary>) => {
      state.eventWeekOnChange = action.payload;
    },
    changeFlowChangeWeekEvent: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.flowChangeWeekEvent = action.payload;
    },
    changeFlowChangeEventAllDay: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.flowChangeEventAllDay = action.payload;
    },
    changeFlowChangeEvent: (state, action: PayloadAction<string | null>) => {
      state.flowChangeEvent = action.payload;
    },
    changeModalNewEventWouldBeLeft: (state, action: PayloadAction<boolean>) => {
      state.modalNewEventWouldBeLeft = action.payload;
    },
    modifEventTempDiary: <K extends keyof EventDiary>(
      state: DiarysState,
      action: PayloadAction<{ keys: K[]; values: EventDiary[K][] }>
    ) => {
      if (state.eventTemp) {
        for (const [index, key] of action.payload.keys.entries()) {
          state.eventTemp[key] = action.payload.values[index];
        }
      }
    },
    modifEventDiary: <K extends keyof EventDiary>(
      state: DiarysState,
      action: PayloadAction<{
        keys: K[];
        values: EventDiary[K][];
        idDiary: string;
        idEvent: string;
      }>
    ) => {
      const indexDiary = state.diarys.findIndex(
        (diary) => diary.id === action.payload.idDiary
      );
      if (indexDiary !== -1) {
        const indexEvent = state.diarys[indexDiary].events.findIndex(
          (event) => event.id === action.payload.idEvent
        );
        if (indexEvent !== -1) {
          for (const [index, key] of action.payload.keys.entries()) {
            state.diarys[indexDiary].events[indexEvent][key] =
              action.payload.values[index];
          }
        }
      }
    },
    deleteEventDiary: (
      state,
      action: PayloadAction<{ idDiary: string; idEvent: string }>
    ) => {
      const indexDiary = state.diarys.findIndex(
        (diary) => diary.id === action.payload.idDiary
      );
      state.diarys[indexDiary].events = state.diarys[indexDiary].events.filter(
        (event) => event.id !== action.payload.idEvent
      );
    },
    changePosModalNewEvent: (state, action: PayloadAction<PosModal>) => {
      state.posModalNewEvent = action.payload;
    },
    changeModalNewEventIsInAnchor: (state, action: PayloadAction<boolean>) => {
      state.modalNewEventIsInAnchor = action.payload;
    },
    changeFlowMoveModalEvent: (state, action: PayloadAction<boolean>) => {
      state.flowMoveModalEvent = action.payload;
    },
    changeModalWarningNotDiarys: (state, action: PayloadAction<boolean>) => {
      state.modalWarningNotDiarys = action.payload;
    },
    saveEventTemp: (state) => {
      const indexToSave = state.diarys.findIndex(
        (diary) => diary.id === state.eventTemp?.idDiary
      );
      state.eventTemp && state.diarys[indexToSave].events.push(state.eventTemp);
    },
    addEventTemp: (state, action: PayloadAction<EventDiary>) => {
      state.eventTemp = action.payload;
    },
    initEventTemp: (state) => {
      state.eventTemp = undefined;
    },
    changeModalNewEvent: (state, action: PayloadAction<boolean>) => {
      state.modalNewEvent = action.payload;
    },
    changeIdDiarysModalChoiceColor: (state, action: PayloadAction<string>) => {
      state.idDiarysModalChoiceColor = action.payload;
    },
    changeModalUnsubscribeDiary: (state, action: PayloadAction<boolean>) => {
      state.modalUnsubscribeDiary = action.payload;
    },
    changeModalChoiceColor: (state, action: PayloadAction<boolean>) => {
      state.modalChoiceColor = action.payload;
    },
    changeColorDiary: (state, action: PayloadAction<string>) => {
      const indexChange = state.diarys.findIndex((diary) => {
        return diary.id === state.idDiarysModalChoiceColor;
      });
      for (const event of state.diarys[indexChange].events) {
        if (event.color === state.diarys[indexChange].color) {
          event.color = action.payload;
        }
      }
      state.diarys[indexChange].color = action.payload;
    },
    addDiaryDisplay: (state, action: PayloadAction<string>) => {
      state.diarysDisplay.push(action.payload);
    },
    deleteDiaryDisplay: (state, action: PayloadAction<string[]>) => {
      state.diarysDisplay = state.diarysDisplay.filter(
        (diary) => !action.payload.includes(diary)
      );
    },
    refreshDiarys: (state, action: PayloadAction<Diary[]>) => {
      state.diarys = action.payload;
      for (const diary of action.payload) {
        state.diarysDisplay.push(diary.id);
      }
    },
    addDiary: (state, action: PayloadAction<Diary>) => {
      state.diarys.push(action.payload);
    },
    deleteDiary: (state, action: PayloadAction<string>) => {
      state.diarys = state.diarys.filter(
        (diary) => diary.id !== action.payload
      );
    },
    addEvent: (state, action: PayloadAction<EventDiary>) => {
      const indexAdd = state.diarys.findIndex(
        (diary) => diary.id === action.payload.idDiary
      );
      if (indexAdd !== -1) {
        state.diarys[indexAdd].events.push(action.payload);
      }
    },
    addEventMultiple: (state, action: PayloadAction<EventDiary[]>) => {
      const indexAdd = state.diarys.findIndex(
        (diary) => diary.id === action.payload[0].idDiary
      );
      if (indexAdd !== -1) {
        for (const event of action.payload) {
          state.diarys[indexAdd].events.push(event);
        }
      }
    },
  },
});

export const {
  refreshDiarys,
  addEventMultiple,
  changeIdDiaryForDelete,
  changeEventWeekOnChange,
  changeFlowChangeWeekEvent,
  changeFlowChangeEventAllDay,
  deleteEventDiary,
  modifEventDiary,
  changeFlowChangeEvent,
  changeModalNewEventWouldBeLeft,
  modifEventTempDiary,
  changePosModalNewEvent,
  changeModalNewEventIsInAnchor,
  changeFlowMoveModalEvent,
  saveEventTemp,
  changeModalWarningNotDiarys,
  initEventTemp,
  addEventTemp,
  changeModalNewEvent,
  changeIdDiarysModalChoiceColor,
  changeModalChoiceColor,
  changeModalUnsubscribeDiary,
  changeColorDiary,
  deleteDiaryDisplay,
  addDiaryDisplay,
  addDiary,
  deleteDiary,
  addEvent,
} = diarysSlice.actions;

export default diarysSlice.reducer;
