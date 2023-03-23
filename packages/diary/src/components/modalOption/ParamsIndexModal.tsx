import * as React from "react";
import { SxProps, useTheme, Collapse, Box } from "@mui/material";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
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
          <KeyboardArrowDownRounded sx={{ fontSize: "20px", mr: "10px" }} />
        ) : (
          <KeyboardArrowUpRounded sx={{ fontSize: "20px", mr: "10px" }} />
        )}
      </Box>
      <Collapse in={open}>
        <ListParams
          listParams={listParams}
          idTitle={id}
        />
      </Collapse>
    </Box>
  );
};
