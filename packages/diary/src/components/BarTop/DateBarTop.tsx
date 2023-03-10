import * as React from "react";
import { Box, Zoom } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DateTime } from "luxon";
import grey from "@mui/material/colors/grey";
import { useAppSelector } from "../../utils/hooks/hooksTypedRedux";
import { DatePicker } from "@parsekonlepeu/picker";
import { css } from "@emotion/react";
import { SxProps } from "@mui/material";

const stylePickerContenair: SxProps = {
  position: "absolute",
  zIndex: 101,
  padding: "5px 10px 10px ",
  top: "13px",
  left: "250px",
  borderRadius: "5px",
  display: "flex",
  boxShadow: 10,
};

const DateCss = {
  mainContenair: css({
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    "& p": {
      fontSize: "20px",
      fontWeight: 600,
    },
  }),
  quitPicker: css({
    top: "0px",
    left: "0px",
    position: "absolute",
    width: "100vw",
    height: "100vh",
    backgroundColor: "transparent",
    cursor: "default",
    zIndex: 100,
  }),
};

export const DateBarTop: React.FC = () => {
  const leftExtend = useAppSelector((state) => state.general.leftExtend);
  const selectedDateDiary = useAppSelector(
    (state) => state.general.selectedDateDiary
  );
  const displayMode = useAppSelector((state) => state.general.displayMode);

  const dt = DateTime.fromObject(selectedDateDiary);
  const dateString =
    displayMode === "Year"
      ? dt.year.toString()
      : dt.setLocale("fr").toLocaleString(DateTime.DATE_FULL);

  if (!leftExtend) {
    return <DateWithDatePicker dateString={dateString} />;
  } else {
    return <DateWithoutDatePicker dateString={dateString} />;
  }
};

interface DateWithDatePickerProps {
  dateString: string;
}

const DateWithDatePicker: React.FC<DateWithDatePickerProps> = ({
  dateString,
}) => {
  const [picker, setPicker] = React.useState<boolean>(false);

  const handleClickDate = React.useCallback(() => {
    setPicker(!picker);
  }, [picker]);

  return (
    <div>
      <div
        css={[
          DateCss.mainContenair,
          {
            cursor: "pointer",
          },
        ]}
        onClick={handleClickDate}
      >
        {picker ? <div css={DateCss.quitPicker} /> : null}
        <p>{dateString}</p>
        <ArrowDropDownIcon sx={{ width: "20px", mr: "5px" }} />
        <Zoom in={picker}>
          <Box sx={stylePickerContenair}>
            <DatePicker />
          </Box>
        </Zoom>
      </div>
    </div>
  );
};

interface DateWithoutDatePickerProps {
  dateString: string;
}

const DateWithoutDatePicker: React.FC<DateWithoutDatePickerProps> = ({
  dateString,
}) => {
  return (
    <div
      css={[
        DateCss.mainContenair,
        {
          color: grey[800],
        },
      ]}
    >
      <p>{dateString}</p>
    </div>
  );
};
