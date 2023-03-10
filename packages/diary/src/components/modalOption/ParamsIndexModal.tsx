import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import { SxProps, useTheme } from "@mui/material";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { useAppSelector } from "../../utils/hooks/hooksTypedRedux";
import { ListParams } from "./ListParams";
import { IdName, IdTitleModal } from "../../types";

const styleMainContenair: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  flexDirection: "column",
};

const styleContenairTitle: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  py: "0px",
  height: "40px",
  alignItems: "center",
  width: "100%",
  borderTopRightRadius: 50,
  borderBottomRightRadius: 50,
  cursor: "pointer",
  ":hover": {
    bgcolor: "#e8f0fe",
  },
};

export interface ParamsIndexModalProps {
  id: IdTitleModal;
  title: string;
  listParams: {
    name: string;
    id: IdName;
  }[];
}

export const ParamsIndexModal: React.FC<ParamsIndexModalProps> = ({
  id,
  title,
  listParams,
}) => {
  const theme = useTheme();

  const [open, setOpen] = React.useState<boolean>(false);

  const idTitleModal = useAppSelector((state) => state.options.idTitleModal);

  const handleClickTitle = React.useCallback(() => {
    setOpen((open) => !open);
  }, []);

  return (
    <Box sx={styleMainContenair}>
      <Box
        onClick={handleClickTitle}
        sx={{
          bgcolor: idTitleModal === id ? theme.google.secondary : "white",
          ...styleContenairTitle,
        }}
      >
        <p
          style={{
            fontWeight: idTitleModal === id ? 600 : 400,
            marginLeft: "24px",
            fontSize: "14px",
            color:
              idTitleModal === id
                ? theme.google.textfieldPrimary
                : theme.google.onSurface,
          }}
        >
          {title}
        </p>
        {open ? (
          <KeyboardArrowDownRoundedIcon sx={{ fontSize: "20px", mr: "10px" }} />
        ) : (
          <KeyboardArrowUpRoundedIcon sx={{ fontSize: "20px", mr: "10px" }} />
        )}
      </Box>
      <Collapse in={open}>
        <ListParams listParams={listParams} idTitle={id} />
      </Collapse>
    </Box>
  );
};
