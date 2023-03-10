export const randomChoiceArray: <T>(array: T[]) => T = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
