import * as React from "react";
import { CloseRounded } from "@mui/icons-material";
import {
  SxProps,
  useTheme,
  Modal,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import { IndexModalOptions } from "./IndexModalOption";
import { ViewParamGen } from "./ViewParamGen";
import { ViewCreate } from "./ViewCreate";
import { WIDTH_BAR_LEFT } from "../../utils/constants";
import { refreshOption } from "../../store/slices/optionsSlice";

const styleContenair: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  minWidth: "760px",
  height: "90%",
  minHeight: "435px",
  bgcolor: "background.paper",
  overflow: "hidden",
  borderRadius: 2,
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
};
const styleTop: SxProps = {
  height: "60px",
  display: "flex",
  justifyContent: "space-between",
};
const styleTopRigth: SxProps = {
  height: "100%",
  px: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const styleTopLeft: SxProps = {
  height: "100%",
  px: "20px",
  display: "flex",
};
const styleBottom: SxProps = {
  height: "calc(100% - 60px)",
  flex: 1,
  display: "flex",
};
const styleBottomRigth: SxProps = {
  flex: 1,
  display: "flex",
};
const styleBottomLeft: SxProps = {
  width: `${WIDTH_BAR_LEFT}px`,
  display: "flex",
};

export const ModalOptions: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const idTitleModal = useAppSelector((state) => state.options.idTitleModal);
  const modalOption = useAppSelector((state) => state.options.modalOption);

  const handleCloseModal = React.useCallback(() => {
    dispatch(
      refreshOption({
        key: "modalOption",
        value: false,
      })
    );
  }, []);

  return (
    <Modal
      open={modalOption}
      onClose={handleCloseModal}
    >
      <Box sx={styleContenair}>
        <Box sx={styleTop}>
          <Box sx={styleTopLeft}>
            <p
              style={{
                fontWeight: 600,
                color: theme.google.onSurface,
              }}
            >
              Paramètre
            </p>
          </Box>
          <Box sx={styleTopRigth}>
            <IconButton
              aria-label="search"
              size="large"
              sx={{
                height: "40px",
                width: "40px",
              }}
              onClick={handleCloseModal}
            >
              <CloseRounded sx={{ color: red[500] }} />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <Box sx={styleBottom}>
          <Box sx={styleBottomLeft}>
            <IndexModalOptions />
          </Box>
          <Box sx={styleBottomRigth}>
            {idTitleModal === "params" ? (
              <ViewParamGen />
            ) : idTitleModal === "add" ? (
              <ViewCreate />
            ) : null}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
