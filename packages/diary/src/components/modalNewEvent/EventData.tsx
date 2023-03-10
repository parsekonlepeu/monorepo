import * as React from "react";
import { ChoiceDateHourEvent } from "./ChoiceDateHourEvent";
import { Divider, SxProps } from "@mui/material";
import { AddPlace } from "./AddPlace";
import { AddDescription } from "./AddDescription";
import { ChoiceDiary } from "./ChoiceDiary";
import { css } from "@emotion/react";

const styleDivider: SxProps = {
  width: "50%",
  ml: "35px",
};

const eventDataCss = {
  mainContenair: css({
    display: "flex",
    flexDirection: "column",
  }),
};

export const EventData: React.FC = () => {
  return (
    <div css={eventDataCss.mainContenair}>
      <ChoiceDateHourEvent />
      <Divider sx={styleDivider} />
      <AddPlace />
      <Divider sx={styleDivider} />
      <AddDescription />
      <Divider sx={styleDivider} />
      <ChoiceDiary />
    </div>
  );
};
