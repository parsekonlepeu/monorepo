import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const storePicker = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof storePicker.getState>;

export type AppDispatch = typeof storePicker.dispatch;
