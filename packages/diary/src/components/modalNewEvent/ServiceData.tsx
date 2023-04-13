import { css } from "@emotion/react";
import * as React from "react";
import { checkOverlap } from "../../utils/functions/checkOverlap";
import { useAppSelector } from "../../utils/hooks/hooksTypedRedux";
import { AddBookerName } from "./AddBookerName";
import { AddDescription } from "./AddDescription";
import { AddPlace } from "./AddPlace";
import { ChoiceDateHourEvent } from "./ChoiceDateHourEvent";
import { ChoiceDiary } from "./ChoiceDiary";
import { ChoiceService } from "./ChoiceService";

const serviceDataCss = {
  mainContenair: css({
    display: "flex",
    flexDirection: "column",
  }),
};

export const ServiceData: React.FC = () => {
  const eventTemp = useAppSelector((state) => state.diarys.eventTemp);
  const diarys = useAppSelector((state) => state.diarys.diarys);
  React.useEffect(() => {
    eventTemp && checkOverlap(eventTemp, diarys);
  }, [eventTemp?.service, eventTemp?.serviceCategory, eventTemp?.start]);
  return (
    <div css={serviceDataCss.mainContenair}>
      <ChoiceService />
      <ChoiceDateHourEvent
        withoutSelectAllDay
        withoutDateEnd
      />
      <AddBookerName />
      <AddPlace />
      <ChoiceDiary />
    </div>
  );
};
