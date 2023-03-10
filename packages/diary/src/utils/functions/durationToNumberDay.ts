export const durationToNumberDay = (duration: number): number => {
  return Math.ceil(duration / (24 * 60));
};
