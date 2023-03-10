import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { SxProps, useTheme } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/hooks/hooksTypedRedux";
import { Select } from "../../select/Select";
import { DateTime } from "luxon";
import { OnChoice } from "../../../types";
import { refreshOption } from "../../../store/slices/optionsSlice";

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

export const TimeZone: React.FC = () => {
  const theme = useTheme();

  const timeZone = useAppSelector((state) => state.options.timeZone);
  const askCurrentPos = useAppSelector((state) => state.options.askCurrentPos);

  const dispatch = useAppDispatch();

  const handleTimeZone: OnChoice<string, void> = React.useCallback((choice) => {
    dispatch(
      refreshOption({
        key: "timeZone",
        value: choice,
      })
    );
  }, []);

  const handleCheckedAsk = React.useCallback(() => {
    dispatch(
      refreshOption({
        key: "askCurrentPos",
        value: !askCurrentPos,
      })
    );
  }, [askCurrentPos]);

  return (
    <Box sx={styleContenaire} id="time-zone">
      <Typography
        sx={{
          color: theme.google.onSurfaceVariantAgm,
          ...styleTitle,
        }}
      >
        Fuseau horaire
      </Typography>
      <Select
        width="400px"
        title="Format horaire"
        value={timeZone}
        my="10px"
        choices={timezones}
        onChoice={handleTimeZone}
      />
      <FormControlLabel
        control={
          <Checkbox checked={askCurrentPos} onChange={handleCheckedAsk} />
        }
        label={
          <Typography
            sx={{
              fontSize: "14px",
            }}
          >
            Demander à utiliser la position actuelle comme fuseau horaire
            principal
          </Typography>
        }
      />
    </Box>
  );
};
