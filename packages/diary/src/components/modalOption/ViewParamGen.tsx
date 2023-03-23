import * as React from "react";
import { SxProps, useTheme, Box } from "@mui/material";
import { LangageRegion } from "./paramGen/LangageRegion";
import { TimeZone } from "./paramGen/TimeZone";
import { ParamsEvent } from "./paramGen/ParamsEvent";
import { DisplayOption } from "./paramGen/DisplayOption";
import { KeyboardShortcut } from "./paramGen/KeyboardShortcut";

const styleContenaire: SxProps = {
  flex: 1,
  // height: "100%",
  mr: "5px",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "8px",
    bgcolor: "transparent",
  },
  "&::-webkit-scrollbar-button": {
    bgcolor: "transparent",
    height: "0px",
  },
  "&::-webkit-scrollbar-track": {
    bgcolor: "white",
  },
};

export const ViewParamGen: React.FC = () => {
  const ref = React.createRef<HTMLElement>();
  const theme = useTheme();

  return (
    <Box
      sx={{
        "&::-webkit-scrollbar-thumb": {
          bgcolor: theme.google.hairline,
          width: "8px",
          borderRadius: "10px",
        },
        ":hover": {
          "&::-webkit-scrollbar-thumb": {
            bgcolor: theme.google.hairlineHover,
          },
        },
        ...styleContenaire,
      }}
      ref={ref}
    >
      <LangageRegion />
      <TimeZone />
      <ParamsEvent />
      <DisplayOption />
      <KeyboardShortcut />
    </Box>
  );
};
