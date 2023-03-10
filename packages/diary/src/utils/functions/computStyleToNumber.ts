export const computStyleToNumber = (
  style: "bottom" | "height" | "left" | "right" | "top" | "width",
  element: HTMLDivElement
): number => {
  switch (style) {
    case "bottom":
      return parseInt(window.getComputedStyle(element).bottom.slice(0, -2), 10);
    case "height":
      return parseInt(window.getComputedStyle(element).height.slice(0, -2), 10);
    case "left":
      return parseInt(window.getComputedStyle(element).left.slice(0, -2), 10);
    case "right":
      return parseInt(window.getComputedStyle(element).right.slice(0, -2), 10);
    case "top":
      return parseInt(window.getComputedStyle(element).top.slice(0, -2), 10);
    case "width":
      return parseInt(window.getComputedStyle(element).width.slice(0, -2), 10);
    default:
      return 0;
  }
};
