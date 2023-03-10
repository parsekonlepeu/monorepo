import * as React from "react";
import { css } from "@emotion/react";
import { ChoiceDateHourEvent } from "./ChoiceDateHourEvent";

const apointmentDataCss = {
  mainContenair: css({
    display: "flex",
  }),
};

export const ApointmentData: React.FC = () => {
  return (
    <div css={apointmentDataCss.mainContenair}>
      <ChoiceDateHourEvent />
    </div>
  );
};
