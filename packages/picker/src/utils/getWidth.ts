export const getWidth = (
  start: number,
  end: number,
  caseSize: number,
  horizontalGap: number
): string => {
  if (start > end) {
    throw new Error("start must be bigger than end");
  }
  const diff = end - start;
  const widthNumber = caseSize + diff * caseSize + diff * horizontalGap;

  return widthNumber + "px";
};
