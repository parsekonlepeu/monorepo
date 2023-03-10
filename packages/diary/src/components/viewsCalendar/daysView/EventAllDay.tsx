import { DateTime } from "luxon";
import * as React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/hooks/hooksTypedRedux";
import {
  changeFlowChangeEventAllDay,
  deleteEventDiary,
  modifEventDiary,
} from "../../../store/slices/diarysSlice";
import {
  HEIGHT_ROW_CONTNAIR_EVENT_ALL_DAY,
  WIDTH_BAR_LEFT,
} from "../../../utils/constants";
import { useTheme } from "@mui/material";
import { PopoverDelete } from "../PopoverDelete";
import {
  changeSnackbarParams,
  changeSnackbarVisible,
} from "../../../store/slices/generalSlice";
import { ContextFunctionManage } from "../../../context/context-function-manage";
import { PopoverModifEvent } from "../../../components/viewsCalendar/PopoverModifEvent";
import { addEventRecycleBin } from "../../../store/slices/recycleBinSlice";
import { EventDiary } from "../../../types";
import { css } from "@emotion/react";
import { SpanOverflow } from "./SpanOverFlow";
import { getNumberColumnDisplay } from "../../../utils/functions/getNumberColemnDisplay";
import { ForChangeEventAllDay } from "./ForChangeEventAllDay";
import { getInfoForEventAllDay } from "../../../utils/functions/getInfoForEventAllDay";

const eventAllDayCss = {
  mainContenair: css({
    borderRadius: "5px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    pointerEvents: "auto",
    "& p": {
      color: "white",
      fontSize: "13px",
      fontWeight: 600,
      marginLeft: "5px",
    },
  }),
};

interface EventAllDayProps {
  colorDiary: string;
  numbersOfDay: number;
  dayOne: DateTime;
  idDiary: string;
  idEvent: string;
  event: EventDiary;
  start: DateTime;
  rowNumber: number;
  widthColumn: number;
}

