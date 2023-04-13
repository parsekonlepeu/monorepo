import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  SxProps,
  IconButton,
  Button,
  Paper,
  TextField,
  useTheme,
  Divider,
} from "@mui/material";
import { CloseRounded, DragHandleRounded } from "@mui/icons-material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import {
  changeFlowMoveModalEvent,
  changeModalNewEvent,
  changeModalNewEventIsInAnchor,
  initEventTemp,
  modifEventTempDiary,
  saveEventTemp,
} from "../../store/slices/diarysSlice";
import { EventDiary, PosModal } from "../../types";
import { ContextFunctionManage } from "../../context/context-function-manage";
import {
  changeSnackbarParams,
  changeSnackbarVisible,
} from "../../store/slices/generalSlice";
import { ToggleModalEvent } from "./ToggleModalEvent";
import { css } from "@emotion/react";
import { WIDTH_MODAL_NEW_EVENT } from "../../utils/constants";
import { computStyleToNumber } from "../../utils/functions/computStyleToNumber";

const stylePaper: SxProps = {
  display: "flex",
  flexDirection: "column",
  bgcolor: "white",
};

const modalNewEventCss = {
  mainContenair: css({
    position: "absolute",
    zIndex: 20,
    minWidth: `${WIDTH_MODAL_NEW_EVENT}px`,
    display: "flex",
  }),
  topContenair: css({
    height: "36px",
    width: "100%",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    cursor: "move",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }),
  bottomContenair: css({
    display: "flex",
    flexDirection: "column",
  }),
  buttonContenair: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "10px",
  }),
};

interface ModalNewEventProps {
  posModal: PosModal;
}

export const ModalNewEvent: React.FC<ModalNewEventProps> = ({ posModal }) => {
  const theme = useTheme();
  const functionManage = React.useContext(ContextFunctionManage);

  const refMain = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickQuitModal, {
      once: true,
    });
  }, []);

  const dispatch = useAppDispatch();
  const eventTemp = useAppSelector((state) => state.diarys.eventTemp);

  const handleClickQuitModal: EventListener = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(changeModalNewEvent(false));
    dispatch(initEventTemp(null));
  }, []);

  const stopPropagation: React.MouseEventHandler<HTMLDivElement> =
    React.useCallback((e) => {
      e.stopPropagation();
    }, []);

  const handleMouseDownChangePositon: React.MouseEventHandler<
    HTMLDivElement
  > = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const yInit = event.clientY;
    const xInit = event.clientX;
    if (refMain.current) {
      const topInit = computStyleToNumber("top", refMain.current);
      const leftInit = computStyleToNumber("left", refMain.current);
      const onMoveChangePosition = (e: MouseEvent) => {
        if (refMain.current) {
          e.preventDefault();
          e.stopPropagation();
          dispatch(changeFlowMoveModalEvent(true));
          const computStyleWidth = computStyleToNumber(
            "width",
            refMain.current
          );
          const computStyleHeight = computStyleToNumber(
            "height",
            refMain.current
          );
          let newTop = topInit + (e.clientY - yInit);
          let newLeft = leftInit + (e.clientX - xInit);
          if (newLeft < 246) {
            dispatch(changeModalNewEventIsInAnchor(true));
          } else {
            dispatch(changeModalNewEventIsInAnchor(false));
          }
          if (newLeft < 0) {
            newLeft = 0;
          }
          if (newTop < 0) {
            newTop = 0;
          }
          if (newLeft + computStyleWidth > window.innerWidth) {
            newLeft = window.innerWidth - computStyleWidth;
          }
          if (newTop + computStyleHeight > window.innerHeight) {
            newTop = window.innerHeight - computStyleHeight;
          }

          refMain.current.style.top = `${newTop}px`;
          refMain.current.style.left = `${newLeft}px`;
        }
      };
      event.currentTarget.addEventListener(
        "mouseup",
        (e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(changeFlowMoveModalEvent(false));
          document.removeEventListener("mousemove", onMoveChangePosition);
        },
        { once: true }
      );
      document.addEventListener("mousemove", onMoveChangePosition);
    }
  };

  const handleSave = async () => {
    const textfeildDescription = document.getElementById(
      "textfeild-description-new-event"
    ) as HTMLTextAreaElement | null;
    const textefieldChoicePlace = document.getElementById(
      "textefield-choice-place-new-event"
    ) as HTMLTextAreaElement | null;
    const textfieldTitle = document.getElementById(
      "textfield-title-new-event"
    ) as HTMLTextAreaElement | null;
    textfeildDescription &&
      textefieldChoicePlace &&
      textfieldTitle &&
      dispatch(
        modifEventTempDiary({
          keys: ["description", "place", "title"],
          values: [
            textfeildDescription.value,
            textefieldChoicePlace.value,
            textfieldTitle.value,
          ],
        })
      );
    dispatch(saveEventTemp(null));
    dispatch(changeModalNewEvent(false));
    dispatch(initEventTemp(null));
    if (functionManage.onAddEvent && eventTemp) {
      const newEvent: EventDiary = {
        ...eventTemp,
        description: textfeildDescription ? textfeildDescription.value : "",
        place: textefieldChoicePlace ? textefieldChoicePlace.value : "",
        title: textfieldTitle ? textfieldTitle.value : "",
      };
      dispatch(changeSnackbarVisible(true));
      dispatch(
        changeSnackbarParams({
          message: "Actualisation en cours",
          key: "Actualisation en cours",
          color: "",
        })
      );
      try {
        const ret = await functionManage.onAddEvent(newEvent);
        if (ret.success) {
          dispatch(
            changeSnackbarParams({
              message: ret.messageSnackbar,
              key: ret.messageSnackbar,
              color: theme.palette.success.main,
            })
          );
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
            message: "une erreur c'est produit",
            key: "une erreur c'est produit",
            color: theme.google.error,
          })
        );
      }
    }
  };

  return (
    <div
      css={modalNewEventCss.mainContenair}
      id="modal-new-event"
      ref={refMain}
      style={{
        left: posModal.x,
        top: posModal.y,
      }}
    >
      <Paper
        elevation={20}
        sx={stylePaper}
      >
        <div
          css={[
            modalNewEventCss.topContenair,
            {
              backgroundColor: theme.google.textfieldSurface,
            },
          ]}
          onMouseDown={handleMouseDownChangePositon}
        >
          <IconButton>
            <DragHandleRounded />
          </IconButton>
          <IconButton>
            <CloseRounded />
          </IconButton>
        </div>
        <div
          css={modalNewEventCss.bottomContenair}
          onMouseDown={stopPropagation}
        >
          <ToggleModalEvent />
          <div css={modalNewEventCss.buttonContenair}>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
              }}
              onClick={handleSave}
            >
              Enregistrer
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};
