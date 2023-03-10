import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { SxProps, TextField, useTheme } from "@mui/material";
import FormatAlignLeftRoundedIcon from "@mui/icons-material/FormatAlignLeftRounded";
import { useAppDispatch } from "../../utils/hooks/hooksTypedRedux";
import { modifEventTempDiary } from "../../store/slices/diarysSlice";
import { css } from "@emotion/react";
import { WIDTH_MODAL_NEW_EVENT } from "../../utils/constants";

const styleTextField: SxProps = {
  my: "10px",
  width: "calc(100% - 80px)",
};

const addDescriptionCss = {
  mainContenair: css({
    display: "flex",
    flexDirection: "row",
  }),
  iconContenair: css({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "70px",
  }),
  descriptionContenair: css({
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

interface IFormInputs {
  description: string;
}

export const AddDescription: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const {
    control,
    formState: { errors },
  } = useForm<IFormInputs>({
    mode: "onBlur",
  });

  const handleChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    dispatch(
      modifEventTempDiary({
        keys: ["description"],
        values: [event.target.value],
      })
    );
  };

  return (
    <div css={addDescriptionCss.mainContenair}>
      <div css={addDescriptionCss.iconContenair}>
        <FormatAlignLeftRoundedIcon />
      </div>
      <div
        css={[
          addDescriptionCss.descriptionContenair,
          {
            color: theme.google.onSurfaceVariantAgm,
            "& p": {
              color: theme.google.error,
            },
          },
        ]}
      >
        <Controller
          name="description"
          control={control}
          defaultValue={""}
          rules={{
            maxLength: {
              value: 5,
              message: "maximum 500 caractères pour la description",
            },
          }}
          render={(props) => {
            return (
              <TextField
                id="textfeild-description-new-event"
                multiline
                rows={4}
                label="Ajouter une description"
                // {...props}
                onChange={(value) => {
                  props.field.onChange(value);
                  handleChange(value);
                }}
                size="small"
                type={"text"}
                error={errors.description ? true : false}
                sx={styleTextField}
                variant="outlined"
              />
            );
          }}
        />
        {errors.description ? <p>{errors.description.message}</p> : null}
      </div>
    </div>
  );
};
