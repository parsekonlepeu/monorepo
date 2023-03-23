import * as React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import { DiaryList } from "./DiaryList";
import { Modal } from "@mui/material";
import {
  changeModalChoiceColor,
  changeModalUnsubscribeDiary,
} from "../../store/slices/diarysSlice";
import { ModalChoiceColor } from "./ModalChoiceColor";
import { ModalDeleteDiary } from "./ModalDeleteDiary";
import { css } from "@emotion/react";

const ContenairDiarysListCss = {
  mainContenair: css({
    width: "230px",
    marginRight: "auto",
  }),
};

export const ContenairDiarysList: React.FC = () => {
  const dispatch = useAppDispatch();
  const modalChoiceColor = useAppSelector(
    (state) => state.diarys.modalChoiceColor
  );
  const modalUnsubscribeDiary = useAppSelector(
    (state) => state.diarys.modalUnsubscribeDiary
  );
  const diarys = useAppSelector((state) => state.diarys.diarys);

  const handleCloseChoice = () => {
    dispatch(changeModalChoiceColor(false));
  };

  const handleCloseUnsub = () => {
    dispatch(changeModalUnsubscribeDiary(false));
  };

  return (
    <div css={ContenairDiarysListCss.mainContenair}>
      {diarys.map((diary, index) => {
        return (
          <div key={index.toString()}>
            <DiaryList
              title={diary.title}
              idDiary={diary.id}
              canUnsubscribe={true}
              color={diary.color}
            />
          </div>
        );
      })}
      <Modal
        open={modalChoiceColor}
        onClose={handleCloseChoice}
        sx={{
          "	.MuiModal-root": {
            bgcolor: "red",
            display: "flex",
            justifyContent: "center",
          },
        }}
      >
        <ModalChoiceColor />
      </Modal>
      <Modal
        open={modalUnsubscribeDiary}
        onClose={handleCloseUnsub}
      >
        <ModalDeleteDiary />
      </Modal>
    </div>
  );
};
