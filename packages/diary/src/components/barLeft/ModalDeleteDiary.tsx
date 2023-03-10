import * as React from "react";
import { Button, SxProps, useTheme } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import { Diary } from "../../types";
import { css } from "@emotion/react";
import {
  changeIdDiaryForDelete,
  changeModalUnsubscribeDiary,
  deleteDiary,
} from "../../store/slices/diarysSlice";
import { delDiaryRecycleBin } from "../../store/slices/recycleBinSlice";
import { callFunctionManage } from "../../utils/functions/callFunctionManage";
import { ContextFunctionManage } from "../../context/context-function-manage";

const buttonStyle: SxProps = {
  textTransform: "none",
  fontWeight: 700,
  fontSize: "13px",
};

const modalDeleteDiaryCss = {
  mainContenair: css({
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    position: "absolute",
    width: "300px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }),
  textContenair: css({
    backgroundColor: "white",
    display: "flex",
    "& p": {
      padding: "0px",
      margin: "0px",
      fontWeight: 500,
    },
  }),
  buttonDeleteContenair: css({
    display: "flex",
    marginTop: "10px",
    justifyContent: "flex-end",
    alignItems: "center",
  }),
  buttonConfirmDeleteContenair: css({
    display: "flex",
    marginTop: "10px",
    justifyContent: "space-between",
    alignItems: "center",
  }),
};

export const ModalDeleteDiary = React.forwardRef<HTMLDivElement>(
  (props, ref) => {
    const idDiaryForDelete = useAppSelector(
      (state) => state.diarys.idDiaryForDelete
    );
    const diarys = useAppSelector((state) => state.diarys.diarys);
    const dispatch = useAppDispatch();

    const theme = useTheme();

    const functionManage = React.useContext(ContextFunctionManage);

    const [step, setStep] = React.useState<1 | 2>(1);

    const diaryDelete = diarys.find(
      (diary) => diary.id === idDiaryForDelete
    ) as Diary;

    const handleCancel = React.useCallback(() => {
      dispatch(changeIdDiaryForDelete(null));
      dispatch(changeModalUnsubscribeDiary(false));
    }, []);

    const handleDelete = React.useCallback(async () => {
      const cb = () => {
        dispatch(deleteDiary(idDiaryForDelete));
        dispatch(changeModalUnsubscribeDiary(false));
        dispatch(delDiaryRecycleBin(idDiaryForDelete));
      };
      await callFunctionManage(
        functionManage.onDelDiary,
        diaryDelete,
        theme,
        dispatch,
        cb
      );
    }, [idDiaryForDelete]);

    const handleToStep_2 = React.useCallback(() => {
      setStep(2);
    }, []);

    return (
      <div
        css={[
          modalDeleteDiaryCss.mainContenair,
          {
            backgroundColor: theme.google.surface,
          },
        ]}
        ref={ref}
      >
        {step === 1 && (
          <>
            <div css={modalDeleteDiaryCss.textContenair}>
              <p css={{ color: theme.google.onSurface }}>
                Voulez vous vraiment supprimer {diaryDelete.title} ? Vous ne
                pourrez plus accéder à cet agenda ni à ses événements.
              </p>
            </div>
            <div css={modalDeleteDiaryCss.buttonDeleteContenair}>
              <Button
                onClick={handleCancel}
                sx={{
                  ...buttonStyle,
                  color: theme.google.onSurfaceVariantAgm,
                }}
              >
                Annuler
              </Button>
              <Button onClick={handleToStep_2} sx={buttonStyle}>
                Supprimmer l'agenda
              </Button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div css={modalDeleteDiaryCss.textContenair}>
              <p>
                Confirmer vous la suppression définitive de l'agenda{" "}
                {diaryDelete.title} ?
              </p>
            </div>
            <div css={modalDeleteDiaryCss.buttonConfirmDeleteContenair}>
              <Button
                onClick={handleDelete}
                sx={{
                  ...buttonStyle,
                  color: theme.google.error,
                }}
              >
                Confirmer
              </Button>
              <Button
                onClick={handleCancel}
                sx={{
                  ...buttonStyle,
                }}
              >
                Annuler
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }
);
