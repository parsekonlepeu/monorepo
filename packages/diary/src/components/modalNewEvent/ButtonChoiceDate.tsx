import * as React from "react";
import { DateTime } from "luxon";
import { PopoverChoiceDate } from "./PopoverChoiceDate";
import { OnChangeDatePicker, SelectedDate } from "@parsekonlepeu/picker";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material";

export const buttonChoiceDateCss = {
  button: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "30px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    "&:focus": {
      border: "none",
      outline: 0,
    },
    "& p": {
      margin: "5px",
    },
  }),
};

type ButtonChoiceDateProps = {
  dateDisplay: DateTime;
  handleChange: OnChangeDatePicker;
  selectedDatePicker: SelectedDate;
};

export const ButtonChoiceDate: React.FC<ButtonChoiceDateProps> = ({
  dateDisplay,
  handleChange,
  selectedDatePicker,
}) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const onClick = React.useCallback(() => setIsOpen((isOpen) => !isOpen), []);
  const onClose = React.useCallback(() => setIsOpen(false), []);

  const refButtonStart = React.useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <button
        css={[
          buttonChoiceDateCss.button,
          {
            backgroundColor: theme.google.surface,
            "&:focus": {
              backgroundColor: theme.google.secondary,
            },
            "&:hover": {
              backgroundColor: theme.google.textfieldSurface,
            },
          },
        ]}
        ref={refButtonStart}
        onClick={onClick}
      >
        <p>
          {dateDisplay?.toLocaleString({
            day: "2-digit",
            month: "long",
            weekday: "long",
          })}
        </p>
      </button>
      <PopoverChoiceDate
        isOpen={isOpen}
        anchorEl={refButtonStart.current as HTMLButtonElement}
        onClose={onClose}
        handleChange={handleChange}
        selectedDate={selectedDatePicker}
      />
    </>
  );
};
