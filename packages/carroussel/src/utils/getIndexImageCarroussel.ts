export const getIndexImage = (
  indexImageLoadLeft: number,
  indexImageLoadRight: number,
  stateNumber: number,
  numberImage: number
) => {
  switch (stateNumber) {
    case 0:
      return (indexImageLoadRight - 3) % numberImage;
    case 1:
      return (indexImageLoadRight - 2) % numberImage;
    case 2:
      return (indexImageLoadRight - 1) % numberImage;
    case 3:
      return indexImageLoadRight;
    case 4:
      return indexImageLoadLeft;
    case 5:
      return (indexImageLoadLeft + 1) % numberImage;
    case 6:
      return (indexImageLoadLeft + 2) % numberImage;

    default:
      return 0;
  }
};
