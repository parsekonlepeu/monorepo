import { DateTime, ToObjectOutput } from "luxon";

export interface RecycleBinState {
  recycleBinList: RecycleBinDiary[];
  modalRecycleBin: boolean;
  allClicked: boolean;
}

export interface OptionsState {
  withRecycledBin: boolean;
  withSearch: boolean;
  withMoveEvent: boolean;
  canAddEvent: boolean;
  canRemoveEvent: boolean;
  canModifEvent: boolean;
  canAddDiary: boolean;
  canRemoveDiary: boolean;
  configurableOptions: ConfigurableOptions;
  modalOption: boolean;
  typeEvent: TypeEvent;
  canMoveEvent: boolean;
  language: string;
  locale: string;
  country: string;
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
  timeZone: string;
  askCurrentPos: boolean;
  keyboardShortcut: boolean;
  defaultDuration: number;
  firstDayWeek: FirstDay;
  customizeView: CustomizeView;
  idTitleModal: IdTitleModal;
  idName: IdName;
}

export interface GeneralState {
  snackbarVisible: boolean;
  snackbarParams: SnackbarParams;
  selectedDateDiary: SelectedDate;
  multipleDatesDiary: MultipleDates | null;
  selectedDateInitPicker: SelectedDate;
  multipleDatesInitPicker: MultipleDates | null;
  listServices: Services;
  displayMode: DisplayMode;
  leftExtend: boolean;
}

export type DiarysState = {
  flowChangeEvent: string | null;
  flowChangeEventAllDay: string | null;
  flowChangeWeekEvent: string | null;
  diarysDisplay: IdDiary[];
  diarys: Diary[];
  eventTemp?: EventDiary;
  eventWeekOnChange: EventDiary | null;
  flowMoveModalEvent: boolean;
  modalUnsubscribeDiary: boolean;
  idDiaryForDelete: string | null;
  modalChoiceColor: boolean;
  idDiarysModalChoiceColor: string;
  modalNewEvent: boolean;
  modalWarningNotDiarys: boolean;
  modalNewEventIsInAnchor: boolean;
  modalNewEventWouldBeLeft: boolean;
  posModalNewEvent: PosModal;
};

export type EventDiary = {
  /**
   * Color customize
   */
  color: string;
  /**
   * Event title
   * @default ""
   */
  title: string;
  /**
   * uuid of event
   */
  id: string;
  /**
   * Start date of event
   */
  start: ToObjectOutput;
  /**
   * Start date unix integer of event
   */
  startUnixInteger: number;
  /**
   * Duration of event in minutes
   */
  duration: number;
  /**
   * Name client of event
   */
  nameClient?: string;
  /**
   * True if the event lasts the day
   */
  allDay: boolean;
  /**
   * Type of event
   */
  type: ListEvent;
  /**
   * location of the event
   * @default undefined
   */
  place?: string;
  /**
   * Description of the event
   * @default undefined
   */
  description?: string;
  /**
   * Custom info
   * @default undefined
   */
  custom?: any;
  /**
   * Number of recurrence of the event
   */
  nbRecurrence: number;
  /**
   * uuid diary of event
   */
  idDiary: string;
  /**
   * Service for service type event
   * @default undefined
   */
  service?: Service;
  /**
   * Category of the service for service type event
   * @default undefined
   */
  serviceCategory?: ServiceCategoryName;
  /**
   * name of the booker
   * @default undefined
   */
  bookerName?: string;
};

export type EventDiaryDisplay = EventDiary & {
  /**
   * Number parts of truncate event
   */
  numberParts: number;
  /**
   * Start date of truncate event
   */
  startTruncate: ToObjectOutput;
  /**
   * Duration of truncate event
   */
  durationTruncate: number;
};

export type Diary = {
  /**
   * Event list of diary
   */
  events: EventDiary[];
  /**
   * Title of diary
   */
  title: string;
  /**
   * uuid of diary
   */
  id: IdDiary;
  /**
   * Timezone of diary
   */
  timezone: string;
  /**
   * Description of diary
   */
  description: string;
  /**
   * Color diary for event display
   */
  color: string;
};

