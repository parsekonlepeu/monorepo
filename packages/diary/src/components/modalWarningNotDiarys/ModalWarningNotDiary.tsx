import * as React from "react";
import Modal from "@mui/material/Modal";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import { changeModalWarningNotDiarys } from "../../store/slices/diarysSlice";
import { css } from "@emotion/react";

const modalWarningNotDiaryCss = {
  mainContenair: css({
    backgroundColor: "blueviolet",
    width: "100px",
    height: "100px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }),
};

export const ModalWarningNotDiary: React.FC = () => {
  const modalWarningNotDiarys = useAppSelector(
    (state) => state.diarys.modalWarningNotDiarys
  );
  const dispatch = useAppDispatch();
  const handleClose = React.useCallback(() => {
    dispatch(changeModalWarningNotDiarys(false));
  }, []);

  return (
    <Modal open={modalWarningNotDiarys} onClose={handleClose}>
      <div css={modalWarningNotDiaryCss.mainContenair}></div>
    </Modal>
  );
};
