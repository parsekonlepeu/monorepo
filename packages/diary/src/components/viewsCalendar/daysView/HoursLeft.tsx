import { css } from "@emotion/react";
import { useTheme } from "@mui/material";
import * as React from "react";
import { hours_12, hours_24 } from "../../../utils/constants";
import { useAppSelector } from "../../../utils/hooks/hooksTypedRedux";

const hoursLeftCss = {
  mainCOntenair: css({
    position: "relative",
    height: "47px",
    width: "calc(100% - 5px)",
    backgroundColor: "transparent",
    borderBottom: "solid 1px #bdbdbd",
  }),
  hourLeftContenair: css({
    position: "absolute",
    paddingRight: "5px",
    top: "32px",
    left: "0px",
  }),
};

export const HoursLeft: React.FC = () => {
  const theme = useTheme();
  const [hours, setHours] = React.useState<string[]>(hours_12);
  const timeFormat = useAppSelector((state) => state.options.timeFormat);
  React.useEffect(() => {
    if (timeFormat === "1:00pm") {
      setHours(hours_12);
    } else {
      setHours(hours_24);
    }
  }, [timeFormat]);
  return (
    <>
      {hours.map((hour, index) => (
        <div css={hoursLeftCss.mainCOntenair} key={index.toString()}>
          <div
            css={[
              hoursLeftCss.hourLeftContenair,
              {
                backgroundColor: theme.google.surface,
              },
            ]}
          >
            {hour !== "00:00" ? (
              <p
                css={{
                  fontSize: "0.6rem",
                  color: theme.google.onSurface,
                }}
              >
                {hour}
              </p>
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
};