export type FunctionManageDiary<T> = (
  data: T
) => Promise<ReturnFunctionManageDiary>;

export type ReturnFunctionManageDiary = {
  success: boolean;
  messageSnackbar: string;
};

export type SnackbarParams = {
  message: string;
  key: string;
  color: string;
};

export type ServiceName = string;

export type ServiceCategoryName = string;

export type Service = {
  name: ServiceName;
  duration: number;
  price?: number;
};

export type Services = {
  category: string;
  list: Service[];
}[];

export type AnchorOrigin = {
  vertical: number | "center" | "top" | "bottom";
  horizontal: number | "left" | "center" | "right";
};

export type TransformOrigin = {
  vertical: number | "center" | "top" | "bottom";
  horizontal: number | "left" | "center" | "right";
};

export type Choices<T> = T[];

export type InfoPays = {
  name: string;
  code: string;
};

export type RecycleBinDiary = {
  title: string;
  color: string;
  idDiary: IdDiary;
  listEventDelete: EventDiaryDelete[];
};

export type EventDiaryDelete = EventDiary & {
  dateDelete: number;
  isClicked: boolean;
};

export type OnChoice<T, R> = (choice: T) => R;

export interface SelectedDate extends ToObjectOutput {}

export interface MultipleDates {
  start: ToObjectOutput;
  end: ToObjectOutput;
}

export type ConfigurableOptions = {
  language?: boolean;
  country?: boolean;
  dateFormat?: boolean;
  timeFormat?: boolean;
  timeZone?: boolean;
  notification?: boolean;
  defaultDuration?: boolean;
  firstDayWeek?: boolean;
  askCurrentPos?: boolean;
};

export type CustomizeView =
  | "2 days"
  | "3 days"
  | "4 days"
  | "5 days"
  | "6 days"
  | "7 days"
  | "2 weeks"
  | "3 weeks"
  | "4 weeks";
export type DisplayMode =
  | "Day"
  | "Week"
  | "Month"
  | "Year"
  | "Planning"
  | CustomizeView;
export type IdTitleModal = "params" | "add" | string;
export type IdNameAdd = "create" | string;
export type IdNameParams =
  | "langageRegion"
  | "timeZone"
  | "worldClock"
  | "eventParams"
  | "notifParams"
  | "optionDisplay"
  | string;
export type IdName = IdNameParams;
export type DateFormat = "JJ/MM/YYYY" | "MM/JJ/YYYY" | "YYYY-MM-JJ";
export type TimeFormat = "13:00" | "1:00pm";
export type FirstDay = "monday" | "saturday" | "sunday";
export type Size = "small" | "medium" | "large";
export type StartEndPeriod = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type WeekNumbers = number;

export type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "Friday"
  | "saturday"
  | "sunday";
export type PeriodRecurrence = "day" | "week" | "month" | "year";
export type EndRecurrenceType = "never" | "afterOccurrence" | "afterDate";

export type IdDiary = string;

export interface Recurrence {
  currentDay: Day;
  period: PeriodRecurrence;
  numbPeriod: number;
  dayRepeat?: Day;
  endRecurrenceType: EndRecurrenceType;
  afterOccurrence: number;
  afterDate: DateTime;
}

export interface Period {
  start: StartEndPeriod | null;
  end: StartEndPeriod | null;
  week: WeekNumbers | null;
}

export interface ColorPicker {
  currentDay: string;
  selectedDay: string;
  hover: string;
}

export type ListEvent = "event" | "service" | "appointment" | "meeting";

export type TypeEvent = {
  event: boolean;
  service: boolean;
  appointment: boolean;
  meeting: boolean;
};

export type PosModal = {
  x: number;
  y: number;
};

export type TimeType = {
  time12: string;
  time24: string;
};

export type ListTime = TimeType[];

declare module "react-color";
