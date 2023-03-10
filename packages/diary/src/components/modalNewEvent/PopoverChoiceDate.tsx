import * as React from "react";
import { Popover } from "@mui/material";
import {
  DatePicker,
  OnChangeDatePicker,
  SelectedDate,
} from "@parsekonlepeu/picker";

type PopoverChoiceDateProps = {
  isOpen: boolean;
  anchorEl: Element;
  onClose: () => void;
  handleChange: OnChangeDatePicker;
  selectedDate: SelectedDate;
};

export const PopoverChoiceDate: React.FC<PopoverChoiceDateProps> = ({
  isOpen,
  anchorEl,
  onClose,
  handleChange,
  selectedDate,
}) => {
  const onChange: OnChangeDatePicker = React.useCallback((data) => {
    onClose();
    handleChange(data);
  }, []);

  return (
    <Popover
      id={"popover-start"}
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <div>
        <DatePicker
          canSwipe={true}
          canSelectPeriod={false}
          onChange={onChange}
          selectedDate={selectedDate}
          multipleDates={null}
        />
      </div>
    </Popover>
  );
};
