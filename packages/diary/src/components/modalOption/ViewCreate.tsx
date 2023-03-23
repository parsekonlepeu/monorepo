import * as React from "react";
import { SxProps, useTheme, Box } from "@mui/material";
import { CreateDiary } from "./create/CreateDiary";

const styleContenaire: SxProps = {
  flex: 1,
  height: "740px",
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
    bgcolor: "grey",
  },
  ":hover": {
    "&::-webkit-scrollbar-thumb": {
      bgcolor: "#B4B4B4",
    },
  },
};

export const ViewCreate: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        "&::-webkit-scrollbar-thumb": {
          bgcolor: theme.google.hairline,
          width: "8px",
          borderRadius: "10px",
        },
        ...styleContenaire,
      }}
    >
      <CreateDiary />
    </Box>
  );
};
