import * as React from "react";
import { IconButton, SxProps } from "@mui/material";
import { UTurnLeft, DeleteOutlineOutlined } from "@mui/icons-material";
import { css } from "@emotion/react";

interface DelRemoveEventProps {
  onRestore: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onDelete: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const styleIconButton: SxProps = {
  ml: "5px",
  mr: "10px",
  height: "30px",
  width: "30px",
  color: "black",
};

const styleIcon: SxProps = {
  height: "22px",
  width: "22px",
};

const delRemoveEvent = {
  mainContenair: css({
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  }),
};

export const DelRemoveEvent: React.FC<DelRemoveEventProps> = ({
  onRestore,
  onDelete,
}) => {
  return (
    <div css={delRemoveEvent.mainContenair}>
      <IconButton
        aria-label="back"
        size="small"
        sx={styleIconButton}
        onClick={onRestore}
      >
        <UTurnLeft
          fontSize="small"
          sx={{
            ...styleIcon,
            transform: "rotate(90deg)",
          }}
        />
      </IconButton>
      <IconButton
        aria-label="back"
        size="small"
        sx={styleIconButton}
        onClick={onDelete}
      >
        <DeleteOutlineOutlined
          fontSize="small"
          sx={styleIcon}
        />
      </IconButton>
    </div>
  );
};
