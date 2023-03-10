import { DateTime } from "luxon";

export const getTimeZoneInit = (): string => {
  const zoneName = DateTime.local().zoneName.split("/");

  const timeZoneInitial =
    "(GMT" +
    DateTime.now().toString().slice(23) +
    ")" +
    " Heure " +
    zoneName[0] +
    " - " +
    zoneName[1];

  return timeZoneInitial;
};
