import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import { Divider, SxProps, useTheme } from "@mui/material";
import { useHover } from "../../utils/hooks/useHover";
import { css } from "@emotion/react";
import {
  addDiaryDisplay,
  changeColorDiary,
  changeIdDiaryForDelete,
  changeIdDiarysModalChoiceColor,
  changeModalChoiceColor,
  changeModalUnsubscribeDiary,
  deleteDiaryDisplay,
} from "../../store/slices/diarysSlice";
import { SelectColor } from "../selectColor/SelectColor";
import { ContextFunctionManage } from "../../context/context-function-manage";
import { callFunctionManage } from "../../utils/functions/callFunctionManage";

const stylePaper: SxProps = {
  bgcolor: "white",
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  borderRadius: "5px",
  right: "-150px",
  top: "20px",
  zIndex: 1000,
};

const DiaryListCss = {
  mainContenair: css({
    position: "relative",
    width: "230px",
    marginRight: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    alignItems: "center",
    paddingTop: "0px",
    cursor: "pointer",
  }),
  buttonOption: css({
    right: "20px",
    height: "100%",
    position: "absolute",
    width: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  }),
  pointButtonOption: css({
    backgroundColor: "black",
    width: "3px",
    height: "3px",
    borderRadius: "3px",
    marginTop: "3px",
  }),
  buttonUnsub: css({
    right: "60px",
    height: "100%",
    position: "absolute",
    width: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  growOptionContenair: css({
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    marginTop: "0px",
    height: "40px",
    "& p": {
      fontSize: "13px",
      fontWeight: 500,
      marginRight: "30px",
      marginLeft: "10px",
    },
  }),
};

interface DiaryListProps {
  idDiary: string;
  canUnsubscribe: boolean;
  title: string;
  color: string;
}

export const DiaryList: React.FC<DiaryListProps> = ({
  title,
  canUnsubscribe,
  idDiary,
  color,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const ref = React.useRef<HTMLDivElement | null>(null);

  const diarysDisplay = useAppSelector((state) => state.diarys.diarysDisplay);

  const { onHover, hover } = useHover();

  const [optOpen, setOptOpen] = React.useState<boolean>();

  const handleChange: React.MouseEventHandler<HTMLDivElement> =
    React.useCallback(
      (e) => {
        e.preventDefault();
        const deleteDiary = [idDiary];
        if (diarysDisplay.includes(idDiary)) {
          dispatch(deleteDiaryDisplay(deleteDiary));
        } else {
          dispatch(addDiaryDisplay(idDiary));
        }
      },
      [idDiary, diarysDisplay]
    );

  const handleClickOpt: React.MouseEventHandler<HTMLDivElement> =
    React.useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        const clickQuit = () => {
          setOptOpen(false);
        };
        dispatch(changeIdDiarysModalChoiceColor(idDiary));
        document.addEventListener("click", clickQuit, { once: true });
        setOptOpen((open) => (open = !open));
        return () => document.removeEventListener("click", clickQuit);
      },
      [idDiary]
    );

  const handleClickUnsub: React.MouseEventHandler<SVGSVGElement> =
    React.useCallback(
      async (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(changeModalUnsubscribeDiary(true));
        dispatch(changeIdDiaryForDelete(idDiary));
      },
      [idDiary]
    );

  const handleClickColor: React.MouseEventHandler<HTMLDivElement> =
    React.useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = e.currentTarget.id;
      dispatch(changeColorDiary(id));
    }, []);

  const handleClickColorPerso: React.MouseEventHandler<HTMLDivElement> =
    React.useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(changeModalChoiceColor(true));
    }, []);

  const check = diarysDisplay.includes(idDiary);

  const styleCheckbox: SxProps = {
    color: color,
    "&.Mui-checked": {
      color: color,
    },
    ml: "15px",
    my: "0px",
    py: "5px",
  };

  return (
    <div
      key={idDiary}
      ref={ref}
      css={DiaryListCss.mainContenair}
      style={{
        backgroundColor: hover ? theme.google.fabHover : theme.google.surface,
      }}
      onClick={handleChange}
      {...onHover}
    >
      <FormControlLabel
        control={<Checkbox checked={check} sx={styleCheckbox} />}
        label={
          <Typography
            sx={{
              fontSize: "14px",
              my: "0px",
              py: "0px",
            }}
          >
            {title}
          </Typography>
        }
      />
      {hover || optOpen ? (
        <div css={DiaryListCss.buttonOption} onClick={handleClickOpt}>
          <div css={DiaryListCss.pointButtonOption} />
          <div css={DiaryListCss.pointButtonOption} />
          <div css={DiaryListCss.pointButtonOption} />
        </div>
      ) : null}
      {hover && canUnsubscribe ? (
        <div css={DiaryListCss.buttonUnsub}>
          <CloseRoundedIcon fontSize="small" onClick={handleClickUnsub} />
        </div>
      ) : null}
      <Grow in={optOpen}>
        <Paper elevation={6} sx={stylePaper}>
          <div
            css={DiaryListCss.growOptionContenair}
            style={{
              backgroundColor: hover
                ? theme.google.textfieldSurface
                : theme.google.surface,
            }}
          >
            <p>Afficher uniquement cet agenda</p>
          </div>
          <div
            css={DiaryListCss.growOptionContenair}
            style={{
              backgroundColor: hover
                ? theme.google.textfieldSurface
                : theme.google.surface,
            }}
          >
            <p>Paramètres et partage</p>
          </div>
          <Divider
            sx={{
              bgcolor: "whitesmoke",
            }}
          />
          <SelectColor
            currentColor={color}
            canSelectColorPerso={true}
            onClickColor={handleClickColor}
            onClickColorPerso={handleClickColorPerso}
          />
        </Paper>
      </Grow>
    </div>
  );
};
