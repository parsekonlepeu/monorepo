import { useState, FC, useCallback, MouseEvent, ReactNode } from "react";
import { WithPopperProps } from "../types";
import { css } from "@emotion/react";

const WithPopperCss = {
  contenair: css({
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

export const WithPopper: FC<WithPopperProps> = ({
  children,
  textDisplay,
  top = "40px",
}) => {
  const [open, setOpen] = useState<string | undefined>(undefined);

  const handleMouseEnter = useCallback((e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(e.currentTarget.id);
  }, []);

  const handleMouseLeave = useCallback((e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(undefined);
  }, []);

  return (
    <div
      css={WithPopperCss.contenair}
      id={textDisplay}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {open === textDisplay ? (
        <span
          css={WithPopperCss.span}
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
