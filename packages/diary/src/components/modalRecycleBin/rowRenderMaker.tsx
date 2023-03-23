import * as React from "react";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { ListRowRenderer } from "react-virtualized";
import { EventDiary, EventDiaryDelete, RecycleBinDiary } from "../../types";
import {
  changeOnClickEvent,
  delClickedEventRecycleBin,
  delEventRecycleBin,
} from "../../store/slices/recycleBinSlice";
import { addEvent, addEventMultiple } from "../../store/slices/diarysSlice";
import { EventListContenair } from "./EventListContenair";
import { DateTime } from "luxon";
import { AppDispatch } from "../../store/store";
import { css } from "@emotion/react";

const forClearCss = css({
  flex: 1,
  maxHeight: "50px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingRight: "10px",
  paddingLeft: "10px",
});

export const rowRenderMaker: (
  recycleBinList: RecycleBinDiary[],
  diaryCliked: any,
  delAllEvent: any,
  dispatch: AppDispatch,
  list: (number | boolean | EventDiaryDelete)[],
  handleClickCheckboxAll: (e: React.ChangeEvent<HTMLInputElement>) => void
) => ListRowRenderer =
  (
    recycleBinList,
    diaryCliked,
    delAllEvent,
    dispatch,
    list,
    handleClickCheckboxAll
  ) =>
  ({ index, key, style }) => {
    if (index === 0) {
      return (
        <div
          key={key}
          style={style}
        >
          <div css={forClearCss}>
            <p>
              Les évenements placés dans la corbeille sont supprimés au bout de{" "}
              {"x"} jours
            </p>
            <Button
              sx={{ textTransform: "none" }}
              variant="text"
              startIcon={<Delete />}
              onClick={delAllEvent}
            >
              Vider la corbeille
            </Button>
          </div>
        </div>
      );
    } else if (index === 1) {
      let numberCheck = 0;
      const indexDiary = recycleBinList.findIndex(
        (diary) => diary.idDiary === diaryCliked
      );
      for (const event of recycleBinList[indexDiary].listEventDelete) {
        if (event.isClicked) {
          numberCheck++;
        }
      }
      const handleOnDelete = () => {
        dispatch(delClickedEventRecycleBin(diaryCliked));
      };
      const handleOnRestore = () => {
        let listRestore: EventDiary[] = [];
        for (const event of recycleBinList[indexDiary].listEventDelete) {
          if (event.isClicked) {
            listRestore.push({
              color: event.color,
              title: event.title,
              id: event.id,
              start: event.start,
              startUnixInteger: event.startUnixInteger,
              duration: event.duration,
              nameClient: event.nameClient,
              allDay: event.allDay,
              type: event.type,
              place: event.place,
              description: event.description,
              custom: event.custom,
              nbRecurrence: event.nbRecurrence,
              idDiary: event.idDiary,
            });
          }
        }
        dispatch(addEventMultiple(listRestore));
        dispatch(delClickedEventRecycleBin(diaryCliked));
      };
      return (
        <div
          key={key}
          style={style}
        >
          <EventListContenair
            type="top"
            onClickCheckbox={handleClickCheckboxAll}
            onDelete={handleOnDelete}
            onRestore={handleOnRestore}
            date={"DATE"}
            hours={"HORAIRE"}
            title={"TITRE"}
            organizer={"ORGANISATEUR"}
            dateDelete={"DATE DE SUPPRESSION"}
            isCheck={list[index] as boolean}
            numberCheck={numberCheck}
          />
        </div>
      );
    } else {
      const event = list[index] as EventDiaryDelete;
      const startDt = DateTime.fromObject(event.start);
      const date = startDt.toLocaleString(DateTime.DATE_FULL);
      const hours =
        event.duration > 24 * 60 || event.allDay
          ? "Toute la journée"
          : startDt
              .plus({
                minutes: event.duration,
              })
              .toLocaleString(DateTime.TIME_24_SIMPLE);
      const title = event.title !== "" ? event.title : "(Sans titre)";
      const dateDelete = DateTime.fromMillis(
        event.dateDelete * 1000
      ).toLocaleString(DateTime.DATE_FULL);

      const handleClickEvent: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(
          changeOnClickEvent({
            idDiary: event.idDiary,
            idEvent: event.id,
          })
        );
      };

      const handleDeleteEvent: React.MouseEventHandler<HTMLButtonElement> = (
        e
      ) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(delEventRecycleBin(event));
      };

      const handleRestoreEvent: React.MouseEventHandler<HTMLButtonElement> = (
        e
      ) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(delEventRecycleBin(event));
        dispatch(
          addEvent({
            color: event.color,
            title: event.title,
            id: event.id,
            start: event.start,
            startUnixInteger: event.startUnixInteger,
            duration: event.duration,
            nameClient: event.nameClient,
            allDay: event.allDay,
            type: event.type,
            place: event.place,
            description: event.description,
            custom: event.custom,
            nbRecurrence: event.nbRecurrence,
            idDiary: event.idDiary,
          })
        );
      };
      return (
        <div
          key={key}
          style={style}
        >
          <EventListContenair
            type="content"
            onClick={handleClickEvent}
            onDelete={handleDeleteEvent}
            onRestore={handleRestoreEvent}
            date={date}
            hours={hours}
            title={title}
            organizer={diaryCliked}
            dateDelete={dateDelete}
            isCheck={event.isClicked}
          />
        </div>
      );
    }
  };
