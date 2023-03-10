import React from "react";
import {
  TypedUseSelectorHook,
  createStoreHook,
  createDispatchHook,
  createSelectorHook,
} from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

export const contextDatePicker = React.createContext(null) as any;

export const useStore = createStoreHook(contextDatePicker);
export const useDispatchPicker = createDispatchHook(contextDatePicker);
export const useSelectorPicker = createSelectorHook(contextDatePicker);
export const usePickerDispatch = () => useDispatchPicker<AppDispatch>();
export const usePickerSelector: TypedUseSelectorHook<RootState> =
  useSelectorPicker;
