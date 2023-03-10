import React from "react";
import { Button, SxProps, useTheme } from "@mui/material";
import { useAppDispatch } from "../../utils/hooks/hooksTypedRedux";
import tinycolor from "tinycolor2";
import {
  EditableInput,
  Hue,
  Saturation,
} from "react-color/lib/components/common";
import { CustomPicker } from "react-color";
import { css } from "@emotion/react";
import {
  changeColorDiary,
  changeModalChoiceColor,
} from "../../store/slices/diarysSlice";

const inputStyles: SxProps = {
  input: {
    border: "none",
    width: "60px",
    fontSize: "14px",
  },
};

const buttonStyle: SxProps = {
  textTransform: "none",
  fontWeight: 700,
  fontSize: "13px",
};

const customPointerHueCss = css({
  marginLeft: "-10px",
  backgroundColor: "hsv(154,0.5,0.5)",
  borderRadius: "20px",
  border: "solid 1px white",
  height: "20px",
  width: "20px",
  transform: "scale(1.5)",
});

const saturationPointerCss = css({
  marginLeft: "-10px",
  marginTop: "-10px",
  backgroundColor: "hsl(154,0.5,0.5)",
  borderRadius: "20px",
  border: "solid 1px white",
  height: "20px",
  width: "20px",
});

const colorPickCss = {
  mainContenair: css({
    position: "relative",
    width: "286px",
    flexWrap: "wrap",
    "& h1": {
      position: "relative",
      fontSize: "16px",
      fontWeight: 500,
      margin: "0px",
    },
    "& p": {
      position: "relative",
      fontSize: "14px",
      maxWidth: "250px",
      marginBottom: "20px",
    },
  }),
  saturationContenair: css({
    position: "relative",
    width: "270px",
    height: "100px",
    marginBottom: "20px",
  }),
  hueContenair: css({
    position: "relative",
    width: "270px",
    height: "20px",
  }),
  editContenair: css({
    position: "relative",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    "& p": {
      marginLeft: "30px",
      marginRight: "15px",
      transform: "translateY(3px)",
    },
  }),
  previewLetterContenair: css({
    width: "40px",
    height: "40px",
    borderRadius: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& p": {
      marginLeft: "0px",
      marginRight: "0px",
      transform: "translateY(0px)",
      fontSize: "18px",
    },
  }),
  buttonsContenair: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "right",
    alignItems: "center",
  }),
};

const ColorPick: React.FC = (props: any) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const [currentColor, setCurrentColor] = React.useState<tinycolor.Instance>(
    tinycolor(props.color)
  );
  const [colorPointerHue, setColorPointerHue] =
    React.useState<tinycolor.Instance>(tinycolor(props.color));
  const [colorPointerSat, setColorPointerSat] =
    React.useState<tinycolor.Instance>(tinycolor(props.color));

  const CustomPointerHue = () => {
    return (
      <div
        css={customPointerHueCss}
        style={{
          backgroundColor: `#${colorPointerHue.toHex()}`,
        }}
      />
    );
  };

  const CustomPointerSaturation = () => {
    return (
      <div
        css={saturationPointerCss}
        style={{
          backgroundColor: `#${colorPointerSat.toHex()}`,
        }}
      />
    );
  };

  const handleChange = React.useCallback((color: any) => {
    if (color.source === "hsl") {
      const tiny = tinycolor({
        h: color.h,
        s: color.s,
        l: color.l,
      });
      const tinySat = tinycolor({
        h: color.h,
        s: colorPointerSat.toHsv().s,
        v: colorPointerSat.toHsv().v,
      });
      setCurrentColor(tiny);
      setColorPointerHue(tiny);
      setColorPointerSat(tinySat);
    } else if (color.source === "hsv") {
      const tiny = tinycolor({
        h: color.h,
        s: color.s,
        v: color.v,
      });
      setCurrentColor(tiny);
      setColorPointerSat(tiny);
    }
  }, []);

  const handleChangeEdit = React.useCallback((color: { hex: string }) => {
    const tiny = tinycolor(`#${color}`);
    setCurrentColor(tiny);
    setColorPointerHue(tiny);
    setColorPointerSat(tiny);
  }, []);

  const handleClickQuit = React.useCallback(() => {
    dispatch(changeModalChoiceColor(false));
  }, []);

  const handleClickSave = React.useCallback(() => {
    dispatch(changeColorDiary(currentColor.toHexString()));
    dispatch(changeModalChoiceColor(false));
  }, [currentColor]);

  return (
    <div css={colorPickCss.mainContenair}>
      <h1>Choisir une couleur personnalisée</h1>
      <p>
        Sélectionnez la couleur d'arriére-plan de cet agenda. La couleur du
        texte sera ajustée automatiquement.
      </p>
      <div css={colorPickCss.saturationContenair}>
        <Saturation
          {...props}
          hsl={colorPointerSat.toHsl()}
          hsv={colorPointerSat.toHsv()}
          onChange={handleChange}
          pointer={CustomPointerSaturation}
        />
      </div>
      <div css={colorPickCss.hueContenair}>
        <Hue
          {...props}
          hsl={colorPointerHue.toHsl()}
          onChange={handleChange}
          pointer={CustomPointerHue}
          direction="horizontal"
        />
      </div>
      <div css={colorPickCss.editContenair}>
        <div
          css={colorPickCss.previewLetterContenair}
          style={{
            backgroundColor: `#${currentColor.toHex()}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              color: currentColor.isLight() ? "black" : "white",
            }}
          >
            A
          </p>
        </div>
        <p>Hex :</p>
        <EditableInput
          value={currentColor.toHex()}
          onChange={handleChangeEdit}
          style={inputStyles}
        />
      </div>
      <div css={colorPickCss.buttonsContenair}>
        <Button
          onClick={handleClickQuit}
          sx={{
            ...buttonStyle,
            color: theme.google.onSurfaceVariantAgm,
          }}
        >
          Annuler
        </Button>
        <Button
          onClick={handleClickSave}
          sx={{
            ...buttonStyle,
            color: theme.google.primaryVariant,
          }}
        >
          Enregistrer
        </Button>
      </div>
    </div>
  );
};
export const CustomPickerColor = CustomPicker(ColorPick);
