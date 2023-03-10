import { DateTime } from "luxon";
import * as React from "react";
import { DisplayMode } from "../../types";
import { getPopperArrowTop } from "../constants";

export const useTextPopover = (displayMode: DisplayMode) => {
  const [forPoppers, setForPoppers] = React.useState({
    forTodayPopper: DateTime.now().toLocaleString({
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    forPreviousPopper: "Previous Day",
    forNextPopper: "Next Day",
  });

  React.useEffect(() => {
    const poppersNext = getPopperArrowTop("next", displayMode);
    const poppersPrevious = getPopperArrowTop("previous", displayMode);
    setForPoppers({
      ...forPoppers,
      forPreviousPopper: poppersPrevious,
      forNextPopper: poppersNext,
    });
  }, [displayMode]);
  return forPoppers;
};
