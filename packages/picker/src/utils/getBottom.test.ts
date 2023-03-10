import { getBottom } from "./getBottom";

describe("getBottom", () => {
  test("should return a string 0px", () => {
    const r = getBottom(1, 24, 5);
    expect(typeof r).toBe("string");
    expect(r).toBe("0px");
  });
  test("should return a string 29px", () => {
    const r = getBottom(2, 24, 5);
    expect(typeof r).toBe("string");
    expect(r).toBe("29px");
  });
});
