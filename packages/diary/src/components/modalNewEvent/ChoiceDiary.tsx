import * as React from "react";
import { InsertInvitationRounded } from "@mui/icons-material";
import { PoppoverListDiary } from "./PoppoverListDiary";
import { ChoiceDiaryColor } from "./ChoiceDiaryColor";
import { css } from "@emotion/react";
import { WIDTH_MODAL_NEW_EVENT } from "../../utils/constants";
import { useTheme } from "@mui/material";

const choiceDiaryCss = {
  mainContenair: css({
    display: "flex",
    flexDirection: "row",
  }),
  iconContenair: css({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "70px",
  }),
  choicesContenair: css({
    paddingRight: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    minWidth: `${WIDTH_MODAL_NEW_EVENT}px`,
  }),
};

export const ChoiceDiary: React.FC = () => {
  const theme = useTheme();
  return (
    <div css={choiceDiaryCss.mainContenair}>
      <div css={choiceDiaryCss.iconContenair}>
        <InsertInvitationRounded />
      </div>
      <div
        css={[
          choiceDiaryCss.choicesContenair,
          {
            color: theme.google.onSurfaceVariantAgm,
          },
        ]}
      >
        <PoppoverListDiary />
        <ChoiceDiaryColor />
      </div>
    </div>
  );
};
