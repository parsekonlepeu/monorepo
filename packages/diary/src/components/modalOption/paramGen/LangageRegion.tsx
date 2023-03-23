import * as React from "react";
import { SxProps, useTheme, Box, Typography } from "@mui/material";
import { Select } from "../../select/Select";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/hooks/hooksTypedRedux";
import { OnChoice } from "../../../types";
import {
  countryChoice,
  dateFormatChoice,
  langageChoice,
  timeFormatChoice,
} from "../../../utils/selectChoice";
import { refreshOption } from "../../../store/slices/optionsSlice";

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

export const LangageRegion: React.FC = () => {
  const ref = React.createRef<HTMLElement>();

  const theme = useTheme();

  const language = useAppSelector((state) => state.options.language);
  const country = useAppSelector((state) => state.options.country);
  const dateFormat = useAppSelector((state) => state.options.dateFormat);
  const timeFormat = useAppSelector((state) => state.options.timeFormat);

  const dispatch = useAppDispatch();

  const handleChangeLangage: OnChoice<string, void> = React.useCallback(
    (choice) => {
      dispatch(
        refreshOption({
          key: "language",
          value: choice,
        })
      );
    },
    []
  );

  const handleChangeCountry: OnChoice<string, void> = React.useCallback(
    (choice) => {
      dispatch(
        refreshOption({
          key: "country",
          value: choice,
        })
      );
    },
    []
  );

  const handleDateFormat: OnChoice<string, void> = React.useCallback(
    (choice) => {
      dispatch(
        refreshOption({
          key: "dateFormat",
          value: choice,
        })
      );
    },
    []
  );

  const handleTimeFormat: OnChoice<string, void> = React.useCallback(
    (choice) => {
      dispatch(
        refreshOption({
          key: "timeFormat",
          value: choice,
        })
      );
    },
    []
  );

  return (
    <Box
      sx={styleContenaire}
      ref={ref}
    >
      <Typography
        sx={{
          color: theme.google.onSurfaceVariantAgm,
          ...styleTitle,
        }}
      >
        Langue et région
      </Typography>
      <Select
        width="300px"
        title="Langue"
        value={language}
        my="10px"
        choices={langageChoice}
        onChoice={handleChangeLangage}
      />
      <Select
        width="300px"
        title="Pays"
        value={country}
        my="10px"
        choices={countryChoice}
        onChoice={handleChangeCountry}
      />
      <Select
        width="300px"
        title="Format de date"
        value={dateFormat}
        my="10px"
        choices={dateFormatChoice}
        onChoice={handleDateFormat}
      />
      <Select
        width="300px"
        title="Format horaire"
        value={timeFormat}
        my="10px"
        choices={timeFormatChoice}
        onChoice={handleTimeFormat}
      />
    </Box>
  );
};
