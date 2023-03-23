import * as React from "react";
import { SettingsOutlined } from "@mui/icons-material";
import { useAppDispatch } from "../../utils/hooks/hooksTypedRedux";
import { changeModalRecycleBin } from "../../store/slices/recycleBinSlice";
import { WithPopper } from "../withPopper/WithPopper";
import { css } from "@emotion/react";
import {
  SxProps,
  useTheme,
  IconButton,
  Paper,
  Grow,
  Divider,
} from "@mui/material";
import { useAddHoverCss } from "../../hooks/useAddHoverCss";
import { refreshOption } from "../../store/slices/optionsSlice";

const stylePaperGrow: SxProps = {
  m: 1,
  position: "absolute",
  top: "45px",
  right: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  borderRadius: "5px",
};

const paramsCss = {
  mainContenair: css({
    padding: "8px",
    width: "200px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    "& p": {
      padding: "0px",
      margin: "0px",
    },
  }),
};

const quit = css({
  position: "absolute",
  width: "100vw",
  height: "100vh",
  backgroundColor: "transparent",
  top: "0px",
  left: "0px",
  zIndex: 999,
  cursor: "default",
});

export const SelectParams: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClick = React.useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <div onClick={handleClick}>
      <WithPopper
        textDisplay={"Parametre"}
        top="40px"
      >
        <IconButton
          aria-label="setting"
          size="small"
          sx={{
            height: "30px",
            width: "30px",
            mx: "30px",
            zIndex: 100,
          }}
        >
          <SettingsOutlined
            fontSize="small"
            sx={{
              height: "18px",
              width: "18px",
            }}
          />
        </IconButton>
      </WithPopper>
      <Grow in={open}>
        <Paper
          sx={{
            ...stylePaperGrow,
            bgcolor: theme.google.surface,
          }}
          elevation={6}
        >
          <Params />
        </Paper>
      </Grow>
      {open ? <div css={quit} /> : null}
    </div>
  );
};

export const Params: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleClickOptions = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      dispatch(
        refreshOption({
          key: "modalOption",
          value: true,
        })
      );
    },
    []
  );

  const handleClickRecycleBin = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      dispatch(changeModalRecycleBin(true));
    },
    []
  );

  const handleDarkMode = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      console.log("to do !!");
    },
    []
  );

  const withHoverCss = useAddHoverCss(
    theme.google.textfieldSurface,
    paramsCss.mainContenair
  );

  return (
    <div>
      <div
        css={withHoverCss}
        onClick={handleClickOptions}
      >
        <p>Paramètres</p>
      </div>
      <div
        css={withHoverCss}
        onClick={handleClickRecycleBin}
      >
        <p>Corbeille</p>
      </div>
      <Divider />
      <div
        css={withHoverCss}
        onClick={handleDarkMode}
      >
        <p>Mode sombre</p>
      </div>
    </div>
  );
};
