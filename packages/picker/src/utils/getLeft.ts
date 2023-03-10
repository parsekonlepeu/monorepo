export const getLeft = (
  start: number,
  caseSize: number,
  horizontalGap: number
): string => {
  return (start - 1) * horizontalGap + (start - 1) * caseSize + "px";
};
