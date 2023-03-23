import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { AddLocationAltOutlined } from "@mui/icons-material";
import { SxProps, TextField, useTheme } from "@mui/material";
import { css } from "@emotion/react";
import { WIDTH_MODAL_NEW_EVENT } from "../../utils/constants";

interface IFormInputs {
  placeEvent: string;
}

const styleTextField: SxProps = {
  my: "10px",
  width: "calc(100% - 80px)",
};

const addPlaceCss = {
  mainContenair: css({
    display: "flex",
    flexDirection: "row",
  }),
  iconConteniar: css({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "70px",
  }),
  placeContenair: css({
    paddingRight: "10px",
    minWidth: `${WIDTH_MODAL_NEW_EVENT}px`,
    display: "flex",
    flexDirection: "column",
    "& p": {
      margin: "0px",
      padding: "0px",
      marginBottom: "10px",
      fontSize: "12px",
    },
  }),
};

export const AddPlace: React.FC = () => {
  const theme = useTheme();
  const {
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onBlur",
  });

  return (
    <div css={addPlaceCss.mainContenair}>
      <div css={addPlaceCss.iconConteniar}>
        <AddLocationAltOutlined />
      </div>
      <div
        css={[
          addPlaceCss.placeContenair,
          {
            color: theme.google.onSurfaceVariantAgm,
            "& p": {
              color: theme.google.error,
            },
          },
        ]}
      >
        <Controller
          name="placeEvent"
          control={control}
          defaultValue={""}
          rules={{
            maxLength: {
              value: 100,
              message: "maximum 100 caractères pour le lieu",
            },
          }}
          render={({ field }) => {
            return (
              <TextField
                id="textefield-choice-place-new-event"
                label="Ajouter un lieu"
                // {...field}
                size="small"
                error={errors.placeEvent ? true : false}
                sx={styleTextField}
                variant="outlined"
              />
            );
          }}
        />
        {errors.placeEvent ? <p>{errors.placeEvent.message}</p> : null}
      </div>
    </div>
  );
};
