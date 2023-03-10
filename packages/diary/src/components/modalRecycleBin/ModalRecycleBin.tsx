import * as React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Divider, SxProps, Modal } from "@mui/material";
import {
  AutoSizer as _AutoSizer,
  List as _List,
  ListProps,
  AutoSizerProps,
} from "react-virtualized";
import {
  changeAllOnClickedEvent,
  changeModalRecycleBin,
  delAllEventRecycleBin,
} from "../../store/slices/recycleBinSlice";
import { theme } from "../../theme";
import { rowRenderMaker } from "./rowRenderMaker";
import { css } from "@emotion/react";

const List = _List as unknown as React.FC<ListProps>;
const AutoSizer = _AutoSizer as unknown as React.FC<AutoSizerProps>;

const modalRecycledbinCss = {
  mainContenair: css({
    paddingRight: "10px",
    paddingBottom: "10px",
    borderRadius: "5px",
    position: "absolute",
    width: "90%",
    minWidth: "400px",
    height: "90%",
    minHeight: "600px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
  }),
  topContenair: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    "& p": {
      fontWeight: 600,
      padding: "0px",
      margin: "10px",
      fontSize: "18px",
    },
  }),
  bottomContenair: css({
    flex: 1,
    display: "flex",
    flexDirection: "row",
  }),
  listDiarysContenair: css({
    display: "flex",
    flexDirection: "column",
    flex: 1,
    maxWidth: "250px",
    "& p": {
      fontWeight: 500,
      padding: "0px",
      margin: "10px",
      fontSize: "15px",
    },
  }),
  titleDiary: css({
    width: "100%",
    height: "40px",
    borderTopRightRadius: "40px",
    borderBottomRightRadius: "40px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    "& p": {
      fontSize: "14px",
    },
  }),
  colorDiary: css({
    width: "12px",
    height: "12px",
    borderRadius: "12px",
    marginLeft: "20px",
  }),
  listeEventContenair: css({
    flex: 1,
    display: "flex",
    "& p": {
      fontWeight: 500,
      padding: "0px",
      margin: "0px",
      fontSize: "13px",
    },
  }),
};

export const ModalRecyclebin: React.FC = () => {
  const recycleBinList = useAppSelector(
    (state) => state.recycleBin.recycleBinList
  );
  const allClicked = useAppSelector((state) => state.recycleBin.allClicked);
  const modalRecycleBin = useAppSelector(
    (state) => state.recycleBin.modalRecycleBin
  );

  const [diaryCliked, setDiaryCliked] = React.useState<string>(
    recycleBinList.length !== 0 ? recycleBinList[0].idDiary : ""
  );

  const dispatch = useAppDispatch();

  const handleClickCheckboxAll = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeAllOnClickedEvent(diaryCliked));
    },
    [diaryCliked]
  );

  // to do : transmettre l'evenement hors du composant calendar !!
  const delAllEvent = () => {
    dispatch(delAllEventRecycleBin(diaryCliked));
  };

  const handleCloseModalRecycleBin = React.useCallback(() => {
    dispatch(changeModalRecycleBin(false));
  }, []);

  const ListEventDelete = recycleBinList.find(
    (diary) => diary.idDiary === diaryCliked
  )?.listEventDelete;

  const list = ListEventDelete ? [0, allClicked, ...ListEventDelete] : [];

  const rowRender = rowRenderMaker(
    recycleBinList,
    diaryCliked,
    delAllEvent,
    dispatch,
    list,
    handleClickCheckboxAll
  );

  return (
    <Modal open={modalRecycleBin} onClose={handleCloseModalRecycleBin}>
      <div
        css={[
          modalRecycledbinCss.mainContenair,
          {
            backgroundColor: theme.google.surface,
          },
        ]}
      >
        <div
          css={[
            modalRecycledbinCss.topContenair,
            {
              "& p": {
                color: theme.google.onSurface,
              },
            },
          ]}
        >
          <p>Corbeille</p>
          <CloseRoundedIcon />
        </div>
        <Divider />
        <div css={modalRecycledbinCss.bottomContenair}>
          <div
            css={[
              modalRecycledbinCss.listDiarysContenair,
              {
                "& p": {
                  color: theme.google.onSurface,
                },
              },
            ]}
          >
            <p>Corbeille de mes agendas</p>
            {recycleBinList.map((diary, index) => {
              const handleClickDiary = () => {
                setDiaryCliked(diary.idDiary);
              };
              return (
                <div
                  css={[
                    modalRecycledbinCss.titleDiary,
                    {
                      "&:hover": {
                        backgroundColor: theme.google.textfieldSurface,
                      },
                    },
                  ]}
                  key={index.toString()}
                  role="button"
                  onClick={handleClickDiary}
                  style={{
                    backgroundColor:
                      diary.idDiary === diaryCliked
                        ? theme.google.secondary
                        : theme.google.surface,
                  }}
                >
                  <div
                    css={[
                      modalRecycledbinCss.colorDiary,
                      {
                        backgroundColor: diary.color,
                      },
                    ]}
                  />
                  <p>{diary.title}</p>
                </div>
              );
            })}
          </div>
          <div
            css={[
              modalRecycledbinCss.listeEventContenair,
              {
                "& p": {
                  color: theme.google.textfieldOnSurfaceVariant,
                },
              },
            ]}
          >
            <AutoSizer>
              {({ height, width }) => (
                <List
                  width={width}
                  height={height}
                  rowCount={list.length}
                  rowHeight={40}
                  rowRenderer={rowRender}
                />
              )}
            </AutoSizer>
          </div>
        </div>
      </div>
    </Modal>
  );
};
