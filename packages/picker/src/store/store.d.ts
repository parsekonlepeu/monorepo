declare const storePicker: import("@reduxjs/toolkit/dist/configureStore").ToolkitStore<import("@reduxjs/toolkit").CombinedState<{
    picker: import("..").PickerState;
}>, import("@reduxjs/toolkit").AnyAction, [import("@reduxjs/toolkit").ThunkMiddleware<import("@reduxjs/toolkit").CombinedState<{
    picker: import("..").PickerState;
}>, import("@reduxjs/toolkit").AnyAction, undefined>]>;
export type RootState = ReturnType<typeof storePicker.getState>;
export type AppDispatch = typeof storePicker.dispatch;
export {};
