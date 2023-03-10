import { css } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as React from "react";
import { useAddHoverCss } from "../../hooks/useAddHoverCss";
import {
  changeDisplayMode,
  changeMultipleDatesDiary,
  changeMultipleDatesInitPicker,
  changeSelectedDateInitPicker,
} from "../../store/slices/generalSlice";
import { DisplayMode } from "../../types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";

const modeCss = {
  mainContenair: css({
    padding: "8px",
    width: "200px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "13px",
    fontWeight: 500,
    "& p": {
      margin: "0px",
    },
  }),
};

export const Mode: React.FC = () => {
  const theme = useTheme();
  const customizeView = useAppSelector((state) => state.options.customizeView);
  const firstDayWeek = useAppSelector((state) => state.options.firstDayWeek);
  const selectedDateDiary = useAppSelector(
    (state) => state.general.selectedDateDiary
  );

  const dispatch = useAppDispatch();

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      dispatch(changeDisplayMode(e.currentTarget.id as DisplayMode));
      dispatch(changeMultipleDatesDiary(null));
      dispatch(changeMultipleDatesInitPicker(null));
      dispatch(changeSelectedDateInitPicker(selectedDateDiary));
    },
    [selectedDateDiary, firstDayWeek]
  );

  const withHoverCss = useAddHoverCss(
    theme.google.textfieldSurface,
    modeCss.mainContenair
  );

  return (
    <div>
      <div
        css={[
          ...withHoverCss,
          {
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
          },
        ]}
        id="Day"
        onClick={handleClick}
      >
        <p>Jour</p>
        <p>D</p>
      </div>
      <div css={withHoverCss} id="Week" onClick={handleClick}>
        <p>Semaine</p>
        <p>W</p>
      </div>
      <div css={withHoverCss} id="Month" onClick={handleClick}>
        <p>Mois</p>
        <p>M</p>
      </div>
      <div css={withHoverCss} id="Year" onClick={handleClick}>
        <p>Année</p>
        <p>Y</p>
      </div>
      <div css={withHoverCss} id="Planning" onClick={handleClick}>
        <p>Planning</p>
        <p>A</p>
      </div>
      <div
        css={[
          ...withHoverCss,
          {
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
          },
        ]}
        id={customizeView}
        onClick={handleClick}
      >
        <p>{customizeView}</p>
        <p>X</p>
      </div>
    </div>
  );
};
