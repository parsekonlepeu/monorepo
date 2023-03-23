import * as React from "react";
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from "@mui/icons-material";
import { useAppSelector } from "../../utils/hooks/hooksTypedRedux";
import { Mode } from "./Mode";
import { css } from "@emotion/react";
import { useTheme, SxProps, Paper, Grow } from "@mui/material";

const stylePaperGrow: SxProps = {
  m: 1,
  position: "absolute",
  top: "45px",
  right: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  borderRadius: "5px",
};

const selectDisplayModeCss = {
  mainContenair: css({
    padding: "5px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    height: "20px",
    marginRight: "30px",
    cursor: "pointer",
  }),
  text: css({
    fontSize: "13px",
    fontWeight: 600,
  }),
  quit: css({
    position: "absolute",
    width: "100vw",
    height: "100vh",
    backgroundColor: "transparent",
    top: "0px",
    left: "0px",
    zIndex: 999,
    cursor: "default",
  }),
};

export const SelectDisplayMode: React.FC = () => {
  const theme = useTheme();
  const displayMode = useAppSelector((state) => state.general.displayMode);

  const [open, setOpen] = React.useState<boolean>(false);

  const handleClick = React.useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <div
      css={[
        selectDisplayModeCss.mainContenair,
        {
          border: `solid 1px ${theme.google.hairlineHover}`,
          backgroundColor: theme.google.surface,
          "&:hover": {
            backgroundColor: theme.google.textfieldSurface,
            border: `solid 1px ${theme.google.onSurfaceVariantAgm}`,
          },
        },
      ]}
      onClick={handleClick}
    >
      <p
        css={[
          selectDisplayModeCss.text,
          {
            color: `${theme.google.onSurface}`,
          },
        ]}
      >
        {displayMode}
      </p>
      {!open ? (
        <ArrowDropDownOutlined sx={{ fontSize: "20px" }} />
      ) : (
        <ArrowDropUpOutlined sx={{ fontSize: "20px" }} />
      )}
      <Grow in={open}>
        <Paper
          sx={{
            ...stylePaperGrow,
            bgcolor: theme.google.surface,
          }}
          elevation={6}
        >
          <Mode />
        </Paper>
      </Grow>
      {open ? <div css={selectDisplayModeCss.quit} /> : null}
    </div>
  );
};
