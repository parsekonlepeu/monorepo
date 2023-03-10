import * as React from "react";
import { Popover } from "@mui/material";
import { modifEventTempDiary } from "../../store/slices/diarysSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { css } from "@emotion/react";
import { useTheme } from "@mui/material";

const popoverListDiaryCss = {
  diaryContenair: css({
    display: "flex",
    flexDirection: "row",
    height: "2.5rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    borderRadius: "5px",
    marginTop: "10px",
    marginBottom: "10px",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  }),
  popoverContenair: css({
    paddingTop: "10px",
    paddingLeft: "10px",
    paddingRight: "20px",
    paddingBottom: "20px",
    overflow: "hidden",
  }),
  choicePopover: css({
    width: "150px",
    paddingLeft: "15px",
    cursor: "pointer",
    "& p": {
      margin: "5px",
    },
  }),
};

export const PoppoverListDiary: React.FC = () => {
  const theme = useTheme();
  const diarys = useAppSelector((state) => state.diarys.diarys);
  const refChoiceDiary = React.useRef<HTMLDivElement>(null);

  const [popChoiceDiary, setPopChoiceDiary] = React.useState<boolean>(false);
  const [diaryChoose, setDiaryChoose] = React.useState<string>(diarys[0].title);
  const dispatch = useAppDispatch();

  const handleClickChoiceDiary = React.useCallback(() => {
    setPopChoiceDiary(true);
  }, []);

  const handleCloseChoiceDiary = React.useCallback(() => {
    setPopChoiceDiary(false);
  }, []);

  const handleClickDiary: React.MouseEventHandler<HTMLDivElement> =
    React.useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = e.currentTarget.id;
        const title = diarys.find((diary) => diary.id === id)?.title;
        const color = diarys.find((diary) => diary.id === id)?.color;
        dispatch(
          modifEventTempDiary({
            keys: ["idDiary", "color"],
            values: [id, color],
          })
        );
        title && setDiaryChoose(title);
        setPopChoiceDiary(false);
      },
      [diarys]
    );

  return (
    <>
      <div
        css={[
          popoverListDiaryCss.diaryContenair,
          {
            "&:hover": {
              backgroundColor: theme.google.textfieldSurface,
            },
          },
        ]}
        ref={refChoiceDiary}
        onClick={handleClickChoiceDiary}
      >
        <p>{diaryChoose}</p>
        <ArrowDropDownRoundedIcon />
      </div>
      <Popover
        open={popChoiceDiary}
        anchorEl={refChoiceDiary.current}
        onClose={handleCloseChoiceDiary}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div css={popoverListDiaryCss.popoverContenair}>
          {diarys.map((diary) => (
            <div
              css={[
                popoverListDiaryCss.choicePopover,
                {
                  "&:hover": {
                    backgroundColor: theme.google.textfieldSurface,
                  },
                },
              ]}
              onClick={handleClickDiary}
              id={diary.id}
              key={diary.id}
            >
              <p>{diary.title}</p>
            </div>
          ))}
        </div>
      </Popover>
    </>
  );
};
