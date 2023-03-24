import * as React from "react";

type TypeGapHorizontal = 1 | 2 | 3 | 4 | 5;
type TypeGapVertical = 1 | 2 | 3 | 4 | 5;

export const useGap = (
  typeGapHorizontal: TypeGapHorizontal,
  typeGapVertical: TypeGapVertical,
  width: number
) => {
  const getGapHorizontal = (typeGapHorizontal: TypeGapHorizontal) => {
    switch (typeGapHorizontal) {
      case 1:
        return 3;
      case 2:
        return 2;
      case 3:
        return 1.5;
      case 4:
        return 1.2;
      case 5:
        return 1;
    }
  };
  const getGapVertical = (typeGapVertical: TypeGapVertical) => {
    switch (typeGapVertical) {
      case 1:
        return 20;
      case 2:
        return 50;
      case 3:
        return 80;
      case 4:
        return 110;
      case 5:
        return 140;
    }
  };

  const gapHorizontal = React.useMemo(
    () => width / getGapHorizontal(typeGapHorizontal),
    [typeGapHorizontal, width]
  );
  const spacebetweenRow = React.useMemo(
    () => getGapVertical(typeGapVertical),
    [typeGapVertical]
  );

  return {
    gapHorizontal: gapHorizontal,
    spacebetweenRow: spacebetweenRow,
  };
};
