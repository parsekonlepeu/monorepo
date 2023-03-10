import { DisplayMode } from "../../types";

export const getNumbersOfWeek = (displayMode: DisplayMode): number => {
  switch (displayMode) {
    case "2 weeks":
      return 2;
    case "3 weeks":
      return 3;
    case "4 weeks":
      return 4;
    case "Month":
      return 6;
    default:
      return 2;
  }
};
