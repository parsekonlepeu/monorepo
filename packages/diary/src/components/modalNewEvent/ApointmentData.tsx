import * as React from "react";
import { css } from "@emotion/react";
import { ChoiceDateHourEvent } from "./ChoiceDateHourEvent";
import { AddPlace } from "./AddPlace";
import { AddDescription } from "./AddDescription";
import { ChoiceDiary } from "./ChoiceDiary";

const apointmentDataCss = {
  mainContenair: css({
    display: "flex",
    flexDirection: "column",
  }),
};

export const ApointmentData: React.FC = () => {
  return (
    <div css={apointmentDataCss.mainContenair}>
      <ChoiceDateHourEvent
        withoutSelectAllDay
        withoutDateEnd
      />
      <AddPlace />
      <AddDescription />
      <ChoiceDiary />
    </div>
  );
};
