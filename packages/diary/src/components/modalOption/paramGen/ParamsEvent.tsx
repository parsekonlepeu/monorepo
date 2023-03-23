import * as React from "react";
import { SxProps, useTheme, Box, Typography } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../utils/hooks/hooksTypedRedux";
import { Select } from "../../select/Select";
import { OnChoice } from "../../../types";
import { defaultTimeChoice } from "../../../utils/selectChoice";
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

export const ParamsEvent: React.FC = () => {
  const theme = useTheme();

  const defaultDuration = useAppSelector(
    (state) => state.options.defaultDuration
  );

  const dispatch = useAppDispatch();

  const handleSelect: OnChoice<any, void> = (choice) => {
    typeof choice === "string" &&
      dispatch(
        refreshOption({
          key: "defaultDuration",
          value: choice.split(" ")[0],
        })
      );
  };

  return (
    <Box sx={styleContenaire}>
      <Typography
        sx={{
          color: theme.google.onSurfaceVariantAgm,
          ...styleTitle,
        }}
      >
        Parametre des événements
      </Typography>
      <Select
        width="300px"
        title="Durée par défault"
        value={defaultDuration.toString() + " minutes"}
        my="10px"
        choices={defaultTimeChoice}
        onChoice={handleSelect}
      />
    </Box>
  );
};
