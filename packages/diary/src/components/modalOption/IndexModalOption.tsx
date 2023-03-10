import * as React from "react";
import Box from "@mui/material/Box";
import { ParamsIndexModal, ParamsIndexModalProps } from "./ParamsIndexModal";
import { SxProps } from "@mui/material";

const listParamsGen: ParamsIndexModalProps = {
  id: "params",
  title: "paramètres général",
  listParams: [
    {
      name: "Langue et région",
      id: "langageRegion",
    },
    {
      name: "Fuseau horaire",
      id: "timeZone",
    },
    {
      name: "Paramètres des événements",
      id: "eventParams",
    },
    {
      name: "Options d'affichage",
      id: "optionDisplay",
    },
  ],
};
const listAdd: ParamsIndexModalProps = {
  id: "add",
  title: "Ajouter un agenda",
  listParams: [
    {
      name: "Créer un agenda",
      id: "create",
    },
  ],
};

const styleContenair: SxProps = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  pt: "10px",
  height: "730px",
  maxHeight: "100%",
  overflow: "hidden",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "8px",
    bgcolor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    bgcolor: "transparent",
    width: "8px",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-button": {
    bgcolor: "transparent",
    height: "0px",
  },
  "&::-webkit-scrollbar-track": {
    bgcolor: "transparent",
  },
  "&:hover": {
    "&::-webkit-scrollbar": {
      width: "8px",
      bgcolor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      bgcolor: "gray",
      width: "8px",
      borderRadius: "10px",
    },
  },
};

export const IndexModalOptions: React.FC = () => {
  return (
    <Box sx={styleContenair}>
      <ParamsIndexModal
        id={listParamsGen.id}
        title={listParamsGen.title}
        listParams={listParamsGen.listParams}
      />
      <ParamsIndexModal
        id={listAdd.id}
        title={listAdd.title}
        listParams={listAdd.listParams}
      />
    </Box>
  );
};
