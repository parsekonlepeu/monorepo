import { css } from "@emotion/react";
import * as React from "react";

const sectionPopoverModifEventCss = {
  mainContenair: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  }),
  subContenair: css({
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
    marginBottom: "10px",
  }),
  iconContenair: css({
    width: "70px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  }),
  infoContenair: css({
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    "& p": {
      padding: "0px",
      margin: "0px",
    },
  }),
};

interface SectionPopoverModifEventProps {
  childrens: [React.ReactNode, React.ReactNode];
}

export const SectionPopoverModifEvent: React.FC<SectionPopoverModifEventProps> =
  ({ childrens }) => {
    return (
      <div css={sectionPopoverModifEventCss.mainContenair}>
        <div css={sectionPopoverModifEventCss.subContenair}>
          <div css={sectionPopoverModifEventCss.iconContenair}>
            {childrens[0]}
          </div>
          <div css={sectionPopoverModifEventCss.infoContenair}>
            <p>{childrens[1]}</p>
          </div>
        </div>
      </div>
    );
  };
