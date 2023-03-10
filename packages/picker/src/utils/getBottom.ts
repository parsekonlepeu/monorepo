export const getBottom = (
  week: number,
  caseSize: number,
  verticalGap: number
): string => {
  return (week - 1) * verticalGap + (week - 1) * caseSize + "px";
};
