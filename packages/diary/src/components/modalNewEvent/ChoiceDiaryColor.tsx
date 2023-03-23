import * as React from "react";
import { Popover, useTheme } from "@mui/material";
import { modifEventTempDiary } from "../../store/slices/diarysSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import { SelectColor } from "../selectColor/SelectColor";
import { ArrowDropDownRounded } from "@mui/icons-material";
import { css } from "@emotion/react";

const choiceDiaryColorCss = {
  mainContenair: css({
    display: "flex",
    flexDirection: "row",
    height: "2.5rem",
    paddingLeft: "1rem",
    paddingRight: "0.8rem",
    borderRadius: "5px",
    marginTop: "10px",
    marginBottom: "10px",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "20px",
    cursor: "pointer",
  }),
  circleColor: css({
    width: "20px",
    height: "20px",
    borderRadius: "20px",
  }),
  popoverContenair: css({
    display: "flex",
    flexDirection: "column",
  }),
};

export const ChoiceDiaryColor: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const refChoiceColor = React.useRef<HTMLDivElement>(null);
  const eventTemp = useAppSelector((state) => state.diarys.eventTemp);
  const [popChoiceColor, setPopChoiceColor] = React.useState<boolean>(false);

  const handleClickChoiceColor = React.useCallback(() => {
    setPopChoiceColor(true);
  }, []);

  const handleCloseChoiceColor = React.useCallback(() => {
    setPopChoiceColor(false);
  }, []);

  const handleClickColor: React.MouseEventHandler<HTMLDivElement> =
    React.useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = e.currentTarget.id;
      dispatch(
        modifEventTempDiary({
          keys: ["color"],
          values: [id],
        })
      );
      setPopChoiceColor(false);
    }, []);

  if (eventTemp) {
    return (
      <>
        <div
          css={[
            choiceDiaryColorCss.mainContenair,
            {
              "&:hover": {
                backgroundColor: theme.google.textfieldSurface,
              },
            },
          ]}
          ref={refChoiceColor}
          onClick={handleClickChoiceColor}
        >
          <div
            css={[
              choiceDiaryColorCss.circleColor,
              {
                backgroundColor: eventTemp.color,
              },
            ]}
          />
          <ArrowDropDownRounded />
        </div>
        <Popover
          open={popChoiceColor}
          anchorEl={refChoiceColor.current}
          onClose={handleCloseChoiceColor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div css={choiceDiaryColorCss.popoverContenair}>
            <SelectColor
              currentColor={eventTemp.color}
              canSelectColorPerso={false}
              onClickColor={handleClickColor}
            />
          </div>
        </Popover>
      </>
    );
  } else {
    return null;
  }
};
