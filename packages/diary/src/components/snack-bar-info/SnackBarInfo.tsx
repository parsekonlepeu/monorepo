import * as React from "react";
import { Snackbar } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import { changeSnackbarVisible } from "../../store/slices/generalSlice";

export const SnackBarInfo: React.FC = () => {
  const snackbarParams = useAppSelector(
    (state) => state.general.snackbarParams
  );
  const snackbarVisible = useAppSelector(
    (state) => state.general.snackbarVisible
  );

  const dispatch = useAppDispatch();

  const handleCloseSnackbar = React.useCallback(() => {
    dispatch(changeSnackbarVisible(false));
  }, []);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={snackbarVisible}
      onClose={handleCloseSnackbar}
      ContentProps={{
        sx: {
          backgroundColor: snackbarParams.color,
          background: snackbarParams.color,
        },
      }}
      autoHideDuration={3000}
      message={snackbarParams.message}
      key={snackbarParams.key}
    />
  );
};
