import { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../store/store";
export declare const contextDatePicker: any;
export declare const useStore: <State = unknown, Action extends import("@reduxjs/toolkit").Action<any> = import("@reduxjs/toolkit").AnyAction>() => import("@reduxjs/toolkit").Store<State, Action>;
export declare const useDispatchPicker: <AppDispatch_1 extends import("@reduxjs/toolkit").Dispatch<import("@reduxjs/toolkit").AnyAction> = import("@reduxjs/toolkit").Dispatch<import("@reduxjs/toolkit").AnyAction>>() => AppDispatch_1;
export declare const useSelectorPicker: <TState = unknown, Selected = unknown>(selector: (state: TState) => Selected, equalityFn?: import("react-redux").EqualityFn<Selected> | undefined) => Selected;
export declare const usePickerDispatch: () => import("@reduxjs/toolkit").ThunkDispatch<import("@reduxjs/toolkit").CombinedState<{
    picker: import("..").PickerState;
}>, undefined, import("@reduxjs/toolkit").AnyAction> & import("@reduxjs/toolkit").Dispatch<import("@reduxjs/toolkit").AnyAction>;
export declare const usePickerSelector: TypedUseSelectorHook<RootState>;
