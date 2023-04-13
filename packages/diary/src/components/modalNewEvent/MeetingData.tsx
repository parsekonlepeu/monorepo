import { css } from "@emotion/react";
import * as React from "react";
import { AddDescription } from "./AddDescription";
import { AddPlace } from "./AddPlace";
import { ChoiceDateHourEvent } from "./ChoiceDateHourEvent";
import { ChoiceDiary } from "./ChoiceDiary";

const meetingData = {
  mainContenair: css({
    display: "flex",
    flexDirection: "column",
  }),
};

export const MeetingData: React.FC = () => {
  return (
    <div css={meetingData.mainContenair}>
      <ChoiceDateHourEvent />
      <AddPlace />
      <AddDescription />
      <ChoiceDiary />
    </div>
  );
};
