import { css } from "@emotion/react";
import { DateTime } from "luxon";
import { divideDurationStart } from "../../../utils/functions/divideDurationStart";
import { eventDayCss } from "./EventDay";

const forFlowChangeCss = css({
  position: "absolute",
  top: "120px",
  left: "0px",
  width: "25%",
  height: "120px",
  borderradius: "5px",
  cursor: "pointer",
});

interface ForChangeEventProps {
  title: string;
  duration: number;
  start: DateTime;
  widthColumn: number;
  dayOne: DateTime;
  color: string;
  colorDiary: string;
}

export const ForChangeEvent: React.FC<ForChangeEventProps> = ({
  title,
  duration,
  start,
  widthColumn,
  dayOne,
  color,
  colorDiary,
}) => {
  const startEnd = start.plus({ minutes: duration });
  const dataDisplay: { duration: number; start: DateTime }[] = [];
  if (start.day !== startEnd.day) {
    dataDisplay.push(...divideDurationStart(start, duration));
  } else {
    dataDisplay.push({
      duration: duration,
      start: start,
    });
  }

  return (
    <>
      {dataDisplay.map((data, index) => {
        const diffDayOne = data.start.diff(dayOne, "days").toObject().days;
        const left = diffDayOne && Math.floor(diffDayOne) * widthColumn;
        return (
          <div
            key={index.toString()}
            css={forFlowChangeCss}
            style={{
              backgroundColor: color,
              width: `${widthColumn}px`,
              top: ((data.start.hour * 60 + data.start.minute) / 15) * 12,
              height: Math.round(data.duration / 15) * 12,
              left: left,
              zIndex: 5000,
            }}
          >
            <div
              css={eventDayCss.titleDate}
              style={{
                fontSize: duration <= 30 ? "11px" : "13px",
                top: duration <= 30 ? "-2px" : "1px",
                flexDirection: duration <= 30 ? "row" : "column",
              }}
            >
              <p>{`${title === "" ? "(Sans titre) " : `${title} `} `}</p>
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
            <div
              css={{
                ...eventDayCss.forColor,
                backgroundColor: colorDiary,
              }}
            />
          </div>
        );
      })}
    </>
  );
};
