import * as React from "react";
import { CalendarProps } from "..";
import { refreshDiarys } from "../store/slices/diarysSlice";
import { refreshListServices } from "../store/slices/generalSlice";
import { refreshOption } from "../store/slices/optionsSlice";
import { refreshRecycleBin } from "../store/slices/recycleBinSlice";
import { useAppDispatch } from "../utils/hooks/hooksTypedRedux";

export const useRefreshStoreWithProps = (props: CalendarProps) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    props.withRecycledBin &&
      dispatch(
        refreshOption({
          key: "withRecycledBin",
          value: props.withRecycledBin,
        })
      );
  }, [props.withRecycledBin]);

  React.useEffect(() => {
    props.withSearch &&
      dispatch(
        refreshOption({
          key: "withSearch",
          value: props.withSearch,
        })
      );
  }, [props.withSearch]);

  React.useEffect(() => {
    props.withMoveEvent &&
      dispatch(
        refreshOption({
          key: "withMoveEvent",
          value: props.withMoveEvent,
        })
      );
  }, [props.withMoveEvent]);

  React.useEffect(() => {
    props.configurableOptions &&
      dispatch(
        refreshOption({
          key: "configurableOptions",
          value: props.configurableOptions,
        })
      );
  }, [props.configurableOptions]);

  React.useEffect(() => {
    props.typeEvent &&
      dispatch(
        refreshOption({
          key: "typeEvent",
          value: props.typeEvent,
        })
      );
  }, [props.typeEvent]);

  React.useEffect(() => {
    props.canAddEvent &&
      dispatch(
        refreshOption({
          key: "canMoveEvent",
          value: props.canAddEvent,
        })
      );
  }, [props.canAddEvent]);

  React.useEffect(() => {
    props.canRemoveEvent &&
      dispatch(
        refreshOption({
          key: "canMoveEvent",
          value: props.canRemoveEvent,
        })
      );
  }, [props.canRemoveEvent]);

  React.useEffect(() => {
    props.canModifEvent &&
      dispatch(
        refreshOption({
          key: "canMoveEvent",
          value: props.canModifEvent,
        })
      );
  }, [props.canModifEvent]);

  React.useEffect(() => {
    props.canAddDiary &&
      dispatch(
        refreshOption({
          key: "canMoveEvent",
          value: props.canAddDiary,
        })
      );
  }, [props.canAddDiary]);

  React.useEffect(() => {
    props.canRemoveDiary &&
      dispatch(
        refreshOption({
          key: "canMoveEvent",
          value: props.canRemoveDiary,
        })
      );
  }, [props.canRemoveDiary]);

  React.useEffect(() => {
    props.language &&
      dispatch(
        refreshOption({
          key: "language",
          value: props.language,
        })
      );
  }, [props.language]);

  React.useEffect(() => {
    props.country &&
      dispatch(
        refreshOption({
          key: "country",
          value: props.country,
        })
      );
  }, [props.country]);

  React.useEffect(() => {
    props.dateFormat &&
      dispatch(
        refreshOption({
          key: "dateFormat",
          value: props.dateFormat,
        })
      );
  }, [props.dateFormat]);

  React.useEffect(() => {
    props.timeFormat &&
      dispatch(
        refreshOption({
          key: "timeFormat",
          value: props.timeFormat,
        })
      );
  }, [props.timeFormat]);

  React.useEffect(() => {
    props.timeZone &&
      dispatch(
        refreshOption({
          key: "timeZone",
          value: props.timeZone,
        })
      );
  }, [props.timeZone]);

  React.useEffect(() => {
    props.defaultDuration &&
      dispatch(
        refreshOption({
          key: "defaultDuration",
          value: props.defaultDuration,
        })
      );
  }, [props.defaultDuration]);

  React.useEffect(() => {
    props.firstDayWeek &&
      dispatch(
        refreshOption({
          key: "firstDayWeek",
          value: props.firstDayWeek,
        })
      );
  }, [props.firstDayWeek]);

  React.useEffect(() => {
    props.customizeView &&
      dispatch(
        refreshOption({
          key: "customizeView",
          value: props.customizeView,
        })
      );
  }, [props.customizeView]);

  React.useEffect(() => {
    props.askCurrentPos &&
      dispatch(
        refreshOption({
          key: "askCurrentPos",
          value: props.askCurrentPos,
        })
      );
  }, [props.askCurrentPos]);

  React.useEffect(() => {
    props.diarys && dispatch(refreshDiarys(props.diarys));
  }, [props.diarys]);

  React.useEffect(() => {
    props.recycledBin && dispatch(refreshRecycleBin(props.recycledBin));
  }, [props.recycledBin]);

  React.useEffect(() => {
    props.listServices && dispatch(refreshListServices(props.listServices));
  }, [props.listServices]);
};
