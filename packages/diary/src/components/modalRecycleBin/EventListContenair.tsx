import * as React from "react";
import { useTheme, Checkbox } from "@mui/material";
import { DelRemoveEvent } from "./DelRemoveEvent";
import { css } from "@emotion/react";

type TypeContenair = "top" | "content";

const eventListContenairCss = {
  mainContenair: css({
    display: "flex",
    flexDirection: "row",
    height: "40px",
  }),
  checkboxContenair: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  topOneCheck: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }),
  infoEventDel: css({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  }),
};

interface EventListContenairProps {
  type: TypeContenair;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onClickCheckbox?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  onRestore?: React.MouseEventHandler<HTMLButtonElement>;
  date?: string;
  hours?: string;
  title?: string;
  organizer?: string;
  deleteDate?: string;
  dateDelete?: string;
  numberCheck?: number;
  isCheck: boolean;
}

export const EventListContenair: React.FC<EventListContenairProps> = ({
  type,
  onClick,
  onClickCheckbox,
  onDelete,
  onRestore,
  date,
  hours,
  title,
  organizer,
  dateDelete,
  isCheck,
  numberCheck,
}) => {
  const theme = useTheme();

  const [isIn, setIsIn] = React.useState<boolean>(false);

  const handleOnHover = React.useCallback(() => {
    setIsIn(true);
  }, []);

  const handleOnLeave = React.useCallback(() => {
    setIsIn(false);
  }, []);

  return (
    <div
      css={eventListContenairCss.mainContenair}
      style={{
        cursor: type === "content" ? "pointer" : "default",
        backgroundColor:
          isIn && type === "content"
            ? theme.google.textfieldSurface
            : theme.google.surface,
      }}
      onPointerEnter={handleOnHover}
      onPointerLeave={handleOnLeave}
      onClick={onClick}
    >
      <div css={eventListContenairCss.checkboxContenair}>
        <Checkbox
          checked={isCheck}
          onChange={onClickCheckbox}
          indeterminate={numberCheck !== 0 && !isCheck && type === "top"}
        />
      </div>
      {numberCheck !== 0 && type === "top" ? (
        <div css={eventListContenairCss.topOneCheck}>
          <DelRemoveEvent onDelete={onDelete} onRestore={onRestore} />
          <p>{numberCheck} élement sélectionné</p>
        </div>
      ) : (
        <>
          <div
            css={[
              eventListContenairCss.infoEventDel,
              {
                width: "120px",
              },
            ]}
          >
            <p>{date}</p>
          </div>
          <div
            css={[
              eventListContenairCss.infoEventDel,
              {
                width: "110px",
              },
            ]}
          >
            <p>{hours}</p>
          </div>
          <div
            css={[
              eventListContenairCss.infoEventDel,
              {
                flex: 1,
              },
            ]}
          >
            <p>{title}</p>
          </div>
          <div
            css={[
              eventListContenairCss.infoEventDel,
              {
                width: "160px",
              },
            ]}
          >
            <p>{organizer}</p>
          </div>
          <div
            css={[
              eventListContenairCss.infoEventDel,
              {
                width: "150px",
              },
            ]}
          >
            {isIn && type === "content" ? (
              <DelRemoveEvent onDelete={onDelete} onRestore={onRestore} />
            ) : (
              <p>{dateDelete}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
