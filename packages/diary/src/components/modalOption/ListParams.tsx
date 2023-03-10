import * as React from "react";
import Box from "@mui/material/Box";
import { SxProps, useTheme } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import { IdName } from "../../types";
import { refreshOption } from "../../store/slices/optionsSlice";

const styleContenairMain: SxProps = {
  display: "flex",
  position: "relative",
  width: "242px",
};

const styleContenairLeft: SxProps = {
  position: "absolute",
  left: 0,
  top: 0,
  bgcolor: "transparent",
  width: "30px",
  height: "100%",
};

const styleContenairRigth: SxProps = {
  display: "flex",
  flexDirection: "column",
  bgcolor: "white",
};

const styleNameParams: SxProps = {
  height: "40px",
  width: "242px",
  display: "flex",
  position: "relative",
  borderTopRightRadius: 50,
  borderBottomRightRadius: 50,
  fontSize: "14px",
  alignItems: "center",
  bgcolor: "white",
  cursor: "pointer",
};

const styleSubBar: SxProps = {
  position: "absolute",
  bgcolor: "#e8eaed",
  top: "10px",
  bottom: "10px",
  left: "24px",
  height: "calc(100% - 20px)",
  width: "2px",
};

const stylePointer: SxProps = {
  position: "absolute",
  top: "10px",
  left: "24px",
  width: "2px",
  height: "20px",
  bgcolor: "cornflowerblue",
  zIndex: 1000,
};

interface ListParamsProps {
  listParams: {
    name: string;
    id: IdName;
  }[];
  idTitle: string;
}

export const ListParams: React.FC<ListParamsProps> = ({
  listParams,
  idTitle,
}) => {
  return (
    <Box sx={styleContenairMain}>
      <Box sx={styleContenairRigth}>
        {listParams.map((params, index) => (
          <div key={index.toString()}>
            <ContenairParams
              name={params.name}
              id={params.id}
              idTitle={idTitle}
            />
          </div>
        ))}
      </Box>
      <Box sx={styleContenairLeft}>
        <Box sx={styleSubBar} />
      </Box>
    </Box>
  );
};

interface ContenairParamsProps {
  name: string;
  id: string;
  idTitle: string;
}

const ContenairParams: React.FC<ContenairParamsProps> = ({
  name,
  id,
  idTitle,
}) => {
  const theme = useTheme();

  const dispatch = useAppDispatch();

  const idTitleModal = useAppSelector((state) => state.options.idTitleModal);
  const idName = useAppSelector((state) => state.options.idName);

  const handleClick = React.useCallback(() => {
    dispatch(
      refreshOption({
        key: "idName",
        value: id,
      })
    );
    dispatch(
      refreshOption({
        key: "idTitleModal",
        value: idTitle,
      })
    );
  }, [idTitleModal, idTitle]);

  return (
    <Box
      sx={{
        ...styleNameParams,
        ":hover": {
          bgcolor: theme.google.textfieldSurface,
        },
      }}
      onClick={handleClick}
      key={id}
    >
      {id === idName && <Box sx={stylePointer} />}
      <p
        style={{
          marginLeft: "40px",
          fontWeight: id === idName ? 600 : 400,
          color:
            id === idName
              ? theme.google.textfieldPrimary
              : theme.google.onSurface,
        }}
      >
        {name}
      </p>
    </Box>
  );
};
