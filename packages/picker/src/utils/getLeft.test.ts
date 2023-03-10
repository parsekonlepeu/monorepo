import { getLeft } from "./getLeft";

describe("getBottom", () => {
  test("should return a string 0px", () => {
    const r = getLeft(1, 24, 5);
    expect(typeof r).toBe("string");
    expect(r).toBe("0px");
  });
  test("should return a string 29px", () => {
    const r = getLeft(2, 24, 5);
    expect(typeof r).toBe("string");
    expect(r).toBe("29px");
  });
});
