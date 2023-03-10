import { DisplayMode } from "../types";

export const getPopperArrowTop = (
  type: "next" | "previous",
  displayMode: DisplayMode
): string => {
  let mode;

  switch (displayMode) {
    case "Day":
      mode = "Day";
      break;
    case "Month":
      mode = "Month";
      break;
    case "Week":
      mode = "Week";
      break;
    case "Year":
      mode = "Year";
      break;
    case "Planning":
      mode = "Day";
      break;
    default:
      mode = "Period";
      break;
  }

  if (type === "next") {
    return "Next " + mode;
  } else {
    return "Previous " + mode;
  }
};
export const hours_12 = [
  // "0 AM",
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 AM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
  "00:00",
];
export const hours_24 = [
  // "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "00:00",
];
export const HEIGHT_TOP = 60;
export const CASE_SIZE_SMALL = 15;
export const CASE_SIZE_MEDIUM = 15;
export const CASE_SIZE_LARGE = 15;
export const WIDTH_NEW_EVENT = 550;
export const HEIGHT_NEW_EVENT = 600;
export const WIDTH_BAR_LEFT = 256;
export const HEIGHT_TOP_DAY_VIEW = 75;
export const HEIGHT_ROW_CONTNAIR_EVENT_ALL_DAY = 24;
export const HEIGHT_SLICE_15_MINUTE = 12;
export const WIDTH_MODAL_NEW_EVENT = 450;
export const SMALL_FONT_SIZE = 10;
export const MEDIUM_FONT_SIZE = 13;
export const LARGE_FONT_SIZE = 20;
export const URL_FONT =
  "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";

export const colorsDiarys = [
  {
    name: "Beetroot",
    rgb: "rgb(173, 20, 87)",
  },
  {
    name: "Tangerine",
    rgb: "rgb(244, 81, 30)",
  },
  {
    name: "Citron",
    rgb: "rgb(228, 196, 65)",
  },
  {
    name: "Basil",
    rgb: "rgb(11, 128, 67)",
  },
  {
    name: "Blueberry",
    rgb: "rgb(63, 81, 181)",
  },
  {
    name: "Grape",
    rgb: "rgb(142, 36, 170)",
  },
  {
    name: "Cherry Blossom",
    rgb: "rgb(216, 27, 96)",
  },
  {
    name: "Pumpkin",
    rgb: "rgb(239, 108, 0)",
  },
  {
    name: "Avocado",
    rgb: "rgb(192, 202, 51)",
  },
  {
    name: "Eucalyptus",
    rgb: "rgb(0, 150, 136)",
  },
  {
    name: "Lavender",
    rgb: "rgb(121, 134, 203)",
  },
  {
    name: "Cocoa",
    rgb: "rgb(121, 85, 72)",
  },
  {
    name: "Tomato",
    rgb: "rgb(213, 0, 0)",
  },
  {
    name: "Mango",
    rgb: "rgb(240, 147, 0)",
  },
  {
    name: "Pistachio",
    rgb: "rgb(124, 179, 66)",
  },
  {
    name: "Peacock",
    rgb: "rgb(3, 155, 229)",
  },
  {
    name: "Wisteria",
    rgb: "rgb(179, 157, 219)",
  },
  {
    name: "Graphite",
    rgb: "rgb(97, 97, 97)",
  },
  {
    name: "Flamingo",
    rgb: "rgb(230, 124, 115)",
  },
  {
    name: "Banana",
    rgb: "rgb(246, 191, 38)",
  },
  {
    name: "Sage",
    rgb: "rgb(51, 182, 121)",
  },
  {
    name: "Cobalt",
    rgb: "rgb(66, 133, 244)",
  },
  {
    name: "Amethyst",
    rgb: "rgb(158, 105, 175)",
  },
  {
    name: "Birch",
    rgb: "rgb(167, 155, 142)",
  },
];
