import * as React from "react";
import { css } from "@emotion/react";

const ButtonCarrousselCss = {
  svgContenair: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    borderColor: "transparent",
    position: "absolute",
    bottom: "0px",
    ":hover": {
      boxShadow: "0px 0px 10px 3px #64ffda",
      cursor: "pointer",
    },
  }),
};

type ButtonCarrouselProps = {
  width: number;
  height: number;
  reverse?: boolean;
  onPointerDown: (e: React.PointerEvent | React.TouchEvent) => void;
  onPointerUp: (e: React.PointerEvent | React.TouchEvent) => void;
  color: string;
};

export const ButtonCarrousel: React.FC<ButtonCarrouselProps> = ({
  width,
  height,
  reverse,
  onPointerDown,
  onPointerUp,
  color,
}) => {
  return (
    <button
      css={ButtonCarrousselCss.svgContenair}
      style={{
        width: `${width + 20}px`,
        height: `${height + 20}px`,
        transform: reverse ? "rotate(180deg)" : undefined,
        left: reverse ? "calc(50% - 100px)" : undefined,
        right: reverse ? undefined : "calc(50% - 100px)",
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width={`${width}px`}
        height={`${height}px`}
        viewBox="0 0 1280.000000 1280.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
          fill={color}
          stroke="none"
        >
          <path
            d="M7556 10480 c-384 -61 -686 -316 -799 -676 -88 -278 -46 -583 115
        -832 40 -62 200 -228 806 -834 l756 -758 -3289 -3 -3290 -2 -83 -23 c-412
        -110 -696 -437 -742 -850 -50 -453 224 -878 662 -1028 166 -57 -15 -54 3503
        -54 l3240 0 -756 -757 c-470 -471 -772 -781 -796 -818 -266 -399 -218 -911
        117 -1245 186 -187 417 -282 685 -283 169 -1 295 28 445 103 168 85 66 -15
        2024 1955 l1441 1450 52 95 c196 364 159 787 -98 1104 -32 39 -772 785 -1646
        1657 -1369 1367 -1600 1594 -1674 1643 -157 102 -315 153 -504 160 -60 3 -137
        1 -169 -4z"
          />
        </g>
      </svg>
    </button>
  );
};
