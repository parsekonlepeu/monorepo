import * as React from "react";
import { css } from "@emotion/react";
import { CustomPickerColor } from "./CustomPickerColor";

const modalChoiceColorCss = {
  mainContenair: css({
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }),
};

export const ModalChoiceColor = React.forwardRef<HTMLDivElement>(
  (props, ref) => {
    return (
      <div css={modalChoiceColorCss.mainContenair} ref={ref}>
        <CustomPickerColor color="red" />
      </div>
    );
  }
);
