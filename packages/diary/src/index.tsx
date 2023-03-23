import { Provider } from "react-redux";
import * as React from "react";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { BarTopLeft } from "./components/BarTop/BarTopLeft";
import { BarTopRight } from "./components/BarTop/BarTopRight";
import store from "./store/store";
import { contextPerso } from "./utils/hooks/hooksTypedRedux";
import { ContextFunctionManage } from "./context/context-function-manage";
import { ModalRecyclebin } from "./components/modalRecycleBin/ModalRecycleBin";
import { BarLeft } from "./components/barLeft/BarLeft";
import { MainView } from "./components/viewsCalendar/MainView";
import { LeftOpenClose } from "./components/barLeft/LeftOpenClose";
import { ButtonNewEvent } from "./components/barLeft/ButtonNewEvent";
import { ContenairModalnewEvent } from "./components/modalNewEvent/ContenairModalNewEvent";
import { SnackBarInfo } from "./components/snack-bar-info/SnackBarInfo";
import {
  ConfigurableOptions,
  CustomizeView,
  Diary,
  EventDiary,
  FirstDay,
  FunctionManageDiary,
  RecycleBinDiary,
  Service,
  TypeEvent,
} from "./types";
import { css, Global } from "@emotion/react";
import { HEIGHT_TOP } from "./utils/constants";
import { useRefreshStoreWithProps } from "./hooks/useRefreshStoreWithProps";

const calendarCss = {
  mainContenair: css({
    width: "100vw",
    height: "100vh",
    position: "absolute",
    top: "0px",
    left: "0px",
    overflow: "hidden",
  }),
  topContenair: css({
    display: "flex",
    justifyContent: "space-between",
    height: `${HEIGHT_TOP}px`,
    width: "100%",
  }),
  bottomContenair: css({
    display: "flex",
    flexDirection: "row",
    flex: 1,
  }),
};

export interface CalendarProps {
  withRecycledBin?: boolean;
  withSearch?: boolean;
  withMoveEvent?: boolean;
  configurableOptions?: ConfigurableOptions;
  diarys?: Diary[];
  recycledBin?: RecycleBinDiary[];
  typeEvent?: TypeEvent;
  canMoveEvent?: boolean;
  language?: string;
  country?: string;
  dateFormat?: "JJ/MM/YYYY" | "MM/JJ/YYYY" | "YYYY-MM-JJ";
  timeFormat?: "12" | "24";
  timeZone?: string;
  defaultDuration?: number;
  firstDayWeek?: FirstDay;
  customizeView?: CustomizeView;
  askCurrentPos?: boolean;
  listServices?: Service[];
  onAddEvent?: FunctionManageDiary<EventDiary>;
  onDelEvent?: FunctionManageDiary<EventDiary>;
  onChangeEvent?: FunctionManageDiary<EventDiary>;
  onAddDiary?: FunctionManageDiary<Diary>;
  onDelDiary?: FunctionManageDiary<Diary>;
  onChangeDiary?: FunctionManageDiary<Diary>;
  onChangeOptions?: FunctionManageDiary<EventDiary>;
  onRestoreEvent?: FunctionManageDiary<EventDiary>;
}

const Container: React.FC<CalendarProps> = (props) => {
  useRefreshStoreWithProps(props);

  return (
    <div css={calendarCss.mainContenair}>
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

          @font-face: {
            font-family: "Open Sans", sans-serif;
          }

          p {
            font-family: "Open Sans", sans-serif;
          }
        `}
      />
      <ContenairModalnewEvent />
      <div css={calendarCss.topContenair}>
        <BarTopLeft title="essai" />
        <BarTopRight title="essai" />
      </div>
      <Divider />
      <div css={calendarCss.bottomContenair}>
        <BarLeft />
        <MainView />
      </div>
      <LeftOpenClose />
      <ButtonNewEvent />
      <ModalRecyclebin />
      <SnackBarInfo />
    </div>
  );
};

export * from "./types";
export { colorsDiarys } from "./utils/constants";

export const Calendar: React.FC<CalendarProps> = (props: CalendarProps) => {
  const valueContext = {
    onAddEvent: props.onAddEvent,
    onDelEvent: props.onDelEvent,
    onRestoreEvent: props.onRestoreEvent,
    onChangeEvent: props.onChangeEvent,
    onAddDiary: props.onAddDiary,
    onDelDiary: props.onDelDiary,
    onChangeDiary: props.onChangeDiary,
    onChangeOptions: props.onChangeOptions,
  };

  return (
    <Provider
      context={contextPerso}
      store={store}
    >
      <ThemeProvider theme={theme}>
        <ContextFunctionManage.Provider value={valueContext}>
          <Container {...props} />
        </ContextFunctionManage.Provider>
      </ThemeProvider>
    </Provider>
  );
};
