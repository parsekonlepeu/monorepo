import * as React from "react";
import { OnChangeDatePicker } from "@parsekonlepeu/picker";
import {
  changeSelectedDateDiary,
  changeSelectedDateInitPicker,
} from "../store/slices/generalSlice";
import { useAppDispatch, useAppSelector } from "../utils/hooks/hooksTypedRedux";

export const useYearViewLogic = () => {
  const selectedDateDiary = useAppSelector(
    (state) => state.general.selectedDateDiary
  );

  const dispatch = useAppDispatch();
  const handleChange: OnChangeDatePicker = React.useCallback((e, data) => {
    dispatch(changeSelectedDateDiary(data.selectedDate));
    dispatch(changeSelectedDateInitPicker(data.selectedDate));
    setIndexClick((prev) => {
      return {
        next: data.selectedDate.month,
        previous: prev.next,
      };
    });
  }, []);
  const [indexClick, setIndexClick] = React.useState({
    previous: selectedDateDiary.month,
    next: selectedDateDiary.month,
  });
  React.useEffect(() => {
    setIndexClick({
      previous: selectedDateDiary.month,
      next: selectedDateDiary.month,
    });
  }, [selectedDateDiary.year]);
  return {
    handleChange: handleChange,
    indexClick: indexClick,
    selectedDateDiary: selectedDateDiary,
  };
};
