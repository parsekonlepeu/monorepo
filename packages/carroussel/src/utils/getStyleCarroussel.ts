const getZIndex = (stateNumber: number, percentage: number) => {
  switch (stateNumber) {
    case 0:
      return percentage < 0.5 ? 10 : 5;
    case 1:
      return 3;
    case 2:
      return 2;
    case 3:
      return 0;
    case 4:
      return percentage > 0.5 ? 2 : 0;
    case 5:
      return 3;
    case 6:
      return percentage > 0.5 ? 10 : 5;

    default:
      return 3;
  }
};
const getZIndexReverse = (stateNumber: number, percentage: number) => {
  switch (stateNumber) {
    case 0:
      return percentage < 0.5 ? 10 : 5;
    case 1:
      return percentage > 0.5 ? 10 : 5;
    case 2:
      return 3;
    case 3:
      return percentage > 0.5 ? 2 : 0;
    case 4:
      return 0;
    case 5:
      return 2;
    case 6:
      return 3;

    default:
      return 10;
  }
};
const getTranslateX = (
  intPart: number,
  floatPart: number,
  gapHorizontal: number
): number => {
  switch (intPart) {
    case 0:
      return floatPart * gapHorizontal;
    case 1:
      return gapHorizontal + floatPart * gapHorizontal;
    case 2:
      return 2 * gapHorizontal;
    case 3:
      return 2 * gapHorizontal - floatPart * 4 * gapHorizontal;
    case 4:
      return -2 * gapHorizontal;
    case 5:
      return -2 * gapHorizontal + floatPart * gapHorizontal;
    case 6:
      return -gapHorizontal + floatPart * gapHorizontal;

    default:
      return floatPart * 0;
  }
};
const getTranslateXReverse = (
  intPart: number,
  floatPart: number,
  gapHorizontal: number
): number => {
  switch (intPart) {
    case 0:
      return -floatPart * gapHorizontal;
    case 1:
      return gapHorizontal - floatPart * gapHorizontal;
    case 2:
      return 2 * gapHorizontal - floatPart * gapHorizontal;
    case 3:
      return 2 * gapHorizontal;
    case 4:
      return -2 * gapHorizontal + floatPart * 4 * gapHorizontal;
    case 5:
      return -2 * gapHorizontal;
    case 6:
      return -gapHorizontal - floatPart * gapHorizontal;

    default:
      return floatPart * 0;
  }
};
const getTranslateZ = (
  intPart: number,
  floatPart: number,
  spacebetweenRow: number
) => {
  switch (intPart) {
    case 0:
      return 0 - floatPart * spacebetweenRow;
    case 1:
      return -spacebetweenRow - floatPart * spacebetweenRow;
    case 2:
      return -2 * spacebetweenRow - floatPart * spacebetweenRow;
    case 3:
      return -3 * spacebetweenRow;
    case 4:
      return -3 * spacebetweenRow + floatPart * spacebetweenRow;
    case 5:
      return -2 * spacebetweenRow + floatPart * spacebetweenRow;
    case 6:
      return -spacebetweenRow + floatPart * spacebetweenRow;

    default:
      return floatPart * 1;
  }
};
const getTranslateZReverse = (
  intPart: number,
  floatPart: number,
  spacebetweenRow: number
) => {
  switch (intPart) {
    case 0:
      return 0 - floatPart * spacebetweenRow;
    case 1:
      return -spacebetweenRow + floatPart * spacebetweenRow;
    case 2:
      return -2 * spacebetweenRow + floatPart * spacebetweenRow;
    case 3:
      return -3 * spacebetweenRow + floatPart * spacebetweenRow;
    case 4:
      return -3 * spacebetweenRow;
    case 5:
      return -2 * spacebetweenRow - floatPart * spacebetweenRow;
    case 6:
      return -spacebetweenRow - floatPart * spacebetweenRow;

    default:
      return floatPart * 1;
  }
};

export const getStyle = (
  stateNumber: number,
  percentage: number,
  numberOfImage: number,
  mouseDown: boolean,
  spacebetweenRow: number,
  gapHorizontal: number,
  directiobOfmouvement: "right" | "left"
) => {
  const intPart = (stateNumber + numberOfImage) % 7;
  const transZ =
    directiobOfmouvement === "right"
      ? getTranslateZ(intPart, percentage, spacebetweenRow)
      : getTranslateZReverse(intPart, percentage, spacebetweenRow);
  const transX =
    directiobOfmouvement === "right"
      ? getTranslateX(intPart, percentage, gapHorizontal)
      : getTranslateXReverse(intPart, percentage, gapHorizontal);
  const zIndex =
    directiobOfmouvement === "right"
      ? getZIndex(intPart, percentage)
      : getZIndexReverse(intPart, percentage);
  return {
    transform: `perspective(300px) translateZ(${transZ}px)  translateX(${transX}px)`,
    zIndex: zIndex,
    transition: mouseDown ? undefined : "0.5s",
  };
};
