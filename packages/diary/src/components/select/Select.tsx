import * as React from "react";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import { SxProps, useTheme, Typography, Popover, Box } from "@mui/material";
import { Choices, InfoPays, OnChoice } from "../../types";

const styleContenaire: SxProps = {
  display: "flex",
  height: "35px",
  py: "7px",
  pl: "7px",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "5px",
};

const styleLabel: SxProps = {
  fontSize: "11px",
  fontWeight: 400,
};

const styleValue: SxProps = {
  fontSize: "14px",
  fontWeight: 500,
};

const styleBoxArrow: SxProps = {
  display: "flex",
  justifyContent: "center",
};

const styleBoxChoice: SxProps = {
  py: "10px",
  cursor: "pointer",
  px: "15px",
  minWidth: "300px",
  display: "flex",
  justifyContent: "space-between",
};

export type GenChoice = {
  name: string;
  value: any;
};

interface SelectProps {
  width: string;
  title: string;
  value: string;
  my: string;
  choices: Choices<
    string | number | InfoPays | GenChoice | Record<string, string | number>
  >;
  onChoice: OnChoice<any, any>;
  toRight?: string[][];
  disable?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  width,
  title,
  value,
  my,
  choices,
  onChoice,
  toRight,
  disable,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick: React.MouseEventHandler<HTMLDivElement> =
    React.useCallback(
      (event) => {
        if (!disable) {
          if (anchorEl) {
            setAnchorEl(null);
          } else {
            setAnchorEl(event.currentTarget);
          }
        }
      },
      [anchorEl, disable]
    );
  const open = Boolean(anchorEl);
  return (
    <Box
      sx={{
        width: width,
        bgcolor: theme.google.textfieldSurface,
        my: my,
        cursor: disable ? "default" : "pointer",
        ...styleContenaire,
      }}
      onClick={handleClick}
    >
      <Box>
        <Typography
          sx={{
            color: disable
              ? theme.google.hairlineHover
              : theme.google.onSurfaceVariant,
            ...styleLabel,
          }}
        >
          {title}
        </Typography>
        <Typography sx={styleValue}>{value}</Typography>
      </Box>
      <Box sx={styleBoxArrow}>
        <ArrowDropDownOutlined
          sx={{
            fontSize: "18px",
            color: disable
              ? theme.google.hairlineHover
              : theme.google.onSurfaceVariant,
          }}
        />
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box>
          {choices.map((choice, index) => {
            const handleClickChoice: React.MouseEventHandler<
              HTMLDivElement
            > = () => {
              onChoice(choice);
            };
            console.log(choice);
            return (
              <Box
                sx={{
                  ":hover": {
                    bgcolor: theme.google.textfieldSurface,
                  },
                  ...styleBoxChoice,
                }}
                onClick={handleClickChoice}
                key={index.toString()}
              >
                <Typography sx={{ fontSize: "14px", fontWeight: "500" }}>
                  {typeof choice === "string" || typeof choice === "number"
                    ? choice
                    : choice.name}
                </Typography>
                {toRight ? (
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: theme.google.hairlineHover,
                    }}
                  >
                    {toRight
                      // @ts-ignore
                      .map((item) => choice[item[0]] + item[1])
                      .join(" / ")}
                  </Typography>
                ) : null}
              </Box>
            );
          })}
        </Box>
      </Popover>
    </Box>
  );
};
