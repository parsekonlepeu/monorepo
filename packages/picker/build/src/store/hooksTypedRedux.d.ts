import { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../store/store";
export declare const contextDatePicker: any;
export declare const useStore: <State = unknown, Action extends BasicAction<any> = AnyAction>() => Store<State_1, Action_1>;
export declare const useDispatchPicker: <AppDispatch_1 extends Dispatch<A> = Dispatch<A>>() => AppDispatch_1;
export declare const useSelectorPicker: <TState = unknown, Selected = unknown>(selector: (state: TState) => Selected, equalityFn?: import("react-redux").EqualityFn<Selected> | undefined) => Selected;
export declare const usePickerDispatch: () => import("@reduxjs/toolkit").ThunkDispatch<import("@reduxjs/toolkit").CombinedState<{
    picker: import("..").PickerState;
}>, undefined, import("@reduxjs/toolkit").AnyAction> & import("@reduxjs/toolkit").Dispatch<import("@reduxjs/toolkit").AnyAction>;
export declare const usePickerSelector: TypedUseSelectorHook<RootState>;
