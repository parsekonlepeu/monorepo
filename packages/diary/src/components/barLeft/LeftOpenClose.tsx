import * as React from "react";
import { DehazeRounded } from "@mui/icons-material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import { css } from "@emotion/react";
import { HEIGHT_TOP } from "../../utils/constants";
import { useHover } from "../../utils/hooks/useHover";
import { useTheme } from "@mui/material";
import { changeLeftExtend } from "../../store/slices/generalSlice";

const leftopenCloseCss = {
  mainContenair: css({
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    left: "5px",
    top: `${HEIGHT_TOP + 5}px`,
    marginRight: "15px",
    width: "40px",
    height: "40px",
    borderRadius: "40px",
    cursor: "pointer",
    zIndex: 90,
  }),
};

export const LeftOpenClose: React.FC = () => {
  const theme = useTheme();
  const leftExtend = useAppSelector((state) => state.general.leftExtend);

  const dispatch = useAppDispatch();

  const { onHover, hover } = useHover();

  const handleClickOpenClose = React.useCallback(() => {
    dispatch(changeLeftExtend(!leftExtend));
  }, [leftExtend]);

  return (
    <div
      css={leftopenCloseCss.mainContenair}
      style={{
        backgroundColor: hover
          ? theme.google.hairlineHover
          : theme.google.surface,
      }}
      onClick={handleClickOpenClose}
      {...onHover}
    >
      <DehazeRounded
        sx={{
          fontSize: "25px",
        }}
      />
    </div>
  );
};
