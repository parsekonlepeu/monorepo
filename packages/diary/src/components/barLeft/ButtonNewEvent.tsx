import * as React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useTheme } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import { changeLeftExtend } from "../../store/slices/generalSlice";
import { css } from "@emotion/react";
import { HEIGHT_TOP } from "../../utils/constants";

const buttonNewEventCss = {
  mainContenair: css({
    boxShadow: `1px 1px 1px grey`,
    border: `solid 1px grey`,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    left: "50px",
    top: `${HEIGHT_TOP + 5}px`,
    minWidth: "40px",
    maxHeight: "40px",
    height: "40px",
    borderRadius: "40px",
    cursor: "pointer",
    zIndex: 90,
    transition: "3",
    "&:hover": {
      boxShadow: `4px 4px 4px grey`,
      backgroundColor: "grey",
    },
  }),
};

export const ButtonNewEvent: React.FC = () => {
  const leftExtend = useAppSelector((state) => state.general.leftExtend);

  const dispatch = useAppDispatch();

  const theme = useTheme();

  const handleClickOpenClose = React.useCallback(() => {
    dispatch(changeLeftExtend(!leftExtend));
  }, [leftExtend]);

  return (
    <div css={buttonNewEventCss.mainContenair} onClick={handleClickOpenClose}>
      <AddRoundedIcon
        sx={{
          fontSize: "30px",
          color: theme.google.primary,
        }}
      />
    </div>
  );
};
