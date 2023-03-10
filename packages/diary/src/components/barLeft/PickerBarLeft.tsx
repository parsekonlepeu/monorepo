import * as React from "react";
import { useTheme } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import {
  changeDisplayMode,
  changeMultipleDatesDiary,
  changeMultipleDatesInitPicker,
  changeSelectedDateDiary,
} from "../../store/slices/generalSlice";
import { DatePicker, OnChangeDatePicker } from "@parsekonlepeu/picker";
import { getDisplayModeFromMultipleDate } from "../../utils/functions/getDisplayModeFromMultipleDate";

export const PickerBarLeft: React.FC = () => {
  const locale = useAppSelector((state) => state.options.locale);
  const firstDayWeek = useAppSelector((state) => state.options.firstDayWeek);
  const selectedDateInitPicker = useAppSelector(
    (state) => state.general.selectedDateInitPicker
  );
  const displayMode = useAppSelector((state) => state.general.displayMode);
  const multipleDatesInitPicker = useAppSelector(
    (state) => state.general.multipleDatesInitPicker
  );

  const theme = useTheme();

  const dispatch = useAppDispatch();

  const handleChange: OnChangeDatePicker = React.useCallback(
    (e, data) => {
      dispatch(changeSelectedDateDiary(data.selectedDate));
      dispatch(changeMultipleDatesDiary(data.multipleDate));
      if (data.multipleDate) {
        const newDisplayMode = getDisplayModeFromMultipleDate(
          data.multipleDate
        );
        dispatch(changeDisplayMode(newDisplayMode));
        if (multipleDatesInitPicker === null) {
          dispatch(changeMultipleDatesInitPicker(data.multipleDate));
        }
      } else if (!data.multipleDate && data.resetMultipleDate) {
        dispatch(changeDisplayMode("Day"));
      }
    },
    [displayMode, multipleDatesInitPicker]
  );

  return (
    <DatePicker
      selectedDate={selectedDateInitPicker}
      multipleDates={multipleDatesInitPicker}
      firstDay={firstDayWeek}
      locale={locale}
      // colors={{
      //   currentDay: theme.google.primary,
      //   selectedDay: theme.google.secondary,
      //   hover: theme.google.fabHover,
      // }}
      displayYear={true}
      canSelectPeriod={true}
      canSwipe={true}
      caseSize={24}
      numberSize={10}
      onChange={handleChange}
    />
  );
};
