import { combineReducers } from "@reduxjs/toolkit";
import optionsReducer from "./slices/optionsSlice";
import generalReducer from "./slices/generalSlice";
import diarysReducer from "./slices/diarysSlice";
import recyclebinReducer from "./slices/recycleBinSlice";

const rootReducer = combineReducers({
  options: optionsReducer,
  general: generalReducer,
  diarys: diarysReducer,
  recycleBin: recyclebinReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
