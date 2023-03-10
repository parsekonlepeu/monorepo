import * as React from "react";
import { css } from "@emotion/react";
import {
  DatePicker,
  OnChangeDatePicker,
  SelectedDate,
} from "@parsekonlepeu/picker";
import { DateTime } from "luxon";
import {
  changeDisplayMode,
  changeMultipleDatesDiary,
  changeMultipleDatesInitPicker,
  changeSelectedDateDiary,
  changeSelectedDateInitPicker,
} from "../../../store/slices/generalSlice";
import { getDisplayModeFromMultipleDate } from "../../../utils/functions/getDisplayModeFromMultipleDate";
import { useYearViewLogic } from "../../../hooks/useYearViewlogic";

const yearViewCss = {
  mainContenair: css({
    position: "absolute",
    left: "0px",
    right: "0px",
    top: "0px",
    bottom: "0px",
  }),
  subContenair: css({
    // flex: 1,
    paddingTop: "15px",
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    overflowY: "scroll",
    paddingLeft: "40px",
    justifyContent: "space-between",
    paddingRight: "32px",
  }),
  pickerContenair: css({
    width: "25%",
    minWidth: "224px",
    height: "252px",
  }),
};

export const YearView: React.FC = () => {
  const { handleChange, indexClick, selectedDateDiary } = useYearViewLogic();

  return (
    <div css={yearViewCss.mainContenair}>
      <div css={yearViewCss.subContenair}>
        {new Array(12).fill(null).map((item, index) => {
          return (
            <PickerMemo
              selectedDateDiary={selectedDateDiary}
              index={index + 1}
              handleChange={handleChange}
              indexClick={indexClick}
            />
          );
        })}
      </div>
    </div>
  );
};

type PickerProps = {
  selectedDateDiary: SelectedDate;
  index: number;
  handleChange: OnChangeDatePicker;
  indexClick: {
    previous: number;
    next: number;
  };
};

const Picker: React.FC<PickerProps> = ({
  selectedDateDiary,
  index,
  handleChange,
  indexClick,
}) => {
  return (
    <div css={yearViewCss.pickerContenair}>
      <DatePicker
        selectedDate={selectedDateDiary}
        canSwipe={false}
        canSelectPeriod={false}
        verticalGap={6}
        horizontalGap={6}
        month={index}
        year={selectedDateDiary.year}
        onChange={handleChange}
        caseSize={24}
        displayYear={false}
      />
    </div>
  );
};

const PickerMemo = React.memo(Picker, (prevProps, nextProps) => {
  return !(
    nextProps.indexClick.next === nextProps.index ||
    nextProps.indexClick.previous === nextProps.index ||
    nextProps.selectedDateDiary.year !== prevProps.selectedDateDiary.year
  );
});
