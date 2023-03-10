import { useState, useEffect, FC, useMemo, useContext, useRef } from "react";
import { DateTime } from "luxon";
import { ContenairDate } from "../components/ContenairDate";
import { DisplayPeriod } from "./DisplayPeriod";
import { WithPopper } from "./WithPopper";
import { DatepickerProps, MultipleDates, Period, SelectedDate } from "../types";
import { usePickerSelector } from "../store/hooksTypedRedux";
import { ContextOption } from "../context/ContextOption";
import { getDates } from "@parsekonlepeu/sharedutils";
import { getDataDisplayPeriod } from "../utils/getDataDisplayPeriod";
import { getDayPicker } from "../utils/getDayPicker";
import { css } from "@emotion/react";

const MainDatePickerCss = {
  mainContenair: css({
    // display: "grid",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  }),
  daysDateContenair: css({
    // display: "grid",
    // gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    display: "flex",
    // columnGap: "20px",
    // rowGap: "20px",
    flexDirection: "row",
  }),
  caseDay: css({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  caseDayText: css({
    fontSize: "7px",
    fontWeight: 600,
  }),
};

export const MainDatePicker: FC = () => {
  const [arrayDates, setArrayDates] = useState<DateTime[][]>([]);
  const [dataDisplayPeriod, setDataDisplayPeriod] = useState<Period[]>([]);

  const monthPicker = usePickerSelector((state) => state.picker.monthPicker);
  const yearPicker = usePickerSelector((state) => state.picker.yearPicker);
  const MultipleDates = usePickerSelector(
    (state) => state.picker.multipleDates
  );
  const selectedDatePicker = usePickerSelector(
    (state) => state.picker.selectedDatePicker
  );

  const {
    firstDay,
    locale,
    caseSize,
    canSelectPeriod,
    colors,
    numberSize,
    horizontalGap,
    verticalGap,
  } = useContext(ContextOption) as DatepickerProps;

  const refMultipleDate = useRef<MultipleDates | null>(MultipleDates);
  const refSelectedDatePicker = useRef<SelectedDate>(selectedDatePicker);
  const refFlowSelected = useRef<boolean>(false);

  useEffect(() => {
    refMultipleDate.current = MultipleDates;
  }, [MultipleDates]);

  useEffect(() => {
    refSelectedDatePicker.current = selectedDatePicker;
  }, [selectedDatePicker]);

  useEffect(() => {
    const datesArray = getDates(firstDay, monthPicker, yearPicker);
    setArrayDates(datesArray);
  }, [firstDay, monthPicker, yearPicker]);

  useEffect(() => {
    if (canSelectPeriod) {
      const data = getDataDisplayPeriod(MultipleDates, arrayDates);
      setDataDisplayPeriod(data);
    }
  }, [MultipleDates, arrayDates]);

  const days: string[][] = useMemo(
    () => getDayPicker(locale, firstDay),
    [locale, firstDay]
  );

  return (
    <div css={MainDatePickerCss.mainContenair}>
      <div
        css={[
          MainDatePickerCss.daysDateContenair,
          {
            gap: horizontalGap + "px",
            marginBottom: verticalGap + "px",
          },
        ]}
      >
        {days.map((day, index) => (
          <WithPopper textDisplay={day[1]} top="20px" key={index.toString()}>
            <Day day={day} caseSize={caseSize} />
          </WithPopper>
        ))}
      </div>
      <div
        css={{
          display: "flex",
          // columnGap: "20px",
          // rowGap: "20px",
          gap: verticalGap + "px",
          flexDirection: "column",
        }}
      >
        {arrayDates.map((dates, index) => (
          <div
            css={[
              MainDatePickerCss.daysDateContenair,
              {
                gap: horizontalGap + "px",
              },
            ]}
            key={index.toString()}
          >
            {dates.map((date, index) => {
              return (
                <ContenairDate
                  key={index.toString()}
                  date={date}
                  refMultipleDate={refMultipleDate}
                  refSelectedDatePicker={refSelectedDatePicker}
                  refFlowSelected={refFlowSelected}
                />
              );
            })}
          </div>
        ))}
      </div>
      {canSelectPeriod &&
        dataDisplayPeriod.map((period, index) => (
          <DisplayPeriod
            key={index.toString()}
            start={period.start}
            end={period.end}
            week={period.week}
          />
        ))}
    </div>
  );
};

type DayProps = {
  day: string[];
  caseSize: number;
};

const Day: FC<DayProps> = ({ day, caseSize }) => {
  const { colors, numberSize, verticalGap } = useContext(
    ContextOption
  ) as DatepickerProps;
  return (
    <div
      style={{
        width: caseSize + "px",
        height: caseSize + "px",
      }}
      css={MainDatePickerCss.caseDay}
      id={day[1]}
    >
      <p
        style={{
          fontSize: numberSize / 1.1,
          color: colors.textDisableDay,
        }}
      >
        {day[0]}
      </p>
    </div>
  );
};
