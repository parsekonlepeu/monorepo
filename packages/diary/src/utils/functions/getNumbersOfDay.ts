import { DisplayMode } from "../../types";

export const getNumbersOfDay = (displayMode: DisplayMode): number => {
  switch (displayMode) {
    case "Day":
      return 1;
    case "2 days":
      return 2;
    case "3 days":
      return 3;
    case "4 days":
      return 4;
    case "5 days":
      return 5;
    case "6 days":
      return 6;
    case "7 days":
      return 7;
    case "Week":
      return 7;
    default:
      return 1;
  }
};
