import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  Calendar,
  Diary,
  EventDiary,
  FunctionManageDiary,
  ReturnFunctionManageDiary,
  Services,
} from "../src/index";
import { createData } from "./createData";

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
const listServices: Services = [
  {
    category: "coiffure",
    list: [
      {
        name: "boule a z",
        duration: 30,
        price: 15,
      },
      {
        name: "dégradé",
        duration: 15,
        price: 20,
      },
      {
        name: "couleur",
        duration: 45,
        price: 30,
      },
      {
        name: "coupe au bol",
        duration: 60,
        price: 10,
      },
      {
        name: "shampoing",
        duration: 15,
        price: 10,
      },
    ],
  },
  {
    category: "épilation",
    list: [
      {
        name: "main",
        duration: 30,
        price: 25,
      },
      {
        name: "bras",
        duration: 15,
        price: 20,
      },
      {
        name: "jambe",
        duration: 45,
        price: 30,
      },
      {
        name: "front",
        duration: 60,
        price: 10,
      },
      {
        name: "cuisse",
        duration: 15,
        price: 15,
      },
    ],
  },
];

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
  listServices: listServices,
};
