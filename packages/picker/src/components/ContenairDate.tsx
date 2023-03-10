import React, {
  useState,
  FC,
  useCallback,
  MouseEvent,
  useContext,
} from "react";
import { DateTime } from "luxon";
import { ContenairDateProps, DatepickerProps } from "../types";
import { usePickerDispatch, usePickerSelector } from "../store/hooksTypedRedux";
import { ContextOption } from "../context/ContextOption";
import {
  changeFlowSelected,
  changeMonthYearPicker,
  changeMultipleDatePicker,
  changeSelectedDatePicker,
} from "../store/pickerSlice";
import { formatMultipleDate } from "../utils/formatMultipleDate";
import { getDateStartRow } from "../utils/getDateStartRow";
import useLongPress from "../hooks/useLongPress";
import { isInMultipleDate } from "../utils/isInMultipleDate";
import { css } from "@emotion/react";

const DateContenairCss = {
  mainContenaire: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  subContenair: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "20px",
    width: "20px",
    borderRadius: "20px",
    zIndex: 10,
    cursor: "pointer",
    userSelect: "none",
    "&:hover": {
      backgroundColor: "red",
    },
  }),
  span: css({
    position: "absolute",
    borderRadius: "20px",
    zIndex: 0,
  }),
  text: css({
    fontWeight: 500,
    zIndex: 100,
  }),
};

