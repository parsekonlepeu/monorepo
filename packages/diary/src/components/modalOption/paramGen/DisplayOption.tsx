import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SxProps, useTheme } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/hooks/hooksTypedRedux";
import { Select } from "../../select/Select";
import { CustomizeView, FirstDay, OnChoice } from "../../../types";
import { refreshOption } from "../../../store/slices/optionsSlice";

const choicePersoView = [
  "2 jours",
  "3 jours",
  "4 jours",
  "5 jours",
  "6 jours",
  "1 jours",
  "2 semaines",
  "3 semaines",
  "4 semaines",
];

const choiceFisrtDay = ["Samedi", "Dimanche", "Lundi"];

const styleContenaire: SxProps = {
  display: "block",
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

export const DisplayOption: React.FC = () => {
  const theme = useTheme();

  const firstDayWeek = useAppSelector((state) => state.options.firstDayWeek);
  const customizeView = useAppSelector((state) => state.options.customizeView);

  const dispatch = useAppDispatch();

  const handleOnChoiceVP: OnChoice<string, void> = React.useCallback(
    (choice) => {
      switch (choice) {
        case "2 jours":
          dispatch(
            refreshOption({
              key: "customizeView",
              value: "2 days",
            })
          );
          break;
        case "3 jours":
          dispatch(
            refreshOption({
              key: "customizeView",
              value: "3 days",
            })
          );
          break;
        case "4 jours":
          dispatch(
            refreshOption({
              key: "customizeView",
              value: "4 days",
            })
          );
          break;
        case "5 jours":
          dispatch(
            refreshOption({
              key: "customizeView",
              value: "5 days",
            })
          );
          break;
        case "6 jours":
          dispatch(
            refreshOption({
              key: "customizeView",
              value: "6 days",
            })
          );
          break;
        case "7 jours":
          dispatch(
            refreshOption({
              key: "customizeView",
              value: "7 days",
            })
          );
          break;
        case "2 semaines":
          dispatch(
            refreshOption({
              key: "customizeView",
              value: "2 weeks",
            })
          );
          break;
        case "3 semaines":
          dispatch(
            refreshOption({
              key: "customizeView",
              value: "3 weeks",
            })
          );
          break;
        case "4 semaines":
          dispatch(
            refreshOption({
              key: "customizeView",
              value: "4 weeks",
            })
          );
          break;
      }
    },
    []
  );

  const handleOnChoiceFD: OnChoice<string, void> = React.useCallback(
    (choice) => {
      switch (choice) {
        case "Lundi":
          dispatch(
            refreshOption({
              key: "firstDayWeek",
              value: "monday",
            })
          );
          break;
        case "Samedi":
          dispatch(
            refreshOption({
              key: "firstDayWeek",
              value: "saturday",
            })
          );
          break;
        case "Dimanche":
          dispatch(
            refreshOption({
              key: "firstDayWeek",
              value: "sunday",
            })
          );
          break;
      }
    },
    []
  );

  const valueFirstDay: OnChoice<FirstDay, string> = React.useCallback(
    (firstDayWeek) => {
      switch (firstDayWeek) {
        case "monday":
          return "Lundi";
        case "saturday":
          return "Samedi";
        case "sunday":
          return "Dimanche";
      }
    },
    []
  );

  const valuePeriod: OnChoice<CustomizeView, string> = React.useCallback(
    (customizeView) => {
      switch (customizeView) {
        case "2 days":
          return "2 jours";
        case "3 days":
          return "3 jours";
        case "4 days":
          return "4 jours";
        case "5 days":
          return "5 jours";
        case "6 days":
          return "6 jours";
        case "7 days":
          return "7 jours";
        case "2 weeks":
          return "2 semaines";
        case "3 weeks":
          return "3 semaines";
        case "4 weeks":
          return "4 semaines";
      }
    },
    []
  );

  return (
    <Box sx={styleContenaire}>
      <Typography
        sx={{
          color: theme.google.onSurfaceVariantAgm,
          ...styleTitle,
        }}
      >
        Options d'affichage
      </Typography>
      <Select
        width="300px"
        title="Premier jour de la semaine"
        value={valueFirstDay(firstDayWeek)}
        my="10px"
        choices={choiceFisrtDay}
        onChoice={handleOnChoiceFD}
      />
      <Select
        width="300px"
        title="Définir la vue personnalisée"
        value={valuePeriod(customizeView)}
        my="10px"
        choices={choicePersoView}
        onChoice={handleOnChoiceVP}
      />
    </Box>
  );
};
