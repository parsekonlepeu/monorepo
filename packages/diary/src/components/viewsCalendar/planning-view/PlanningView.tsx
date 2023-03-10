import * as React from "react";
import { css } from "@emotion/react";
import { useAppSelector } from "../../../utils/hooks/hooksTypedRedux";

const plannigViewCss = {
  mainContenair: css({
    flex: 1,
  }),
};

export const PlanningView: React.FC = () => {
  const { displayMode } = useAppSelector((state) => state.general);

  return (
    <div css={plannigViewCss.mainContenair}>
      <p>plannig view</p>
    </div>
  );
};