export const ContenairDate: FC<ContenairDateProps> = ({
  date,
  refMultipleDate,
  refSelectedDatePicker,
  refFlowSelected,
}) => {
  const dispatch = usePickerDispatch();

  const monthPicker = usePickerSelector((state) => state.picker.monthPicker);
  const yearPicker = usePickerSelector((state) => state.picker.yearPicker);
  const multipleDates = usePickerSelector(
    (state) => state.picker.multipleDates
  );
  const selectedDatePicker = usePickerSelector(
    (state) => state.picker.selectedDatePicker
  );

  const {
    firstDay,
    caseSize,
    canSelectPeriod,
    onChange,
    colors,
    canSwipe,
    numberSize,
  } = useContext(ContextOption) as DatepickerProps;

  const [isIn, setIsIn] = useState<boolean>(false);

  const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsIn(true);
    if (refFlowSelected.current) {
      const selectedDatePickerDt = DateTime.fromObject(
        refSelectedDatePicker.current
      );
      const diff = date.diff(selectedDatePickerDt, "minutes").toObject()
        .minutes as number;
      if (diff > 0) {
        dispatch(
          changeMultipleDatePicker({
            newMultipleDates: {
              start: refSelectedDatePicker.current,
              end: date.toObject(),
            },
            firstDayWeek: firstDay,
          })
        );
        const ref = formatMultipleDate(
          {
            start: refSelectedDatePicker.current,
            end: date.toObject(),
          },
          firstDay
        );
        refMultipleDate.current = ref;
      } else if (diff === 0) {
        const multDate = {
          start: date.toObject(),
          end: date.plus({ days: 1 }).toObject(),
        };
        dispatch(
          changeMultipleDatePicker({
            newMultipleDates: multDate,
            firstDayWeek: firstDay,
          })
        );
        refMultipleDate.current = multDate;
      } else {
        dispatch(
          changeMultipleDatePicker({
            newMultipleDates: {
              start: date.toObject(),
              end: refSelectedDatePicker.current,
            },
            firstDayWeek: firstDay,
          })
        );
        const ref = formatMultipleDate(
          {
            start: date.toObject(),
            end: refSelectedDatePicker.current,
          },
          firstDay
        );
        refMultipleDate.current = ref;
      }
    }
  };

  const handleMouseLeave = useCallback(() => {
    setIsIn(false);
  }, []);

  const handleClick = useCallback(
    (e: globalThis.MouseEvent) => {
      dispatch(changeSelectedDatePicker(date.toObject()));
      dispatch(changeFlowSelected(false));
      refFlowSelected.current = false;
      let resetMultipleDate = false;
      if (
        (date.month !== refSelectedDatePicker.current.month ||
          date.year !== refSelectedDatePicker.current.year) &&
        canSwipe
      ) {
        dispatch(
          changeMonthYearPicker({
            month: date.month,
            year: date.year,
          })
        );
      }
      if (refMultipleDate.current) {
        const startDt = DateTime.fromObject(refMultipleDate.current.start);
        const endDt = DateTime.fromObject(refMultipleDate.current.end);
        if (
          date.day === refSelectedDatePicker.current.day &&
          date.month === refSelectedDatePicker.current.month &&
          date.year === refSelectedDatePicker.current.year
        ) {
          resetMultipleDate = true;
          dispatch(
            changeMultipleDatePicker({
              newMultipleDates: null,
              firstDayWeek: firstDay,
            })
          );
          refSelectedDatePicker.current = date.toObject();
          refMultipleDate.current = null;
        } else {
          const diff = Math.floor(
            endDt.diff(startDt, "days").toObject().days as number
          );
          if (diff <= 7) {
            const newMultipleDates = {
              start: date.toObject(),
              end: date.plus({ days: diff }).toObject(),
            };
            dispatch(
              changeMultipleDatePicker({
                newMultipleDates: newMultipleDates,
                firstDayWeek: firstDay,
              })
            );
            refSelectedDatePicker.current = date.toObject();
            refMultipleDate.current = newMultipleDates;
          } else if (diff > 7 && diff <= 28) {
            const start = DateTime.fromObject(refMultipleDate.current.start);
            const end = DateTime.fromObject(refMultipleDate.current.end);
            const diff = end.diff(start, "days").toObject().days as number;
            const newStart = getDateStartRow(date, firstDay);
            const newMultipleDates = {
              start: newStart.toObject(),
              end: newStart.plus({ days: diff }).toObject(),
            };
            dispatch(
              changeMultipleDatePicker({
                newMultipleDates: newMultipleDates,
                firstDayWeek: firstDay,
              })
            );
            refSelectedDatePicker.current = newStart.toObject();
            refMultipleDate.current = newMultipleDates;
          }
        }
      } else {
        dispatch(
          changeMultipleDatePicker({
            newMultipleDates: null,
            firstDayWeek: firstDay,
          })
        );
        refSelectedDatePicker.current = date.toObject();
        refMultipleDate.current = null;
      }
      onChange(e, {
        multipleDate: refMultipleDate.current,
        selectedDate: refSelectedDatePicker.current,
        resetMultipleDate: resetMultipleDate,
      });
    },
    [date, refSelectedDatePicker.current, refMultipleDate.current, firstDay]
  );

  const handleLongPress = () => {
    dispatch(changeFlowSelected(true));
    refFlowSelected.current = true;
    dispatch(changeSelectedDatePicker(date.toObject()));
    refSelectedDatePicker.current = date.toObject();
  };

  const handleQuitLongPress = (e: globalThis.MouseEvent) => {
    dispatch(changeSelectedDatePicker(date.toObject()));
    refSelectedDatePicker.current = date.toObject();
    dispatch(
      changeMultipleDatePicker({
        newMultipleDates: refMultipleDate.current,
        firstDayWeek: firstDay,
      })
    );
    dispatch(changeFlowSelected(false));
    refFlowSelected.current = false;
    onChange(e, {
      multipleDate: refMultipleDate.current,
      selectedDate: refSelectedDatePicker.current,
      resetMultipleDate: false,
    });
  };

  let longPress;

  canSelectPeriod
    ? (longPress = useLongPress(
        handleLongPress,
        handleClick,
        handleQuitLongPress,
        500
      ))
    : (longPress = {
        onMouseDown:
          handleClick as unknown as React.MouseEventHandler<HTMLDivElement>,
      });

  const isToday =
    DateTime.now().day === date.day &&
    DateTime.now().month === date.month &&
    DateTime.now().year === date.year;

  const isDateSelected =
    selectedDatePicker.day === date.day &&
    selectedDatePicker.month === date.month &&
    selectedDatePicker.year === date.year;

  const isInCurrentMonth =
    date.month === monthPicker && date.year === yearPicker;

  return (
    <div
      css={DateContenairCss.mainContenaire}
      style={{
        width: caseSize + "px",
        height: caseSize + "px",
      }}
      {...longPress}
      onMouseEnter={handleMouseEnter as React.MouseEventHandler<HTMLDivElement>}
      onMouseLeave={handleMouseLeave as React.MouseEventHandler<HTMLDivElement>}
    >
      <div
        css={DateContenairCss.subContenair}
        style={{
          backgroundColor:
            isToday && isInCurrentMonth
              ? colors.currentDay
              : isDateSelected && !multipleDates && isInCurrentMonth
              ? colors.selectedDay
              : "transparent",
          width: caseSize / 2 + 10 + "px",
          height: caseSize / 2 + 10 + "px",
        }}
      >
        {isIn && !isDateSelected && !isToday ? (
          <span
            css={DateContenairCss.span}
            style={{
              width: caseSize / 2 + 10 + "px",
              height: caseSize / 2 + 10 + "px",
              backgroundColor:
                multipleDates && isInMultipleDate(multipleDates, date)
                  ? colors.hoverSelectedDay
                  : colors.hoverSelectedDay,
            }}
          />
        ) : null}
        <p
          css={DateContenairCss.text}
          style={{
            color: isToday
              ? colors.textCurrentDay
              : isDateSelected ||
                (multipleDates && isInMultipleDate(multipleDates, date))
              ? colors.textSelectedDay
              : isInCurrentMonth
              ? colors.textBase
              : colors.textDisableDay,
            fontSize: numberSize + "px",
          }}
        >
          {date.day}
        </p>
      </div>
    </div>
  );
};
