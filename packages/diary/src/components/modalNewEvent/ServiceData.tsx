import { css } from "@emotion/react";
import * as React from "react";
import { ChoiceDateHourEvent } from "./ChoiceDateHourEvent";

const serviceDataCss = {
  mainContenair: css({
    display: "flex",
  }),
};

export const ServiceData: React.FC = () => {
  return (
    <div css={serviceDataCss.mainContenair}>
      <ChoiceDateHourEvent />
    </div>
  );
};
