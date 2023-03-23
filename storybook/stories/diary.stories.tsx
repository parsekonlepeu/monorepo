import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  Calendar,
  Diary,
  EventDiary,
  FunctionManageDiary,
  ReturnFunctionManageDiary,
} from "../../packages/diary/src/index";
import { createData } from "../createData";

export default {
  title: "Diary",
  component: Calendar,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => (
  <Calendar {...args} />
);
const TemplateWithFunctionManage: ComponentStory<typeof Calendar> = (args) => (
  <Calendar {...args} />
);
const TemplateWithFakeData: ComponentStory<typeof Calendar> = (args) => (
  <Calendar {...args} />
);

const onAddEvent: FunctionManageDiary<EventDiary> = async (data) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("add event capturer dans on add event : ", data);
      const r: ReturnFunctionManageDiary = {
        success: true,
        messageSnackbar: "évenement bien sauvegarder",
      };
      resolve(r);
    }, 1000);
  });
const onDelEvent: FunctionManageDiary<EventDiary> = async (data) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("del event capturer dans on del event : ", data);
      const r: ReturnFunctionManageDiary = {
        success: true,
        messageSnackbar: "évenement bien supprimer",
      };
      resolve(r);
    }, 1000);
  });
const onChangeEvent: FunctionManageDiary<EventDiary> = async (data) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("change event capturer dans on change event : ", data);
      const r: ReturnFunctionManageDiary = {
        success: true,
        messageSnackbar: "évenement bien modifier",
      };
      resolve(r);
    }, 1000);
  });
const onAddDiary: FunctionManageDiary<Diary> = async (data) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("add diary capturer dans on add diary : ", data);
      const r: ReturnFunctionManageDiary = {
        success: true,
        messageSnackbar: "agenda bien sauvegarder",
      };
      resolve(r);
    }, 3000);
  });
const onDelDiary: FunctionManageDiary<Diary> = async (data) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("del diary capturer dans on del diary : ", data);
      const r: ReturnFunctionManageDiary = {
        success: true,
        messageSnackbar: "agenda bien sauvegarder",
      };
      resolve(r);
    }, 1000);
  });
const onChangeDiary: FunctionManageDiary<Diary> = async (data) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("change diary capturer dans on change diary : ", data);
      const r: ReturnFunctionManageDiary = {
        success: true,
        messageSnackbar: "agenda bien sauvegarder",
      };
      resolve(r);
    }, 1000);
  });

const fakeData = createData();

export const WithoutProps = Template.bind({});
export const WithFunctionManage = TemplateWithFunctionManage.bind({});
WithFunctionManage.args = {
  onAddEvent: onAddEvent,
  onDelEvent: onDelEvent,
  onChangeEvent: onChangeEvent,
  onAddDiary: onAddDiary,
  onDelDiary: onDelDiary,
  onChangeDiary: onChangeDiary,
};
export const WithFakeData = TemplateWithFakeData.bind({});
WithFakeData.args = {
  onAddEvent: onAddEvent,
  onDelEvent: onDelEvent,
  onChangeEvent: onChangeEvent,
  onAddDiary: onAddDiary,
  onDelDiary: onDelDiary,
  onChangeDiary: onChangeDiary,
  diarys: fakeData.diarys,
  recycledBin: fakeData.recycledBin,
};
