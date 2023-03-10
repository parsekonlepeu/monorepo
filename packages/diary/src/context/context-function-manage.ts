import React from "react";
import { Diary, EventDiary, FunctionManageDiary } from "../types";

export interface IContextFunctionManage {
  onAddEvent?: FunctionManageDiary<EventDiary>;
  onDelEvent?: FunctionManageDiary<EventDiary>;
  onChangeEvent?: FunctionManageDiary<EventDiary>;
  onAddDiary?: FunctionManageDiary<Diary>;
  onDelDiary?: FunctionManageDiary<Diary>;
  onChangeDiary?: FunctionManageDiary<Diary>;
  onChangeOptions?: FunctionManageDiary<EventDiary>;
}

export const ContextFunctionManage =
  React.createContext<IContextFunctionManage>({
    onAddEvent: undefined,
    onDelEvent: undefined,
    onChangeEvent: undefined,
    onAddDiary: undefined,
    onDelDiary: undefined,
    onChangeDiary: undefined,
    onChangeOptions: undefined,
  });
