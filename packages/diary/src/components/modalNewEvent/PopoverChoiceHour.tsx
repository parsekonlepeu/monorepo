import * as React from "react";
import { Popover, useTheme } from "@mui/material";
import { TimeType } from "../../types";
import { css } from "@emotion/react";
import { getListTime } from "../../utils/functions/getListTime";

const listTime = getListTime();

const popoverChoiceHourCss = {
  mainContenair: css({
    width: "190px",
    display: "flex",
    flexDirection: "column",
  }),
  timeContenair: css({
    width: "100%",
    height: "30px",
    display: "flex",
    alignItems: "center",
    marginTop: "0px",
    marginBottom: "0px",
    cursor: "pointer",
    "& p": {
      fontSize: "14px",
      fontWeight: 600,
      marginLeft: "10px",
    },
  }),
};

type PopoverChoiceHourProps = {
  isOpen: boolean;
  anchorEl: Element;
  onClose: () => void;
  makeOnClick: (time: TimeType) => () => void;
};

export const PopoverChoiceHour: React.FC<PopoverChoiceHourProps> = ({
  isOpen,
  anchorEl,
  onClose,
  makeOnClick,
}) => {
  const theme = useTheme();

  return (
    <Popover
      id={"popover-hour-start"}
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      sx={{
        height: "200px",
        width: "190px",
      }}
    >
      <div css={popoverChoiceHourCss.mainContenair}>
        {listTime.map((time, index) => {
          const onClick = makeOnClick(time);
          if (true) {
            return (
              <div
                css={[
                  popoverChoiceHourCss.timeContenair,
                  {
                    "&:hover": {
                      backgroundColor: theme.google.textfieldSurface,
                    },
                    "& p": {
                      color: theme.google.onSurfaceVariantAgm,
                    },
                  },
                ]}
                onClick={onClick}
                key={index.toString()}
              >
                <p>{true ? time.time24 : time.time12}</p>
              </div>
            );
          }
        })}
      </div>
    </Popover>
  );
};
