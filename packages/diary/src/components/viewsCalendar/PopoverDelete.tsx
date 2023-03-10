import * as React from "react";
import { Popover, useTheme } from "@mui/material";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import { SelectColor } from "../selectColor/SelectColor";
import { css } from "@emotion/react";

const popoverDeleteCss = {
  mainContenair: css({}),
  deleteEventContenair: css({
    padding: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
    "& p": {
      margin: "0px",
      padding: "0px",
      fontSize: "14px",
      marginLeft: "10px",
    },
  }),
  changeColorContenair: css({
    paddingRight: "10px",
    paddingBottom: "10px",
  }),
};

interface PopoverDeleteProps {
  open: boolean;
  onClose: () => void;
  positionX: number;
  positionY: number;
  colorEvent: string;
  onClickColor: React.MouseEventHandler<HTMLDivElement>;
  onClickDelete: React.MouseEventHandler<HTMLDivElement>;
}

export const PopoverDelete: React.FC<PopoverDeleteProps> = ({
  open,
  onClose,
  positionX,
  positionY,
  colorEvent,
  onClickColor,
  onClickDelete,
}) => {
  const theme = useTheme();
  return (
    <Popover
      id={"popover-click-rigth-event-day"}
      open={open}
      onClose={onClose}
      sx={{
        top: `${positionY}px`,
        left: `${positionX}px`,
      }}
    >
      <div css={popoverDeleteCss.mainContenair}>
        <div
          css={[
            popoverDeleteCss.deleteEventContenair,
            {
              "&:hover": {
                backgroundColor: theme.google.textfieldSurface,
              },
            },
          ]}
          onClick={onClickDelete}
        >
          <DeleteOutlineRounded />
          <p>Supprimer</p>
        </div>
        <div css={popoverDeleteCss.changeColorContenair}>
          <SelectColor
            currentColor={colorEvent}
            canSelectColorPerso={false}
            onClickColor={onClickColor}
          />
        </div>
      </div>
    </Popover>
  );
};
