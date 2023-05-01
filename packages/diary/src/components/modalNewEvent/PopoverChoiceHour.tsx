import * as React from "react";
import { Popover, useTheme } from "@mui/material";
import { TimeType } from "../../types";
import { css } from "@emotion/react";
import { getListTime } from "../../utils/functions/getListTime";
import { useAppSelector } from "../../utils/hooks/hooksTypedRedux";
import { filterTimesServices } from "../../utils/functions/filterTimesServices";

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
  const tag = useAppSelector((state) => state.diarys.tagModalNewEvent);
  const diarys = useAppSelector((state) => state.diarys.diarys);
  const eventTemp = useAppSelector((state) => state.diarys.eventTemp);
  const [times, setTimes] = React.useState(listTime);
  React.useEffect(() => {
    console.log("PopoverChoiceHour rendu !!", tag);
    console.log("eventTemp", eventTemp);
    if (tag === "service") {
      if (eventTemp) {
        const newTimes = filterTimesServices(listTime, diarys, eventTemp);
        setTimes(newTimes);
      }
    }
  }, [tag, diarys, eventTemp]);

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
        {times.map((time, index) => {
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
                key={true ? time.time24 : time.time12}
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
