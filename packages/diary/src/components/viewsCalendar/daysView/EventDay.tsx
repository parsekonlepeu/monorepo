import { DateTime } from "luxon";
import * as React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/hooks/hooksTypedRedux";
import { useTheme } from "@mui/material";
import {
  changeFlowChangeEvent,
  deleteEventDiary,
  modifEventDiary,
} from "../../../store/slices/diarysSlice";
import {
  HEIGHT_SLICE_15_MINUTE,
  WIDTH_BAR_LEFT,
} from "../../../utils/constants";
import { ContextFunctionManage } from "../../../context/context-function-manage";
import {
  changeSnackbarParams,
  changeSnackbarVisible,
} from "../../../store/slices/generalSlice";
import { PopoverDelete } from "../PopoverDelete";
import { PopoverModifEvent } from "../../../components/viewsCalendar/PopoverModifEvent";
import { addEventRecycleBin } from "../../../store/slices/recycleBinSlice";
import { EventDiaryDisplay } from "../../../types";
import { ForChangeEvent } from "./ForChangeEvent";
import { css } from "@emotion/react";

export const eventDayCss = {
  mainContenair: css({
    position: "absolute",
    borderRadius: "5px",
    pointerEvents: "auto",
    cursor: "pointer",
  }),
  titleDate: css({
    position: "absolute",
    display: "flex",
    left: "10px",
    maxHeight: "30px",
    "& p": {
      margin: "0px",
      marginRight: "5px",
      padding: "0px",
      fontWeight: 600,
      color: "white",
    },
  }),
  forChangeHeight: css({
    height: "50%",
    maxHeight: "8px",
    position: "absolute",
    bottom: "0px",
    left: "0px",
    width: "100%",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    cursor: "ns-resize",
  }),
  forColor: css({
    position: "absolute",
    left: "0px",
    top: "0px",
    height: "100%",
    width: "4px",
    borderRadius: "5px",
  }),
};

interface EventDayProps {
  numbersOfDay: number;
  colorDiary: string;
  colorEvent: string;
  dayOne: DateTime;
  duration: number;
  durationTrunc: number;
  start: DateTime;
  startTrunc: DateTime;
  idDiarys: string;
  idEvent: string;
  title: string;
  numberParts: number;
  event: EventDiaryDisplay;
  widthColumn: number;
}

