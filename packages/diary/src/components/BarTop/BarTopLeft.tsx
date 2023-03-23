import * as React from "react";
import { Button, IconButton } from "@mui/material";
import {
  NavigateBeforeRounded,
  NavigateNextRounded,
  KeyboardBackspaceRounded,
} from "@mui/icons-material";
import { DateTime } from "luxon";
import { DateBarTop } from "./DateBarTop";
import grey from "@mui/material/colors/grey";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import { MultipleDates, SelectedDate } from "../../types";
import {
  changeDisplayMode,
  changeMultipleDatesDiary,
  changeMultipleDatesInitPicker,
  changeSelectedDateDiary,
  changeSelectedDateInitPicker,
} from "../../store/slices/generalSlice";
import { SxProps } from "@mui/material";
import { WithPopper } from "../withPopper/WithPopper";
import { useTextPopover } from "../../utils/hooks/useTextPopover";
import { css } from "@emotion/react";
import { getDiffMultipleDate } from "../../utils/functions/getDiffMultipleDate";

const styleTodayButton: SxProps = {
  textTransform: "none",
  fontWeight: 700,
  fontSize: "11px",
  p: "5px",
  px: "10px",
  marginRight: "15px",
};

const styleArrow: SxProps = {
  height: "25px",
  width: "25px",
};

const styleButtonArrow: SxProps = {
  height: "40px",
  width: "40px",
};

const barTopLeftCss = {
  mainContenair: css({
    display: "flex",
    alignItems: "center",
    height: "100%",
    fontFamily: "Open Sans, sans-serif",
  }),
};

interface BarTopLeftProps {
  image?: string;
  title?: string;
}

