declare const rootReducer: import("@reduxjs/toolkit").Reducer<import("@reduxjs/toolkit").CombinedState<{
    picker: import("..").PickerState;
}>, import("@reduxjs/toolkit").AnyAction>;
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
