import { css } from "@emotion/react";
import * as React from "react";
import { useAppSelector } from "../../utils/hooks/hooksTypedRedux";
import { ModalNewEvent } from "./ModalNewEvent";

const contenairModalNewEventCss = {
  mainContenair: css({
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  }),
};

export const ContenairModalnewEvent: React.FC = () => {
  const { modalNewEvent, posModalNewEvent } = useAppSelector(
    (state) => state.diarys
  );

  if (modalNewEvent) {
    return (
      <div css={contenairModalNewEventCss.mainContenair}>
        <ModalNewEvent posModal={posModalNewEvent} />
      </div>
    );
  } else {
    return null;
  }
};
