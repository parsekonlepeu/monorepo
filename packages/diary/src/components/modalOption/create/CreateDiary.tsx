import * as React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  SxProps,
  useTheme,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { DateTime } from "luxon";
import { Diary, IdDiary, OnChoice } from "../../../types";
import { useAppDispatch } from "../../../utils/hooks/hooksTypedRedux";
import { addDiary, addDiaryDisplay } from "../../../store/slices/diarysSlice";
import { colorsDiarys } from "../../../utils/constants";
import { v4 as uuidv4 } from "uuid";
import { ContextFunctionManage } from "../../../context/context-function-manage";
import { getTimeZoneInit } from "../../../utils/functions/getTimeZoneInit";
import { randomChoiceArray } from "../../../utils/functions/randomChoiceArray";
import { addDiaryRecycleBin } from "../../../store/slices/recycleBinSlice";
import {
  changeSnackbarParams,
  changeSnackbarVisible,
} from "../../../store/slices/generalSlice";
import { Select } from "../../select/Select";
import { refreshOption } from "../../../store/slices/optionsSlice";
import { callFunctionManage } from "../../../utils/functions/callFunctionManage";
declare namespace Intl {
  type Key =
    | "calendar"
    | "collation"
    | "currency"
    | "numberingSystem"
    | "timeZone"
    | "unit";

  function supportedValuesOf(input: Key): string[];
}

interface IFormInputs {
  nomAgenda: string;
  descriptionAgenda: string;
}
const timeZoneInit = getTimeZoneInit();
const timezones = Intl.supportedValuesOf("timeZone")
  .map((timezone) => {
    const spl = timezone.split("/");
    return (
      "(GMT" +
      DateTime.now().setZone(timezone).toString().slice(23) +
      ")" +
      " Heure " +
      spl[0] +
      " - " +
      spl[1]
    );
  })
  .sort();

const styleContenaire: SxProps = {
  pt: "10px",
  pb: "20px",
  width: "500px",
  marginLeft: "auto",
  marginRight: "auto",
};

const styleTitle: SxProps = {
  fontSize: "18px",
  fontWeight: 500,
};

const styleErrorText: SxProps = {
  fontSize: "12px",
  fontWeight: 500,
};

export const CreateDiary: React.FC = (props) => {
  const dispatch = useAppDispatch();

  const functionManage = React.useContext(ContextFunctionManage);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>();

  const theme = useTheme();

  const [timeZone, setTimeZone] = React.useState<string>(timeZoneInit);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const color = randomChoiceArray(colorsDiarys);
    const id = uuidv4() as IdDiary;
    const diaryAdd: Diary = {
      events: [],
      title: data.nomAgenda,
      id: id,
      timezone: timeZone,
      description: data.descriptionAgenda,
      color: color.rgb,
    };
    dispatch(addDiary(diaryAdd));
    dispatch(addDiaryDisplay(id));
    dispatch(
      addDiaryRecycleBin({
        id: id,
        title: data.nomAgenda,
        color: color.rgb,
      })
    );
    dispatch(
      refreshOption({
        key: "modalOption",
        value: false,
      })
    );
    await callFunctionManage(
      functionManage.onAddDiary,
      diaryAdd,
      theme,
      dispatch,
      reset
    );
    // if (functionManage.onAddDiary) {
    //   dispatch(changeSnackbarVisible(true));
    //   dispatch(
    //     changeSnackbarParams({
    //       message: "Actualisation en cours",
    //       key: "Actualisation en cours",
    //       color: "",
    //     })
    //   );
    //   try {
    //     const ret = await functionManage.onAddDiary(diaryAdd);
    //     if (ret.success) {
    //       dispatch(
    //         changeSnackbarParams({
    //           message: ret.messageSnackbar,
    //           key: ret.messageSnackbar,
    //           color: theme.palette.success.main,
    //         })
    //       );
    //       reset();
    //     } else {
    //       dispatch(
    //         changeSnackbarParams({
    //           message: ret.messageSnackbar,
    //           key: ret.messageSnackbar,
    //           color: theme.google.error,
    //         })
    //       );
    //     }
    //   } catch (error) {
    //     dispatch(
    //       changeSnackbarParams({
    //         message: "une erreur s'est produite",
    //         key: "une erreur s'est produite",
    //         color: theme.google.error,
    //       })
    //     );
    //   }
    // }
  };

  const handleChangeTimeZone: OnChoice<any, void> = React.useCallback(
    (choice) => {
      typeof choice === "string" && setTimeZone(choice);
    },
    []
  );

  const styleTextField = {
    mt: "10px",
    width: "308px",
    "& .MuiFilledInput-root": {
      borderRadius: "5px",
      ":hover": {
        bgcolor: theme.google.textfieldSurface,
        "::before": {
          borderBottom: "0px",
        },
      },
      "::before": {
        borderBottom: "0px",
      },
    },
  };

  return (
    <Box sx={styleContenaire}>
      <Typography
        sx={{
          color: theme.google.onSurfaceVariantAgm,
          ...styleTitle,
        }}
      >
        Créer un agenda
      </Typography>
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Controller
            name="nomAgenda"
            control={control}
            defaultValue={""}
            rules={{
              required: "le nom de l'agenda est obligatoire",
              maxLength: {
                value: 15,
                message: "maximum 15 caractères pour le nom",
              },
            }}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={errors.nomAgenda ? true : false}
                  label="Nom"
                  variant="filled"
                  sx={styleTextField}
                />
              );
            }}
          />
        </div>
        {errors.nomAgenda ? (
          errors.nomAgenda.type === "required" ? (
            <Typography sx={{ ...styleErrorText, color: theme.google.error }}>
              {errors.nomAgenda.message}
            </Typography>
          ) : errors.nomAgenda.type === "maxLength" ? (
            <Typography sx={{ ...styleErrorText, color: theme.google.error }}>
              {errors.nomAgenda.message}
            </Typography>
          ) : null
        ) : null}
        <div>
          <Controller
            name="descriptionAgenda"
            control={control}
            defaultValue={""}
            rules={{
              required: false,
              maxLength: {
                value: 500,
                message: "maximum 500 caractères pour la description",
              },
            }}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={errors.descriptionAgenda ? true : false}
                  label="Description"
                  variant="filled"
                  multiline
                  rows={5}
                  sx={styleTextField}
                />
              );
            }}
          />
        </div>
        {errors.descriptionAgenda ? (
          errors.descriptionAgenda.type === "maxLength" ? (
            <Typography sx={{ ...styleErrorText, color: theme.google.error }}>
              {errors.descriptionAgenda.message}
            </Typography>
          ) : null
        ) : null}
        <Select
          width="300px"
          title="Fuseau horaire"
          value={timeZone}
          my="10px"
          choices={timezones}
          onChoice={handleChangeTimeZone}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: theme.google.primary,
            ":hover": {
              bgcolor: theme.google.textfieldPrimary,
            },
            textTransform: "none",
            fontSize: "0.875rem",
          }}
        >
          Créer l'agenda
        </Button>
      </Box>
    </Box>
  );
};
