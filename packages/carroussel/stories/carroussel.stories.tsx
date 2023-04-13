import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Carroussel3D } from "../src/index";
// @ts-ignore
import image1 from "./assets/image1.jpg";
// @ts-ignore
import image2 from "./assets/image2.jpg";
// @ts-ignore
import image3 from "./assets/image3.jpg";
// @ts-ignore
import image4 from "./assets/image4.jpg";
// @ts-ignore
import image5 from "./assets/image5.jpg";
// @ts-ignore
import image6 from "./assets/image6.jpg";
// @ts-ignore
import image7 from "./assets/image7.jpg";

export default {
  title: "Carroussel3D",
  component: Carroussel3D,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Carroussel3D>;

const Template: ComponentStory<typeof Carroussel3D> = (args) => (
  <Carroussel3D
    images={args.images}
    height={args.height}
    width={args.width}
    color={args.color}
    typeGapHorizontal={args.typeGapHorizontal}
    typeGapVertical={args.typeGapVertical}
    Component={(images) => (
      <img
        src={images.src}
        alt={images.alt}
        height={400}
        width={800}
      ></img>
    )}
  />
);

export const CarrousselLandscape = Template.bind({});
CarrousselLandscape.args = {
  images: [
    image1.toString(),
    image2.toString(),
    image3.toString(),
    image4.toString(),
    image5.toString(),
    image6.toString(),
    image7.toString(),
  ],
  color: "rgba(100, 255, 218, 1)",
  height: 400,
  width: 800,
  typeGapHorizontal: 1,
  typeGapVertical: 4,
};
