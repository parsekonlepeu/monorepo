import { FC, useCallback, useContext } from "react";
// import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
// import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { DateTime } from "luxon";
import { WithPopper } from "./WithPopper";
import { DatepickerProps } from "../types";
import { usePickerDispatch, usePickerSelector } from "../store/hooksTypedRedux";
import { ContextOption } from "../context/ContextOption";
import { changeMonthYearPicker } from "../store/pickerSlice";
import { css } from "@emotion/react";

const TopDatePickerCss = {
  contenair: css({
    display: "flex",
    flexDirection: "row",
    height: "20px",
  }),
  topRight: css({
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  }),
  topLeft: css({
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    "& p": {
      fontSize: "13px",
      fontWeight: 600,
    },
  }),
  arrowsContenair: css({
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }),
  arrow: css({
    borderRadius: "15px",
    width: "20px",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "5px",
    cursor: "pointer",
  }),
};

export const TopDatePicker: FC = () => {
  const monthPicker = usePickerSelector((state) => state.picker.monthPicker);
  const yearPicker = usePickerSelector((state) => state.picker.yearPicker);

  const { canSwipe, displayYear, caseSize, colors } = useContext(
    ContextOption
  ) as DatepickerProps;

  const dispatch = usePickerDispatch();

  const monthMinus = useCallback(() => {
    const dt = DateTime.local(yearPicker, monthPicker).minus({
      months: 1,
    });
    dispatch(
      changeMonthYearPicker({
        month: dt.month,
        year: dt.year,
      })
    );
  }, [yearPicker, monthPicker, canSwipe]);

  const monthPlus = useCallback(() => {
    const dt = DateTime.local(yearPicker, monthPicker).plus({
      months: 1,
    });
    dispatch(
      changeMonthYearPicker({
        month: dt.month,
        year: dt.year,
      })
    );
  }, [yearPicker, monthPicker, canSwipe]);

  return (
    <div
      css={TopDatePickerCss.contenair}
      style={{
        paddingLeft: caseSize / 2.5,
      }}
    >
      <div css={TopDatePickerCss.topLeft}>
        <p>
          {DateTime.local(yearPicker, monthPicker)
            .setLocale("en")
            .toLocaleString({
              year: displayYear ? "numeric" : undefined,
              month: "long",
            })}
        </p>
      </div>
      <div css={TopDatePickerCss.topRight}>
        {canSwipe ? (
          <div css={TopDatePickerCss.arrowsContenair}>
            <WithPopper
              textDisplay="Previous Month"
              top="20px"
            >
              <div
                css={[
                  TopDatePickerCss.arrow,
                  {
                    "&:hover": {
                      backgroundColor: colors.hover,
                    },
                  },
                ]}
                onClick={monthMinus}
                id="left"
              >
                {/* <ChevronLeftRoundedIcon sx={{ fontSize: "20px" }} /> */}
              </div>
            </WithPopper>
            <WithPopper
              textDisplay="Next Month"
              top="20px"
            >
              <div
                css={[
                  TopDatePickerCss.arrow,
                  {
                    "&:hover": {
                      backgroundColor: colors.hover,
                    },
                  },
                ]}
                onClick={monthPlus}
                id="right"
              >
                {/* <ChevronRightRoundedIcon sx={{ fontSize: "20px" }} /> */}
              </div>
            </WithPopper>
          </div>
        ) : null}
      </div>
    </div>
  );
};
