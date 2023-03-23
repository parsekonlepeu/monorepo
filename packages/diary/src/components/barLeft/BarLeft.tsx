import * as React from "react";
import { ContenairDiarysList } from "./ContenaireDiarysList";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import { PickerBarLeft } from "./PickerBarLeft";
import { Collapse, useTheme } from "@mui/material";
import { useAppSelector } from "../../utils/hooks/hooksTypedRedux";
import { css } from "@emotion/react";
import { HEIGHT_TOP, WIDTH_BAR_LEFT } from "../../utils/constants";

const BarLeftCss = {
  mainContenair: css({
    position: "absolute",
    width: `${WIDTH_BAR_LEFT}px`,
    top: `${HEIGHT_TOP}px`,
    height: `calc(100vh - ${HEIGHT_TOP}px)`,
    transition: "0.2s",
    padding: "0px",
    paddingTop: "50px",
  }),
  pickerContenair: css({
    padding: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }),
};

const DiarySelectCss = {
  mainContenair: css({
    width: `${WIDTH_BAR_LEFT}px`,
    marginRight: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    paddingTop: "0px",
  }),
};

export const BarLeft: React.FC = () => {
  const leftExtend = useAppSelector((state) => state.general.leftExtend);
  const theme = useTheme();

  return (
    <div
      css={[
        BarLeftCss.mainContenair,
        {
          backgroundColor: theme.google.surface,
        },
      ]}
      style={{
        left: leftExtend ? "0px" : "-240px",
      }}
    >
      <div css={BarLeftCss.pickerContenair}>
        <PickerBarLeft />
      </div>
      <DiarySelect />
    </div>
  );
};

const DiarySelect: React.FC = () => {
  const [listDiarysOpen, setListDiarysOpen] = React.useState<boolean>(true);

  const handleClickListDiary = React.useCallback(() => {
    setListDiarysOpen((listDiarysOpen) => !listDiarysOpen);
  }, []);

  return (
    <>
      <div
        css={DiarySelectCss.mainContenair}
        onClick={handleClickListDiary}
      >
        <p>Mes agendas</p>
        {listDiarysOpen ? (
          <KeyboardArrowDownRounded sx={{ fontSize: "20px", mr: "10px" }} />
        ) : (
          <KeyboardArrowUpRounded sx={{ fontSize: "20px", mr: "10px" }} />
        )}
      </div>
      <Collapse in={listDiarysOpen}>
        <ContenairDiarysList />
      </Collapse>
    </>
  );
};
