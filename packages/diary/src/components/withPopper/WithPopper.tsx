import * as React from "react";
import { css } from "@emotion/react";

const withPopperCss = {
  mainContenair: css({
    position: "relative",
  }),
  span: css({
    position: "absolute",
    display: "flex",
    backgroundColor: "grey",
    padding: "3px",
    top: "25px",
    fontSize: "12px",
    fontWeight: 700,
    borderRadius: "2px",
    color: "white",
    zIndex: 1000,
    whiteSpace: "nowrap",
  }),
};

interface WithPopperProps {
  children: React.ReactNode | JSX.Element;
  textDisplay: string;
  top?: string;
}

export const WithPopper: React.FC<WithPopperProps> = ({
  children,
  textDisplay,
  top = "40px",
}) => {
  const [open, setOpen] = React.useState<string | undefined>(undefined);

  const handleMouseEnter = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(e.currentTarget.id);
    },
    []
  );

  const handleMouseLeave = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(undefined);
    },
    []
  );

  return (
    <div
      css={withPopperCss.mainContenair}
      id={textDisplay}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {open === textDisplay ? (
        <span
          css={withPopperCss.span}
          style={{
            top: top,
          }}
        >
          {textDisplay}
        </span>
      ) : null}
    </div>
  );
};
