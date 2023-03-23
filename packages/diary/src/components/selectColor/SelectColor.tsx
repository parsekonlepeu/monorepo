import * as React from "react";
import { AddRounded, DoneRounded } from "@mui/icons-material";
import { colorsDiarys } from "../../utils/constants";
import { useTheme } from "@mui/material";
import { WithPopper } from "../withPopper/WithPopper";
import { css } from "@emotion/react";

const selectColorCss = {
  mainContenair: css({
    paddingLeft: "3px",
    paddingTop: "3px",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    cursor: "default",
  }),
  rowContenair: css({
    display: "flex",
    flexDirection: "row",
  }),
  case: css({
    marginLeft: "6px",
    marginTop: "6px",
    width: "17px",
    height: "17px",
  }),
  circle: css({
    width: "17px",
    height: "17px",
    borderRadius: "17px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      transform: "scale(1.2)",
    },
  }),
  colorContenair: css({
    marginLeft: "6px",
    marginTop: "6px",
    marginBottom: "6px",
    display: "flex",
    flexDirection: "row",
  }),
};

interface SelectColorProps {
  currentColor: string;
  canSelectColorPerso: boolean;
  onClickColor: React.MouseEventHandler<HTMLDivElement>;
  onClickColorPerso?: React.MouseEventHandler<HTMLDivElement>;
}

export const SelectColor: React.FC<SelectColorProps> = ({
  currentColor,
  canSelectColorPerso,
  onClickColor,
  onClickColorPerso,
}) => {
  const theme = useTheme();

  const arrRow = new Array(4).fill(null);
  const arrColumn = new Array(6).fill(null);

  return (
    <div css={selectColorCss.mainContenair}>
      {arrRow.map((x, indexRow) => (
        <div
          css={selectColorCss.rowContenair}
          key={indexRow.toString()}
        >
          {arrColumn.map((x, indexColumn) => (
            <div
              css={selectColorCss.case}
              key={indexColumn.toString()}
            >
              <WithPopper
                textDisplay={colorsDiarys[indexColumn + indexRow * 6].name}
                top={indexRow > 1 ? "-40px" : "40px"}
              >
                <div
                  css={selectColorCss.circle}
                  id={colorsDiarys[indexColumn + indexRow * 6].rgb}
                  style={{
                    backgroundColor:
                      colorsDiarys[indexColumn + indexRow * 6].rgb,
                  }}
                  onClick={onClickColor}
                >
                  {currentColor ===
                  colorsDiarys[indexColumn + indexRow * 6].rgb ? (
                    <DoneRounded
                      fontSize="large"
                      sx={{
                        fontSize: "15px",
                        color: "white",
                      }}
                    />
                  ) : null}
                </div>
              </WithPopper>
            </div>
          ))}
        </div>
      ))}
      {canSelectColorPerso && onClickColorPerso ? (
        <div css={selectColorCss.colorContenair}>
          {!colorsDiarys.find((item) => item.rgb === currentColor) ? (
            <div
              css={selectColorCss.circle}
              style={{
                backgroundColor: currentColor,
                marginRight: "6px",
              }}
              onClick={onClickColorPerso}
            >
              <DoneRounded
                fontSize="large"
                sx={{
                  fontSize: "15px",
                  color: "white",
                }}
              />
            </div>
          ) : null}
          <div
            css={selectColorCss.circle}
            style={{
              backgroundColor: theme.google.hairline,
            }}
            onClick={onClickColorPerso}
          >
            <AddRounded
              sx={{
                fontSize: "15px",
                color: theme.google.textfieldHairline,
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
