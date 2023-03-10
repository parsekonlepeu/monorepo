import { Theme } from "@mui/material";
import { IContextFunctionManage } from "../../context/context-function-manage";
import {
  changeSnackbarParams,
  changeSnackbarVisible,
} from "../../store/slices/generalSlice";
import { Diary, EventDiary, FunctionManageDiary } from "../../types";

export const callFunctionManage = async <T>(
  functionManage: FunctionManageDiary<T> | undefined,
  data: T,
  theme: Theme,
  dispatch: any,
  cb?: () => void
) => {
  if (functionManage) {
    dispatch(changeSnackbarVisible(true));
    dispatch(
      changeSnackbarParams({
        message: "Actualisation en cours",
        key: "Actualisation en cours",
        color: "",
      })
    );
    try {
      const ret = await functionManage(data);
      if (ret.success) {
        dispatch(
          changeSnackbarParams({
            message: ret.messageSnackbar,
            key: ret.messageSnackbar,
            color: theme.palette.success.main,
          })
        );
        cb && cb();
      } else {
        dispatch(
          changeSnackbarParams({
            message: ret.messageSnackbar,
            key: ret.messageSnackbar,
            color: theme.google.error,
          })
        );
      }
    } catch (error) {
      dispatch(
        changeSnackbarParams({
          message: "une erreur s'est produite",
          key: "une erreur s'est produite",
          color: theme.google.error,
        })
      );
    }
  }
};
