import { DateTime } from "luxon";
import { MultipleDates, Period } from "../types";
/**
 * separate multiple date in several
 * pieces according to the dates
 * of the month display if necessary
 * for the display
 * @param multipleDates
 * @param arrayDates
 * @returns
 */
export declare const getDataDisplayPeriod: (multipleDates: MultipleDates | null, arrayDates: DateTime[][]) => Period[];
