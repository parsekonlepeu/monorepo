import * as React from "react";
import { DateTime } from "luxon";
import {
  changeEventWeekOnChange,
  changeFlowChangeWeekEvent,
  modifEventDiary,
} from "../../../store/slices/diarysSlice";
import { useAppDispatch } from "../../../utils/hooks/hooksTypedRedux";
import { EventDiaryDisplay } from "../../../types";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material";

const eventWeekCss = {
  mainContenair: css({
    position: "absolute",
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    top: "4px",
    left: "0px",
    height: "20px",
    borderRadius: "5px",
    zIndex: 10,
    cursor: "pointer",
    "& p": {
      fontSize: "13px",
      fontWeight: 600,
      margin: "0px",
      marginLeft: "4px",
      padding: "0px",
    },
  }),
  eventWeekNotAllDay: css({}),
  forColor: css({}),
};

interface EventWeekProps {
  event: EventDiaryDisplay;
  numberWeek: number;
  forChange: boolean;
}

export const EventWeek: React.FC<EventWeekProps> = ({
  event,
  numberWeek,
  forChange,
}) => {
  const theme = useTheme();
  const startTruncateDt = DateTime.fromObject(event.startTruncate);
  const endTruncateDt = startTruncateDt.plus({
    minutes: event.durationTruncate,
  });
  const startDt = DateTime.fromObject(event.start);
  const numberDay = Math.ceil(
    endTruncateDt.diff(startTruncateDt, "days").toObject().days as number
  );
  const title = event.title === "" ? "(Sans titre)" : event.title;

  const dispatch = useAppDispatch();

  const [popModif, setPopModif] = React.useState<boolean>(false);
  const [popClickRigth, setPopClickRigth] = React.useState<boolean>(false);

  const refDataChange = React.useRef<{
    start: DateTime;
  }>({
    start: DateTime.fromObject(event.start),
  });
  const refLongPress = React.useRef<boolean>(false);
  const refDiffNumberRow = React.useRef<number>(0);
  const refDiffNumberColumn = React.useRef<number>(0);

  const handlePointerDownChangePositon: React.PointerEventHandler<HTMLDivElement> =
    (e) => {
      // e.preventDefault()
      e.stopPropagation();
      if (e.button === 0 && !popClickRigth) {
        refLongPress.current = false;
        refDataChange.current = {
          start: DateTime.fromObject(event.start),
        };
        const timeOut = setTimeout(() => {
          refLongPress.current = true;
          refDiffNumberColumn.current = 0;
          refDiffNumberRow.current = 0;
          dispatch(changeEventWeekOnChange(event));
          // refDataChange.current = {
          //   start: DateTime.fromObject(event.start),
          // }
          dispatch(changeFlowChangeWeekEvent(event.id));
        }, 500);
        const element = e.target as HTMLDivElement;
        const dayContenair = document.querySelector(
          ".event-week-view-contenair"
        ) as HTMLDivElement;
        const infoDayContenair = dayContenair.getBoundingClientRect();
        const weekViewContenair = document.getElementById(
          "week-view-contenair"
        ) as HTMLDivElement;
        const infoWeekViewContenair = weekViewContenair.getBoundingClientRect();
        const dayContenairHeight = infoDayContenair.height + 25;
        const dayContenairWidth = infoDayContenair.width;
        const mouseXInit = e.clientX - infoWeekViewContenair.left;
        const mouseYInit = e.clientY - infoWeekViewContenair.top - 20;
        const numberColumnInit = Math.ceil(mouseXInit / dayContenairWidth);
        const numberRowInit = Math.ceil(mouseYInit / dayContenairHeight);
        refDiffNumberColumn.current = numberColumnInit;
        refDiffNumberRow.current = numberRowInit;
        const onMoveChangePosition = (eventMove: globalThis.PointerEvent) => {
          eventMove.preventDefault();
          // eventMove.stopPropagation()
          clearTimeout(timeOut);
          dispatch(changeFlowChangeWeekEvent(event.id));
          refLongPress.current = true;
          const mouseX = eventMove.clientX - infoWeekViewContenair.left;
          const mouseY = eventMove.clientY - infoWeekViewContenair.top - 20;
          const numberRow = clamp(
            Math.ceil(mouseY / dayContenairHeight),
            1,
            numberWeek
          );
          const numberColumn = clamp(
            Math.ceil(mouseX / dayContenairWidth),
            1,
            7
          );
          const diffNumberRow = numberRow - numberRowInit;
          const diffNumberColumn = numberColumn - numberColumnInit;
          if (
            diffNumberRow !== refDiffNumberRow.current ||
            diffNumberColumn !== refDiffNumberColumn.current
          ) {
            event.allDay || event.duration > 24 * 60
              ? dispatch(
                  changeEventWeekOnChange({
                    ...event,
                    start: startDt
                      .plus({
                        days: diffNumberRow * 7 + diffNumberColumn,
                      })
                      .toObject(),
                  })
                )
              : dispatch(
                  changeEventWeekOnChange({
                    ...event,
                    start: startDt
                      .plus({
                        days: diffNumberRow * 7 + diffNumberColumn,
                      })
                      .toObject(),
                    startTruncate: startDt
                      .plus({
                        days: diffNumberRow * 7 + diffNumberColumn,
                      })
                      .toObject(),
                  })
                );
          }
          refDiffNumberRow.current = diffNumberRow;
          refDiffNumberColumn.current = diffNumberColumn;
        };
        element.addEventListener(
          "pointerup",
          (e) => {
            if (refLongPress.current) {
              element.removeEventListener("pointermove", onMoveChangePosition);
              dispatch(changeFlowChangeWeekEvent(null));
              dispatch(changeEventWeekOnChange(null));
              const newStart = startDt
                .plus({
                  days:
                    refDiffNumberRow.current * 7 + refDiffNumberColumn.current,
                })
                .toObject();
              dispatch(
                modifEventDiary({
                  keys: ["start"],
                  values: [newStart],
                  idDiary: event.idDiary,
                  idEvent: event.id,
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
            dispatch(changeFlowChangeWeekEvent(null));
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
          // setPosPopClickRigth({
          //   x: e.clientX,
          //   y: e.clientY,
          // })
        }
      }
    };

  return (
    <div
      css={[
        eventWeekCss.mainContenair,
        {
          "& p": {
            color: theme.google.surface,
          },
        },
      ]}
      style={{
        zIndex: forChange ? 8 : 10,
        opacity: forChange ? 0.5 : 1,
        width: `calc(${100 * numberDay}% - 10px)`,
        backgroundColor: event.color,
      }}
      onPointerDown={handlePointerDownChangePositon}
    >
      {event.allDay ? (
        <p>{title}</p>
      ) : (
        <div css={eventWeekCss.eventWeekNotAllDay}>
          <div css={eventWeekCss.forColor} />
          <p>
            {startTruncateDt.toLocaleString(DateTime.TIME_24_SIMPLE)}
            {title}
          </p>
        </div>
      )}
    </div>
  );
};

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);