export const BarTopLeft: React.FC<BarTopLeftProps> = ({ image, title }) => {
  const displayMode = useAppSelector((state) => state.general.displayMode);
  const selectedDateDiary = useAppSelector(
    (state) => state.general.selectedDateDiary
  );
  const multipleDatesDiary = useAppSelector(
    (state) => state.general.multipleDatesDiary
  );

  const dispatch = useAppDispatch();

  const forPoppers = useTextPopover(displayMode);

  const handleClickToday = React.useCallback(() => {
    const newSelectedDateDiary: SelectedDate = DateTime.now().toObject();
    dispatch(changeSelectedDateDiary(newSelectedDateDiary));
    dispatch(changeMultipleDatesDiary(null));
    dispatch(changeSelectedDateInitPicker(newSelectedDateDiary));
    dispatch(changeMultipleDatesInitPicker(null));
    dispatch(changeDisplayMode("Day"));
  }, []);

  const handleClickNext = React.useCallback(() => {
    const dt = DateTime.fromObject(selectedDateDiary);

    if (multipleDatesDiary) {
      if (["2 weeks", "3 weeks", "4 weeks"].includes(displayMode)) {
        const nbWeek = parseInt(displayMode[0], 10);
        const daysAdd = nbWeek * 7;
        const diff = (nbWeek - 1) * 7;
        const dtStart = dt.plus({ days: daysAdd });
        const dtEnd = dtStart.plus({ days: diff });
        const newSelectedDateDiary: SelectedDate = dtStart.toObject();
        handleMultDatDays(
          {
            start: dtStart.toObject(),
            end: dtEnd.toObject(),
          },
          newSelectedDateDiary,
          selectedDateDiary
        );
      } else {
        const diff = getDiffMultipleDate(
          multipleDatesDiary.start,
          multipleDatesDiary.end
        );
        const dtEnd = dt.plus({ days: diff });
        const dtStartNext = dt.plus({ days: diff + 1 });
        const dtEndNext = dtEnd.plus({ days: diff + 1 });
        const newSelectedDateDiary: SelectedDate = dtStartNext.toObject();
        handleMultDatDays(
          {
            start: dtStartNext.toObject(),
            end: dtEndNext.toObject(),
          },
          newSelectedDateDiary,
          selectedDateDiary
        );
      }
    } else {
      if (displayMode === "Day" || displayMode === "Planning") {
        const dtPlus = dt.plus({ days: 1 });
        const newSelectedDateDiary: SelectedDate = dtPlus.toObject();
        handleWithoutMultDatDay(newSelectedDateDiary);
      } else if (displayMode === "Week") {
        const dtStartNext = dt.plus({ days: 7 });
        const newSelectedDateDiary: SelectedDate = dtStartNext.toObject();
        handleWithoutMultDatDay(newSelectedDateDiary);
      } else if (displayMode === "Month") {
        const dtStartNext = dt.plus({ month: 1 }).set({
          day: 1,
        });
        const newSelectedDateDiary: SelectedDate = dtStartNext.toObject();
        handleWithoutMultDatDay(newSelectedDateDiary);
      } else if (displayMode === "Year") {
        const dtStartNext = dt.plus({ year: 1 }).set({
          day: 1,
          month: 1,
        });
        const newSelectedDateDiary: SelectedDate = dtStartNext.toObject();
        handleWithoutMultDatDay(newSelectedDateDiary);
      }
    }
  }, [selectedDateDiary, multipleDatesDiary, displayMode]);

  const handleClickPrevious = React.useCallback(() => {
    const dt = DateTime.fromObject(selectedDateDiary);
    if (multipleDatesDiary) {
      if (["2 weeks", "3 weeks", "4 weeks"].includes(displayMode)) {
        const nbWeek = parseInt(displayMode[0]);
        const daysAdd = nbWeek * 7;
        const diff = (nbWeek - 1) * 7;
        const dtStart = dt.minus({ days: daysAdd });
        const dtEnd = dtStart.plus({ days: diff });
        const newSelectedDateDiary: SelectedDate = dtStart.toObject();
        handleMultDatDays(
          {
            start: dtStart.toObject(),
            end: dtEnd.toObject(),
          },
          newSelectedDateDiary,
          selectedDateDiary
        );
      } else {
        const diff = getDiffMultipleDate(
          multipleDatesDiary.start,
          multipleDatesDiary.end
        );
        const dtEnd = dt.plus({ days: diff });
        const dtMinusStart = dt.minus({ days: diff + 1 });
        const dtMinusEnd = dtEnd.minus({ days: diff + 1 });
        const newSelectedDateDiary: SelectedDate = dtMinusStart.toObject();
        handleMultDatDays(
          {
            start: dtMinusStart.toObject(),
            end: dtMinusEnd.toObject(),
          },
          newSelectedDateDiary,
          selectedDateDiary
        );
      }
    } else {
      if (displayMode === "Day" || displayMode === "Planning") {
        const dtPlus = dt.minus({ days: 1 });
        const newSelectedDateDiary: SelectedDate = dtPlus.toObject();
        handleWithoutMultDatDay(newSelectedDateDiary);
      } else if (displayMode === "Week") {
        const dtStartNext = dt.minus({ days: 7 });
        const newSelectedDateDiary: SelectedDate = dtStartNext.toObject();
        handleWithoutMultDatDay(newSelectedDateDiary);
      } else if (displayMode === "Month") {
        const dtStartNext = dt.minus({ month: 1 }).set({
          day: 1,
        });
        const newSelectedDateDiary: SelectedDate = dtStartNext.toObject();
        handleWithoutMultDatDay(newSelectedDateDiary);
      } else if (displayMode === "Year") {
        const dtStartNext = dt.minus({ year: 1 }).set({
          day: 1,
          month: 1,
        });
        const newSelectedDateDiary: SelectedDate = dtStartNext.toObject();
        handleWithoutMultDatDay(newSelectedDateDiary);
      }
    }
  }, [selectedDateDiary, multipleDatesDiary, displayMode]);

  const handleWithoutMultDatDay = React.useCallback(
    (newSelectedDateDiary: SelectedDate) => {
      dispatch(changeSelectedDateDiary(newSelectedDateDiary));
      dispatch(changeMultipleDatesDiary(null));
      dispatch(changeSelectedDateInitPicker(newSelectedDateDiary));
      dispatch(changeMultipleDatesInitPicker(null));
    },
    []
  );

  const handleMultDatDays = React.useCallback(
    (
      multipleDatesDiary: MultipleDates,
      newSelectedDateDiary: SelectedDate,
      selectedDateDiary: SelectedDate
    ) => {
      dispatch(changeSelectedDateDiary(newSelectedDateDiary));
      dispatch(changeMultipleDatesDiary(multipleDatesDiary));
      dispatch(changeSelectedDateInitPicker(newSelectedDateDiary));
      dispatch(changeMultipleDatesInitPicker(multipleDatesDiary));
    },
    []
  );

  return (
    <div css={barTopLeftCss.mainContenair}>
      <IconButton
        aria-label="back"
        size="small"
        sx={{
          ml: "5px",
          mr: "10px",
          ...styleButtonArrow,
          color: "black",
        }}
      >
        <KeyboardBackspaceRounded
          fontSize="small"
          sx={styleArrow}
        />
      </IconButton>
      <WithPopper
        textDisplay={forPoppers.forTodayPopper}
        top="40px"
      >
        <Button
          sx={{
            ...styleTodayButton,
            color: grey[800],
            borderColor: grey[400],
            fontSize: "10px",
          }}
          variant="outlined"
          onClick={handleClickToday}
        >
          Aujourd'hui
        </Button>
      </WithPopper>
      <WithPopper
        textDisplay={forPoppers.forPreviousPopper}
        top="40px"
      >
        <IconButton
          aria-label="back"
          size="small"
          sx={{
            ...styleButtonArrow,
            mr: "5px",
          }}
          onClick={handleClickPrevious}
        >
          <NavigateBeforeRounded
            fontSize="small"
            sx={styleArrow}
          />
        </IconButton>
      </WithPopper>
      <WithPopper
        textDisplay={forPoppers.forNextPopper}
        top="40px"
      >
        <IconButton
          aria-label="next"
          size="small"
          sx={{
            ...styleButtonArrow,
            mr: "15px",
          }}
          onClick={handleClickNext}
        >
          <NavigateNextRounded
            fontSize="small"
            sx={styleArrow}
          />
        </IconButton>
      </WithPopper>
      <DateBarTop />
    </div>
  );
};
