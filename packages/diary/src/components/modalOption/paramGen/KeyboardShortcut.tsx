import * as React from "react";
import {
  SxProps,
  useTheme,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/hooks/hooksTypedRedux";
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

export const KeyboardShortcut: React.FC = () => {
  const theme = useTheme();

  const keyboardShortcut = useAppSelector(
    (state) => state.options.keyboardShortcut
  );

  const dispatch = useAppDispatch();

  const handleChange = React.useCallback(() => {
    dispatch(
      refreshOption({
        key: "keyboardShortcut",
        value: !keyboardShortcut,
      })
    );
  }, [keyboardShortcut]);

  return (
    <Box sx={styleContenaire}>
      <Typography
        sx={{
          color: theme.google.onSurfaceVariantAgm,
          ...styleTitle,
        }}
      >
        Raccourcis clavier
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={keyboardShortcut}
            onChange={handleChange}
          />
        }
        label={
          <Typography
            sx={{
              fontSize: "14px",
            }}
          >
            Activer les raccourcis clavier
          </Typography>
        }
      />
      <Typography
        sx={{
          fontSize: "12px",
        }}
      >
        Appuyer sur le point d'interrogation (?) pour afficher la liste des
        raccourcis clavier disponibles
      </Typography>
    </Box>
  );
};
