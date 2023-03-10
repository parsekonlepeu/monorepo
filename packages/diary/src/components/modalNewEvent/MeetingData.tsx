import { css } from "@emotion/react";
import * as React from "react";
import { ChoiceDateHourEvent } from "./ChoiceDateHourEvent";

const meetingData = {
  mainContenair: css({
    display: "flex",
  }),
};

export const MeetingData: React.FC = () => {
  return (
    <div css={meetingData.mainContenair}>
      <ChoiceDateHourEvent />
    </div>
  );
};