export const EventDay: React.FC<EventDayProps> = ({
  numbersOfDay,
  colorDiary,
  colorEvent,
  dayOne,
  duration,
  durationTrunc,
  start,
  startTrunc,
  idDiarys,
  idEvent,
  title,
  numberParts,
  event,
  widthColumn,
}) => {
  const flowChangeEvent = useAppSelector(
    (state) => state.diarys.flowChangeEvent
  );
  const canMoveEvent = useAppSelector((state) => state.options.canMoveEvent);
  const [durationChangeEvent, setDurationChangeEvent] =
    React.useState<number>(duration);
  const [startChangeDuration, setStartChangeDuration] =
    React.useState<DateTime>(start);
  const [popClickRigth, setPopClickRigth] = React.useState<boolean>(false);
  const [posPopClickRigth, setPosPopClickRigth] = React.useState({
    x: 0,
    y: 0,
  });
  const [popModif, setPopModif] = React.useState<boolean>(false);

  const functionManage = React.useContext(ContextFunctionManage);

  const theme = useTheme();

  const refLongPress = React.useRef<boolean>(false);
  const refForPopover = React.useRef<HTMLDivElement | null>(null);
  const refDataChange = React.useRef<{
    start: DateTime;
    duration: number;
  }>({
    start: start,
    duration: duration,
  });

  React.useEffect(() => {
    setDurationChangeEvent(duration);
    setStartChangeDuration(start);
  }, [duration, start]);

  const dispatch = useAppDispatch();

  const handlePointerDownChangeHeight: React.PointerEventHandler<HTMLDivElement> =
    (event) => {
      // event.preventDefault()
      event.stopPropagation();
      const element = event.target as HTMLDivElement;
      refDataChange.current = {
        start: start,
        duration: duration,
      };
      const yInit = event.clientY;
      const durationAdd = Math.floor((event.clientY - yInit) / 12) * 15;
      const newDuration = durationChangeEvent + durationAdd;
      setDurationChangeEvent(newDuration);
      const nbPartForDispatch = numberParts === 1 ? "2" : "1";
      dispatch(changeFlowChangeEvent(`${idEvent}_${nbPartForDispatch}`));
      setStartChangeDuration(start);
      const onMoveChangeHeight = (e: globalThis.PointerEvent) => {
        e.preventDefault();
        const durationAdd = Math.floor((e.clientY - yInit) / 12) * 15;
        const newDuration = durationChangeEvent + durationAdd;
        setDurationChangeEvent(newDuration);
        refDataChange.current = {
          start: start,
          duration: newDuration,
        };
      };
      element.addEventListener(
        "pointerup",
        (e) => {
          element.removeEventListener("pointermove", onMoveChangeHeight);
          dispatch(changeFlowChangeEvent(null));
          dispatch(
            modifEventDiary({
              keys: ["start", "duration"],
              values: [
                refDataChange.current.start.toObject(),
                refDataChange.current.duration,
              ],
              idDiary: idDiarys,
              idEvent: idEvent,
            })
          );
          element.releasePointerCapture(e.pointerId);
        },
        { once: true }
      );
      element.addEventListener("pointermove", onMoveChangeHeight);
      element.setPointerCapture(event.pointerId);
    };

  const handlePointerDownChangePositon: React.PointerEventHandler<HTMLDivElement> =
    (e) => {
      if (e.button === 0 && !popClickRigth) {
        refLongPress.current = false;
        const timeOut = setTimeout(() => {
          refLongPress.current = true;
          setStartChangeDuration(start);
          setDurationChangeEvent(duration);
          refDataChange.current = {
            start: start,
            duration: duration,
          };
          dispatch(changeFlowChangeEvent(`${idEvent}_${nbPartForDispatch}`));
        }, 500);
        const element = e.target as HTMLDivElement;
        const yInit = e.clientY;
        const heigthInit = parseInt(
          window.getComputedStyle(element).height.slice(0, -2),
          10
        );
        const nbPartForDispatch = numberParts === 1 ? "2" : "1";
        const onMoveChangePosition = (event: globalThis.PointerEvent) => {
          clearTimeout(timeOut);
          dispatch(changeFlowChangeEvent(`${idEvent}_${nbPartForDispatch}`));
          refLongPress.current = true;
          const newTop = event.clientY - yInit;
          const posXInContenair = event.clientX - WIDTH_BAR_LEFT - 43;
          let numberColumn = Math.floor(posXInContenair / widthColumn);
          numberParts === 2 && numberColumn--;
          const minuteStart = start.minute + start.hour * 60;
          const minute = minuteStart + Math.round(newTop / 12) * 15;
          if (
            numberColumn < numbersOfDay &&
            numberColumn >= -1 &&
            !(
              newTop >= 0 - heigthInit &&
              newTop < HEIGHT_SLICE_15_MINUTE * 4 * 24
            )
          ) {
            setStartChangeDuration(
              dayOne.plus({
                days: numberColumn,
                minute: minute,
              })
            );
            refDataChange.current = {
              start: dayOne.plus({
                days: numberColumn,
                minute: minute,
              }),
              duration: duration,
            };
          } else if (
            newTop >= 0 - heigthInit &&
            newTop < HEIGHT_SLICE_15_MINUTE * 4 * 24 &&
            !(numberColumn < numbersOfDay && numberColumn >= 0)
          ) {
            if (numberColumn >= numbersOfDay) {
              setStartChangeDuration(
                dayOne.plus({
                  days: numbersOfDay - 1,
                  minute: minute,
                })
              );
              refDataChange.current = {
                start: dayOne.plus({
                  days: numbersOfDay - 1,
                  minute: minute,
                }),
                duration: duration,
              };
            } else {
              setStartChangeDuration(
                dayOne.plus({
                  minute: minute,
                })
              );
              refDataChange.current = {
                start: dayOne.plus({
                  minute: minute,
                }),
                duration: duration,
              };
            }
          } else if (
            newTop >= 0 - heigthInit &&
            newTop < HEIGHT_SLICE_15_MINUTE * 4 * 24 - 50 &&
            numberColumn < numbersOfDay &&
            numberColumn >= 0
          ) {
            setStartChangeDuration(
              dayOne.plus({
                days: numberColumn,
                minute: minute,
              })
            );
            refDataChange.current = {
              start: dayOne.plus({
                days: numberColumn,
                minute: minute,
              }),
              duration: duration,
            };
          }
        };
        element.addEventListener(
          "pointerup",
          (e) => {
            if (refLongPress.current) {
              element.removeEventListener("pointermove", onMoveChangePosition);
              dispatch(changeFlowChangeEvent(null));
              dispatch(
                modifEventDiary({
                  keys: ["start", "duration"],
                  values: [
                    refDataChange.current.start.toObject(),
                    refDataChange.current.duration,
                  ],
                  idDiary: idDiarys,
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

  const handleClosePopoverClickRigth = () => {
    setPopClickRigth(false);
  };

  const handleClickColor: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = e.currentTarget.id;
    dispatch(
      modifEventDiary({
        keys: ["color"],
        values: [id],
        idDiary: idDiarys,
        idEvent: idEvent,
      })
    );
    setPopClickRigth(false);
  };

  const handleClickDelete = async () => {
    const dateDelete = DateTime.now().toUnixInteger();
    dispatch(
      deleteEventDiary({
        idDiary: idDiarys,
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

  const handleClosePopoverModif = () => {
    setPopModif(false);
  };

  const diff = startTrunc.diff(dayOne, "days").toObject().days;

  return (
    <div key={idEvent}>
      <div
        ref={refForPopover}
        css={eventDayCss.mainContenair}
        style={{
          backgroundColor: colorEvent,
          width: `calc(${100 / numbersOfDay}% - 10px)`,
          top: ((startTrunc.hour * 60 + startTrunc.minute) / 15) * 12,
          height: (durationTrunc / 15) * 12,
          left: diff && `calc(${(Math.floor(diff) * 100) / numbersOfDay}%)`,
          opacity:
            flowChangeEvent && flowChangeEvent?.slice(0, -2) === `${idEvent}`
              ? 0.5
              : 1,
        }}
        onPointerDown={handlePointerDownChangePositon}
        onContextMenu={handleContextMenu}
      >
        <div
          css={eventDayCss.titleDate}
          style={{
            fontSize: duration <= 30 ? "11px" : "13px",
            top: duration <= 30 ? "0px" : "1px",
            flexDirection: duration <= 30 ? "row" : "column",
          }}
        >
          <p>{`${
            title === "" ? "(Sans titre) " : `${title} ${numberParts} `
          } `}</p>
          <p>
            {` ${start.toLocaleString({
              hour: "2-digit",
              minute: "2-digit",
            })} à ${start.plus({ minutes: duration }).toLocaleString({
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          </p>
        </div>
        {(numberParts === 2 || numberParts === 0) && (
          <div
            css={eventDayCss.forChangeHeight}
            onPointerDown={handlePointerDownChangeHeight}
          />
        )}
        <div
          css={eventDayCss.forColor}
          style={{
            backgroundColor: colorDiary,
          }}
        />
        <PopoverDelete
          open={popClickRigth}
          onClose={handleClosePopoverClickRigth}
          positionX={posPopClickRigth.x}
          positionY={posPopClickRigth.y}
          colorEvent={colorEvent}
          onClickColor={handleClickColor}
          onClickDelete={handleClickDelete}
        />
        <PopoverModifEvent
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
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
      {flowChangeEvent &&
        flowChangeEvent !== `${idEvent}_${numberParts}` &&
        flowChangeEvent.slice(0, -2) === `${idEvent}` && (
          <ForChangeEvent
            title={title}
            duration={durationChangeEvent}
            start={startChangeDuration}
            widthColumn={widthColumn}
            dayOne={dayOne}
            color={colorEvent}
            colorDiary={colorDiary}
          />
        )}
    </div>
  );
};
