import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { SelectDisplayMode } from "./SelectDisplayMode";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { SelectParams } from "./SelectParams";
import { ModalOptions } from "../modalOption/ModalOptions";
import { WithPopper } from "../withPopper/WithPopper";
import { css } from "@emotion/react";

const BarTopRightCss = {
  mainContenair: css({
    paddingRight: "30px",
    height: "100%",
    display: "flex",
    alignItems: "center",
  }),
};

interface BarTopRightProps {
  image?: string;
  title?: string;
}

export const BarTopRight: React.FC<BarTopRightProps> = ({ image, title }) => {
  return (
    <div css={BarTopRightCss.mainContenair}>
      <WithPopper textDisplay={"Recherche"} top="40px">
        <IconButton
          aria-label="search"
          size="small"
          sx={{
            height: "30px",
            width: "30px",
          }}
        >
          <SearchOutlinedIcon
            fontSize="small"
            sx={{
              height: "18px",
              width: "18px",
            }}
          />
        </IconButton>
      </WithPopper>
      <SelectParams />
      <SelectDisplayMode />
      <ModalOptions />
    </div>
  );
};
