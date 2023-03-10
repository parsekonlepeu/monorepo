import * as React from "react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { SxProps, useTheme } from "@mui/material";
import { Choices, InfoPays, OnChoice } from "../../types";

const styleContenaire: SxProps = {
  display: "flex",
  height: "35px",
  py: "7px",
  pl: "7px",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
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
};

interface SelectProps {
  width: string;
  title: string;
  value: string;
  my: string;
  choices: Choices<string | number | InfoPays>;
  onChoice: OnChoice<any, any>;
}

export const Select: React.FC<SelectProps> = ({
  width,
  title,
  value,
  my,
  choices,
  onChoice,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick: React.MouseEventHandler<HTMLDivElement> =
    React.useCallback(
      (event) => {
        if (anchorEl) {
          setAnchorEl(null);
        } else {
          setAnchorEl(event.currentTarget);
        }
      },
      [anchorEl]
    );
  const open = Boolean(anchorEl);
  return (
    <Box
      sx={{
        width: width,
        bgcolor: theme.google.textfieldSurface,
        my: my,
        ...styleContenaire,
      }}
      onClick={handleClick}
    >
      <Box>
        <Typography
          sx={{
            color: theme.google.onSurfaceVariant,
            ...styleLabel,
          }}
        >
          {title}
        </Typography>
        <Typography sx={styleValue}>{value}</Typography>
      </Box>
      <Box sx={styleBoxArrow}>
        <ArrowDropDownOutlinedIcon sx={{ fontSize: "18px" }} />
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
            const handleClickChoice: React.MouseEventHandler<HTMLDivElement> =
              () => {
                const c =
                  typeof choice === "string" || typeof choice === "number"
                    ? choice
                    : choice.name;
                onChoice(c);
              };
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
              </Box>
            );
          })}
        </Box>
      </Popover>
    </Box>
  );
};
