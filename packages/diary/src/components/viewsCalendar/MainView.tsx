import * as React from "react";
import { useAppSelector } from "../../utils/hooks/hooksTypedRedux";
import { HEIGHT_TOP, WIDTH_BAR_LEFT } from "../../utils/constants";
import { DaysView } from "./daysView/DaysView";
import { WeekView } from "./weeksView/WeekView";
import { YearView } from "./yearView/YearView";
import { PlanningView } from "./planning-view/PlanningView";
import { css } from "@emotion/react";
import { getNumbersOfDay } from "../../utils/functions/getNumbersOfDay";
import { getNumbersOfWeek } from "../../utils/functions/getNumbersOfWeek";

const mainViewCss = {
  mainContenair: css({
    position: "absolute",
    top: `${HEIGHT_TOP}px`,
    height: `calc(100vh - ${HEIGHT_TOP}px)`,
    transition: "0.2s",
    display: "flex",
  }),
};

export const MainView: React.FC = () => {
  const displayMode = useAppSelector((state) => state.general.displayMode);
  const leftExtend = useAppSelector((state) => state.general.leftExtend);

  return (
    <div
      css={mainViewCss.mainContenair}
      style={{
        width: leftExtend ? `calc(100vw - ${WIDTH_BAR_LEFT}px)` : "100vw",
        left: leftExtend ? `${WIDTH_BAR_LEFT}px` : "0px",
      }}
    >
      {[
        "Week",
        "Day",
        "2 days",
        "3 days",
        "4 days",
        "5 days",
        "6 days",
        "7 days",
      ].includes(displayMode) ? (
        <DaysView numbersOfDay={getNumbersOfDay(displayMode)} />
      ) : ["Month", "2 weeks", "3 weeks", "4 weeks"].includes(displayMode) ? (
        <WeekView numbersOfWeek={getNumbersOfWeek(displayMode)} />
      ) : displayMode === "Year" ? (
        <YearView />
      ) : (
        <PlanningView />
      )}
    </div>
  );
};
