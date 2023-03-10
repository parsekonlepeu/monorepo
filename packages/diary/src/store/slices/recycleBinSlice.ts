import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import {
  Diary,
  EventDiary,
  IdDiary,
  EventDiaryDelete,
  RecycleBinDiary,
  RecycleBinState,
} from "../../types";

const initialState: RecycleBinState = {
  recycleBinList: [],
  modalRecycleBin: false,
  allClicked: false,
};

const recycleBinSlice: Slice<RecycleBinState> = createSlice({
  name: "recycleBin",
  initialState: initialState,
  reducers: {
    changeOnClickEvent: (
      state,
      action: PayloadAction<{
        idDiary: IdDiary;
        idEvent: string;
      }>
    ) => {
      const diaryIndex = state.recycleBinList.findIndex(
        (diary) => diary.idDiary === action.payload.idDiary
      );
      const eventIndex =
        diaryIndex !== -1 &&
        state.recycleBinList[diaryIndex].listEventDelete.findIndex(
          (event) => event.id === action.payload.idEvent
        );
      if (eventIndex !== false && eventIndex !== -1) {
        state.recycleBinList[diaryIndex].listEventDelete[eventIndex].isClicked =
          !state.recycleBinList[diaryIndex].listEventDelete[eventIndex]
            .isClicked;
      }
      let allClicked = true;
      for (const event of state.recycleBinList[diaryIndex].listEventDelete) {
        if (!event.isClicked) {
          allClicked = false;
        }
      }
      state.allClicked = allClicked;
    },
    changeAllOnClickedEvent: (state, action: PayloadAction<IdDiary>) => {
      const newAllClicked = !state.allClicked;
      state.allClicked = newAllClicked;
      const list = state.recycleBinList.find(
        (diary) => diary.idDiary === action.payload
      );
      if (list) {
        for (const event of list.listEventDelete) {
          event.isClicked = newAllClicked;
        }
      }
    },
    changeModalRecycleBin: (state, action: PayloadAction<boolean>) => {
      state.modalRecycleBin = action.payload;
    },
    addEventRecycleBin: (state, action: PayloadAction<EventDiaryDelete>) => {
      for (const diary of state.recycleBinList) {
        if (diary.idDiary === action.payload.idDiary) {
          diary.listEventDelete.push(action.payload);
        }
      }
    },
    delEventRecycleBin: (state, action: PayloadAction<EventDiaryDelete>) => {
      for (const diary of state.recycleBinList) {
        if (diary.idDiary === action.payload.idDiary) {
          diary.listEventDelete = diary.listEventDelete.filter(
            (event) => event.id !== action.payload.id
          );
        }
      }
    },
    delAllEventRecycleBin: (state, action: PayloadAction<IdDiary>) => {
      const indexDel = state.recycleBinList.findIndex(
        (diary) => diary.idDiary === action.payload
      );
      if (indexDel !== -1) {
        state.recycleBinList[indexDel].listEventDelete = [];
      }
    },
    delClickedEventRecycleBin: (state, action: PayloadAction<IdDiary>) => {
      const indexDel = state.recycleBinList.findIndex(
        (diary) => diary.idDiary === action.payload
      );
      if (indexDel !== -1) {
        state.recycleBinList[indexDel].listEventDelete = state.recycleBinList[
          indexDel
        ].listEventDelete.filter((event) => !event.isClicked);
      }
    },
    refreshRecycleBin: (state, action: PayloadAction<RecycleBinDiary[]>) => {
      state.recycleBinList = action.payload;
    },
    addDiaryRecycleBin: (
      state,
      action: PayloadAction<{ id: IdDiary; title: string; color: string }>
    ) => {
      state.recycleBinList.push({
        title: action.payload.title,
        color: action.payload.color,
        idDiary: action.payload.id,
        listEventDelete: [],
      });
    },
    delDiaryRecycleBin: (state, action: PayloadAction<IdDiary>) => {
      state.recycleBinList = state.recycleBinList.filter(
        (diary) => diary.idDiary !== action.payload
      );
    },
  },
});

export const {
  refreshRecycleBin,
  delClickedEventRecycleBin,
  delAllEventRecycleBin,
  changeAllOnClickedEvent,
  changeOnClickEvent,
  changeModalRecycleBin,
  addEventRecycleBin,
  delEventRecycleBin,
  addDiaryRecycleBin,
  delDiaryRecycleBin,
} = recycleBinSlice.actions;

export default recycleBinSlice.reducer;
