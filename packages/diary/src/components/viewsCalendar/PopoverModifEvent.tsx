import * as React from "react";
import { Popover, IconButton, useTheme } from "@mui/material";
import { AnchorOrigin, EventDiary, TransformOrigin } from "../../types";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import { DateTime } from "luxon";
import { useAppSelector } from "../../utils/hooks/hooksTypedRedux";
import { WithPopper } from "../withPopper/WithPopper";
import { SectionPopoverModifEvent } from "./SectionPopoverModifEvent";
import { css } from "@emotion/react";

const popoverModifEventCss = {
  mainContenair: css({
    minWidth: "350px",
    maxWidth: "450px",
    padding: "5px",
  }),
  topContenair: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  }),
};

interface PopoverModifEventProps {
  anchorOrigin: AnchorOrigin;
  transformOrigin: TransformOrigin;
  open: boolean;
  onClickDelete: React.MouseEventHandler<HTMLButtonElement>;
  onClose: () => void;
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
  event: EventDiary;
}

export const PopoverModifEvent: React.FC<PopoverModifEventProps> = ({
  anchorOrigin,
  transformOrigin,
  open,
  onClickDelete,
  onClose,
  anchorEl,
  event,
}) => {
  const diarys = useAppSelector((state) => state.diarys.diarys);
  const title = event.title === "" ? "(Sans Titre)" : event.title;
  const startDt = DateTime.fromObject(event.start);
  const endDt = DateTime.fromObject(event.start).plus({
    minutes: event.duration,
  });
  const diff = endDt.diff(startDt).toObject().minutes;
  const allDay = event.allDay || (diff && diff >= 24 * 60);
  const nameDiary = diarys.find((diary) => diary.id === event.idDiary)?.title;

  const preventDefault = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Popover
      id={"popover-modif-event"}
      open={open}
      onClose={onClose}
      transformOrigin={transformOrigin}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
    >
      <div
        css={popoverModifEventCss.mainContenair}
        onPointerDown={preventDefault}
      >
        <div css={popoverModifEventCss.topContenair}>
          <WithPopper textDisplay="Modifier l'evenement">
            <IconButton>
              <ModeEditOutlineOutlinedIcon
                fontSize="small"
                sx={{ mr: "10px" }}
              />
            </IconButton>
          </WithPopper>
          <WithPopper textDisplay="Supprimer l 'évenement">
            <IconButton onClick={onClickDelete}>
              <DeleteOutlineRoundedIcon fontSize="small" sx={{ mr: "10px" }} />
            </IconButton>
          </WithPopper>
          <WithPopper textDisplay="Fermer">
            <IconButton onClick={onClose}>
              <CloseRoundedIcon fontSize="small" />
            </IconButton>
          </WithPopper>
        </div>
        <SectionPopoverModifEvent
          childrens={[
            <ForInfoColor color={event.color} />,
            <TitlePopover
              title={title}
              startDt={startDt}
              endDt={endDt}
              allDay={allDay}
            />,
          ]}
        />
        {event.place !== "" && (
          <SectionPopoverModifEvent
            childrens={[<RoomOutlinedIcon />, <p>{event.place}</p>]}
          />
        )}
        {event.description !== "" && (
          <SectionPopoverModifEvent
            childrens={[<NotesRoundedIcon />, <p>{event.description}</p>]}
          />
        )}
        <SectionPopoverModifEvent
          childrens={[<EventRoundedIcon />, <p>{nameDiary}</p>]}
        />
      </div>
    </Popover>
  );
};

interface TitlePopoverProps {
  title: string;
  startDt: DateTime;
  allDay: boolean | 0 | undefined;
  endDt: DateTime;
}

const TitlePopover: React.FC<TitlePopoverProps> = ({
  title,
  startDt,
  allDay,
  endDt,
}) => {
  const theme = useTheme();
  return (
    <>
      <p
        css={{
          fontWeight: 600,
          color: theme.google.onSurface,
        }}
      >
        {title}
      </p>
      <p
        css={{
          fontSize: "14px",
        }}
      >
        du{" "}
        {startDt.toLocaleString({
          day: "2-digit",
          month: "long",
          weekday: "long",
          hour: allDay ? undefined : "numeric",
          minute: allDay ? undefined : "numeric",
        })}
      </p>
      <p
        css={{
          fontSize: "14px",
        }}
      >
        au{" "}
        {endDt.toLocaleString({
          day: "2-digit",
          month: "long",
          weekday: "long",
          hour: allDay ? undefined : "numeric",
          minute: allDay ? undefined : "numeric",
        })}
      </p>
    </>
  );
};

interface ForInfoColorProps {
  color: string;
}

const ForInfoColor: React.FC<ForInfoColorProps> = ({ color }) => {
  return (
    <div
      css={{
        backgroundColor: color,
        width: "20px",
        height: "20px",
        borderRadius: "5px",
      }}
    />
  );
};