export const EventAllDay: React.FC<EventAllDayProps> = ({
  numbersOfDay,
  dayOne,
  idDiary,
  idEvent,
  event,
  rowNumber,
  widthColumn,
  start,
  colorDiary,
}) => {
  const dispatch = useAppDispatch();

  const functionManage = React.useContext(ContextFunctionManage);

  const theme = useTheme();

  const flowChangeEventAllDay = useAppSelector(
    (state) => state.diarys.flowChangeEventAllDay
  );
  const canMoveEvent = useAppSelector((state) => state.options.canMoveEvent);

  const [startChange, setStartChange] = React.useState<DateTime>(start);
  const [popModif, setPopModif] = React.useState<boolean>(false);
  const [popClickRigth, setPopClickRigth] = React.useState<boolean>(false);
  const [posPopClickRigth, setPosPopClickRigth] = React.useState({
    x: 0,
    y: 0,
  });

  const refDataChange = React.useRef<{
    start: DateTime;
  }>({
    start: start,
  });
  const refLongPress = React.useRef<boolean>(false);
  const refForPopover = React.useRef<HTMLDivElement | null>(null);

  const { top, overflowRight, overflowLeft } = getInfoForEventAllDay(
    start,
    event.duration,
    rowNumber,
    dayOne,
    numbersOfDay
  );
  const title = event.title === "" ? "(Sans titre)" : event.title;

  const handlePointerDownChangePositon: React.PointerEventHandler<HTMLDivElement> =
    (e) => {
      if (e.button === 0 && !popClickRigth) {
        refLongPress.current = false;
        const timeOut = setTimeout(() => {
          refLongPress.current = true;
          setStartChange(start);
          refDataChange.current = {
            start: start,
          };
          dispatch(changeFlowChangeEventAllDay(idEvent));
        }, 500);
        const element = e.target as HTMLDivElement;
        const numberColumnInitial = Math.floor(
          (e.clientX - WIDTH_BAR_LEFT - 43) / widthColumn
        );
        const onMoveChangePosition = (eventMove: globalThis.PointerEvent) => {
          eventMove.preventDefault();
          clearTimeout(timeOut);
          dispatch(changeFlowChangeEventAllDay(idEvent));
          refLongPress.current = true;
          const numberColumn = Math.floor(
            (eventMove.clientX - WIDTH_BAR_LEFT - 43) / widthColumn
          );
          const diffColumn = numberColumn - numberColumnInitial;
          const startChange = start.plus({
            days: diffColumn,
          });
          const startChangeEnd = startChange.plus({
            minutes: event.duration,
          });
          const diffDayOneStartChangeEnd = dayOne
            .diff(startChangeEnd, "days")
            .toObject().days;
          const diffLastDayStartChange = dayOne
            .plus({ days: numbersOfDay - 1 })
            .diff(startChange, "days")
            .toObject().days;
          if (
            diffDayOneStartChangeEnd &&
            diffLastDayStartChange &&
            diffLastDayStartChange > -1 &&
            diffDayOneStartChangeEnd <= 0
          ) {
            setStartChange(startChange);
            refDataChange.current = {
              start: startChange,
            };
          }
        };
        element.addEventListener(
          "pointerup",
          (e) => {
            if (refLongPress.current) {
              element.removeEventListener("pointermove", onMoveChangePosition);
              dispatch(changeFlowChangeEventAllDay(null));
              dispatch(
                modifEventDiary({
                  keys: ["start"],
                  values: [refDataChange.current.start.toObject()],
                  idDiary: idDiary,
                  idEvent: idEvent,
                })
              );
              element.releasePointerCapture(e.pointerId);
            } else {
              clearTimeout(timeOut);
              setPopModif(true);
              element.removeEventListener("pointermove", onMoveChangePosition);
            }
          },
          { once: true }
        );
        element.addEventListener("pointermove", onMoveChangePosition);
        document.addEventListener(
          "pointerenter",
          () => {
            dispatch(changeFlowChangeEventAllDay(null));
          },
          { once: true }
        );
        element.setPointerCapture(e.pointerId);
      } else if (e.button === 2) {
        e.preventDefault();
        e.stopPropagation();
        if (popClickRigth) {
          setPopClickRigth(false);
        } else {
          setPopClickRigth(true);
          setPosPopClickRigth({
            x: e.clientX,
            y: e.clientY,
          });
        }
      }
    };

  const handleContextMenu: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  const handleClosePopoverClickRigth = React.useCallback(() => {
    setPopClickRigth(false);
  }, []);

  const handleClosePopoverModif = React.useCallback(() => {
    setPopModif(false);
  }, []);

  const handleClickColor: React.MouseEventHandler<HTMLDivElement> =
    React.useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = e.currentTarget.id;
        dispatch(
          modifEventDiary({
            keys: ["color"],
            values: [id],
            idDiary: idDiary,
            idEvent: idEvent,
          })
        );
        setPopClickRigth(false);
      },
      [idDiary, idEvent]
    );

  const handleClickDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPopClickRigth(false);
    setPopModif(false);
    const dateDelete = DateTime.now().toUnixInteger();
    dispatch(
      deleteEventDiary({
        idDiary: idDiary,
        idEvent: idEvent,
      })
    );
    dispatch(
      addEventRecycleBin({
        ...event,
        dateDelete: dateDelete,
        isClicked: false,
      })
    );
    if (functionManage.onDelEvent) {
      dispatch(changeSnackbarVisible(true));
      dispatch(
        changeSnackbarParams({
          message: "Actualisation en cours",
          key: "Actualisation en cours",
          color: "",
        })
      );
      try {
        const ret = await functionManage.onDelEvent(event);
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

  const diff = start.diff(dayOne, "days").toObject().days;

  const numberColumnDisplay = getNumberColumnDisplay(
    start,
    start.plus({ minutes: event.duration }),
    dayOne,
    numbersOfDay
  );

  return (
    <div key={event.id}>
      <div
        ref={refForPopover}
        css={eventAllDayCss.mainContenair}
        style={{
          height: `${HEIGHT_ROW_CONTNAIR_EVENT_ALL_DAY - 6}px`,
          top: `${top + 3}px`,
          left:
            diff &&
            `calc(${
              (Math.max(0, Math.floor(diff)) * 100) / numbersOfDay - 1 / 7
            }%)`,
          width: `calc(${numberColumnDisplay * (100 / numbersOfDay)}% - 10px)`,
          backgroundColor: event.color,
          position: "absolute",
          cursor: "pointer",
          opacity: flowChangeEventAllDay
            ? flowChangeEventAllDay === `${event.id}`
              ? 0.6
              : 0.2
            : 1,
        }}
        onPointerDown={handlePointerDownChangePositon}
        onContextMenu={handleContextMenu}
      >
        <p>{title}</p>
        <SpanOverflow
          colorDiary={colorDiary}
          overflowLeft={overflowLeft}
          overflowRight={overflowRight}
        />
        <PopoverDelete
          open={popClickRigth}
          onClose={handleClosePopoverClickRigth}
          positionX={posPopClickRigth.x}
          positionY={posPopClickRigth.y}
          colorEvent={event.color}
          onClickColor={handleClickColor}
          onClickDelete={handleClickDelete}
        />
        <PopoverModifEvent
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={popModif}
          onClose={handleClosePopoverModif}
          anchorEl={refForPopover.current}
          event={event}
          onClickDelete={
            handleClickDelete as React.MouseEventHandler<HTMLButtonElement>
          }
        />
      </div>
      {flowChangeEventAllDay && flowChangeEventAllDay === `${event.id}` && (
        <ForChangeEventAllDay
          title={title}
          duration={event.duration}
          start={startChange}
          widthColumn={widthColumn}
          dayOne={dayOne}
          color={event.color}
          colorDiary={colorDiary}
          rowNumber={rowNumber}
          numbersOfDay={numbersOfDay}
        />
      )}
    </div>
  );
};
