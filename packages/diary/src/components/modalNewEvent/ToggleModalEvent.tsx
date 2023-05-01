import * as React from "react";
import { Divider, SxProps, TextField, ToggleButton } from "@mui/material";
import {
  changeTagModalNewEvent,
  modifEventTempDiary,
} from "../../store/slices/diarysSlice";
import { ListEvent } from "../../types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import { ApointmentData } from "./ApointmentData";
import { EventData } from "./EventData";
import { MeetingData } from "./MeetingData";
import { ServiceData } from "./ServiceData";
import { css } from "@emotion/react";
import { Controller, useForm } from "react-hook-form";

interface IFormInputs {
  titleEvent: string;
}

const styleTextField: SxProps = {
  my: "15px",
  width: "calc(100% - 80px)",
  "& .MuiInputBase-input": {
    borderRadius: "5px",
    color: "black",
    fontSize: "22px",
    fontWeight: 600,
    opacity: 1,
  },
};

const styleButtonToggle: SxProps = {
  marginRight: "15px",
  height: "36px",
};

const toggleModalEventCss = {
  mainContenair: css({
    display: "flex",
    flexDirection: "column",
    paddingLeft: "70px",
    marginBottom: "10px",
  }),
  toggleContenair: css({
    marginTop: "10px",
    marginBottom: "10px",
  }),
};

export const ToggleModalEvent: React.FC = () => {
  const dispatch = useAppDispatch();
  const typeEvent = useAppSelector((state) => state.options.typeEvent);
  const listServices = useAppSelector((state) => state.general.listServices);
  const tag = useAppSelector((state) => state.diarys.tagModalNewEvent);

  const {
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onBlur",
  });

  React.useEffect(() => {
    return () => {
      if (typeEvent.event) {
        dispatch(changeTagModalNewEvent("event"));
      } else if (typeEvent.service) {
        dispatch(changeTagModalNewEvent("service"));
      } else if (typeEvent.appointment) {
        dispatch(changeTagModalNewEvent("appointment"));
      } else {
        dispatch(changeTagModalNewEvent("meeting"));
      }
    };
  }, []);

  const handleChangeToggleButton = React.useCallback(
    (event: React.MouseEvent<HTMLElement>, newtag: ListEvent) => {
      dispatch(
        modifEventTempDiary({
          keys: ["type"],
          values: [newtag],
        })
      );
      dispatch(changeTagModalNewEvent(newtag));
    },
    []
  );

  return (
    <div css={toggleModalEventCss.mainContenair}>
      <div css={toggleModalEventCss.toggleContenair}>
        {typeEvent.event && (
          <ToggleButton
            value="event"
            selected={tag === "event"}
            onChange={handleChangeToggleButton}
            sx={styleButtonToggle}
          >
            Événement
          </ToggleButton>
        )}
        {typeEvent.service && listServices.length !== 0 && (
          <ToggleButton
            onChange={handleChangeToggleButton}
            value="service"
            sx={styleButtonToggle}
            selected={tag === "service"}
          >
            Prestation
          </ToggleButton>
        )}
        {typeEvent.appointment && (
          <ToggleButton
            onChange={handleChangeToggleButton}
            selected={tag === "appointment"}
            value="appointment"
            sx={styleButtonToggle}
          >
            Rendez-vous
          </ToggleButton>
        )}
        {typeEvent.meeting && (
          <ToggleButton
            onChange={handleChangeToggleButton}
            value="meeting"
            sx={styleButtonToggle}
            selected={tag === "meeting"}
          >
            Réunion
          </ToggleButton>
        )}
      </div>
      <Divider sx={{ width: "50%" }} />
      {tag != "service" ? (
        <Controller
          name="titleEvent"
          control={control}
          defaultValue={""}
          rules={{
            maxLength: {
              value: 20,
              message: "maximum 20 caractères pour le nom",
            },
          }}
          render={({ field }) => {
            return (
              <TextField
                id="textfield-title-new-event"
                autoFocus
                placeholder="Ajouter un titre"
                {...field}
                size="small"
                error={errors.titleEvent ? true : false}
                sx={styleTextField}
                variant="standard"
              />
            );
          }}
        />
      ) : null}
      <Divider sx={{ width: "50%" }} />
      {tag === "event" ? (
        <EventData />
      ) : tag === "service" ? (
        <ServiceData />
      ) : tag === "appointment" ? (
        <ApointmentData />
      ) : tag === "meeting" ? (
        <MeetingData />
      ) : null}
    </div>
  );
};
