import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DatePicker } from "../src/index";

export default {
  title: "Picker",
  component: DatePicker,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => <DatePicker />;

export const WithoutProps = Template.bind({});
