import * as React from "react";
import { Divider, SxProps, TextField, ToggleButton } from "@mui/material";
import { modifEventTempDiary } from "../../store/slices/diarysSlice";
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

  const [alignment, setAlignement] = React.useState<ListEvent>(
    typeEvent.event
      ? "event"
      : typeEvent.service
      ? "service"
      : typeEvent.appointment
      ? "appointment"
      : "meeting"
  );

  const {
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onBlur",
  });

  const handleChangeToggleButton = React.useCallback(
    (event: React.MouseEvent<HTMLElement>, newAlignment: ListEvent) => {
      dispatch(
        modifEventTempDiary({
          keys: ["type"],
          values: [newAlignment],
        })
      );
      setAlignement(newAlignment);
    },
    []
  );

  return (
    <div css={toggleModalEventCss.mainContenair}>
      <div css={toggleModalEventCss.toggleContenair}>
        {typeEvent.event && (
          <ToggleButton
            value="event"
            selected={alignment === "event"}
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
            selected={alignment === "service"}
          >
            Prestation
          </ToggleButton>
        )}
        {typeEvent.appointment && (
          <ToggleButton
            onChange={handleChangeToggleButton}
            selected={alignment === "appointment"}
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
            selected={alignment === "meeting"}
          >
            Réunion
          </ToggleButton>
        )}
      </div>
      <Divider sx={{ width: "50%" }} />
      {alignment != "service" ? (
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
      {alignment === "event" ? (
        <EventData />
      ) : alignment === "service" ? (
        <ServiceData />
      ) : alignment === "appointment" ? (
        <ApointmentData />
      ) : alignment === "meeting" ? (
        <MeetingData />
      ) : null}
    </div>
  );
};
