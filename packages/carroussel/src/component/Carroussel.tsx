"use client";
import * as React from "react";
import { ButtonCarrousel } from "./ButtonCarroussel";
import { useGap } from "../utils/useGap";
import { usePointerHandler } from "../utils/usePointerHandler";
import { getStyle } from "../utils/getStyleCarroussel";
import { getIndexImage } from "../utils/getIndexImageCarroussel";
import { css } from "@emotion/react";

const pasVariable = 0.0125;

type TypeGapHorizontal = 1 | 2 | 3 | 4 | 5;
type TypeGapVertical = 1 | 2 | 3 | 4 | 5;
type ImageComponent = React.FC<{ src: any; alt: string; fill?: boolean }>;
// type copied from Next js
export interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
}
export type Images = StaticImageData[] | string[];

const CarrousselCss = {
  mainContenair: css({
    position: "relative",
    cursor: "grab",
    touchAction: "none",
  }),
};

type CarrousselProps = {
  images: Images;
  Component: ImageComponent;
  height: number;
  width: number;
  typeGapHorizontal: TypeGapHorizontal;
  typeGapVertical: TypeGapVertical;
  color: string;
};

export const Carroussel3D: React.FC<CarrousselProps> = ({
  images,
  height,
  width,
  typeGapHorizontal,
  typeGapVertical,
  Component,
  color,
}) => {
  const arrayForMap = React.useRef(new Array(7).fill(null));
  const { gapHorizontal, spacebetweenRow } = useGap(
    typeGapHorizontal,
    typeGapVertical,
    width
  );

  const {
    numberImage,
    stateNumber,
    percentage,
    mouseDown,
    indexImageLoadRight,
    indexImageLoadLeft,
    directiobOfmouvement,
    handleDownButton,
    handleUpButtonRight,
    handleUpButtonLeft,
    handlePointerDown,
  } = usePointerHandler(images, pasVariable);

  return (
    <div
      css={CarrousselCss.mainContenair}
      style={{
        height: `${height + 100}px`,
        width: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ButtonCarrousel
        width={20}
        height={20}
        onPointerDown={handleDownButton}
        onPointerUp={handleUpButtonRight}
        color={color}
      />
      <ButtonCarrousel
        width={20}
        height={20}
        reverse
        onPointerDown={handleDownButton}
        onPointerUp={handleUpButtonLeft}
        color={color}
      />
      <div
        id="carroussel"
        css={{
          position: "relative",
          cursor: "grab",
        }}
        style={{
          height: `${height + 100}px`,
          width: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPointerDown={handlePointerDown}
      >
        {arrayForMap.current.map((item, index) => {
          return (
            <div
              key={index.toString()}
              css={{
                position: "absolute",
                cursor: "grab",
              }}
              style={{
                ...getStyle(
                  stateNumber,
                  percentage,
                  index,
                  mouseDown,
                  spacebetweenRow,
                  gapHorizontal,
                  directiobOfmouvement
                ),
                height: height,
                width: width,
                boxShadow: `0px 0px 10px 3px ${color}`,
              }}
            >
              <WrapperComponent
                Component={Component}
                images={images}
                indexImage={getIndexImage(
                  indexImageLoadLeft,
                  indexImageLoadRight,
                  (stateNumber + index) % 7,
                  numberImage
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

type WrapperComponentProps = {
  Component: ImageComponent;
  images: Images;
  indexImage: number;
};

// eslint-disable-next-line react/display-name
const WrapperComponent: React.FC<WrapperComponentProps> = React.memo(
  ({ Component, images, indexImage }) => {
    return (
      <Component
        src={images.at(indexImage)}
        alt={`images${indexImage}`}
        fill
      />
    );
  },
  (prevProps, nextProps) => {
    return prevProps.indexImage === nextProps.indexImage;
  }
);
