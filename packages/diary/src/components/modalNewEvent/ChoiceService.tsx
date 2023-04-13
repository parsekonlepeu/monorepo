import { css } from "@emotion/react";
import * as React from "react";
import { modifEventTempDiary } from "../../store/slices/diarysSlice";
import { Service, Services } from "../../types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../utils/hooks/hooksTypedRedux";
import { Select } from "../select/Select";

const ChoiceServiceCss = {
  mainContenair: css({
    display: "flex",
    flexDirection: "row",
    gap: "10px",
  }),
};

type ItemCategory = { name: string };

const getCategory = (listServices: Services): ItemCategory[] => {
  const categorieReturn: ItemCategory[] = [];
  for (const item of listServices) {
    categorieReturn.push({
      name: item.category,
    });
  }
  return categorieReturn;
};

export const ChoiceService: React.FC = () => {
  const listServices = useAppSelector((state) => state.general.listServices);
  const eventTemp = useAppSelector((state) => state.diarys.eventTemp);
  const dispatch = useAppDispatch();
  const [prestation, setPrestation] = React.useState<Service | undefined>(
    eventTemp?.service
  );
  const [categorie, setCategorie] = React.useState<string | undefined>(
    eventTemp?.serviceCategory
  );
  const [indexChoicesService, setIndexChoicesService] =
    React.useState<number>(0);
  const handleOnChoicePrestation = React.useCallback((choice: Service) => {
    setPrestation(choice);
    dispatch(
      modifEventTempDiary({
        keys: ["service", "duration"],
        values: [choice.name, choice.duration],
      })
    );
  }, []);
  const handleOnChoiceCategorie = React.useCallback((choice: ItemCategory) => {
    console.log(choice);
    setCategorie(choice.name);
    const newIndexChoicesService = listServices.findIndex(
      (item) => item.category === choice.name
    );
    setIndexChoicesService(newIndexChoicesService);
    dispatch(
      modifEventTempDiary({
        keys: ["service", "serviceCategory", "duration"],
        values: ["", choice.name, 15],
      })
    );
    setPrestation(undefined);
  }, []);
  const categorys = React.useMemo(
    () => getCategory(listServices),
    [listServices]
  );
  if (listServices.length === 1) {
    return (
      <div>
        <Select
          width="200px"
          title="prestation"
          value={prestation ? prestation.name : ""}
          choices={listServices[indexChoicesService].list}
          onChoice={handleOnChoicePrestation}
          my={"20px"}
        />
      </div>
    );
  } else {
    return (
      <div css={ChoiceServiceCss.mainContenair}>
        <Select
          width="200px"
          title="catégorie"
          value={categorie ? categorie : ""}
          choices={categorys}
          onChoice={handleOnChoiceCategorie}
          my={"20px"}
        />
        <Select
          width="200px"
          title="prestation"
          value={prestation ? prestation.name : ""}
          choices={listServices[indexChoicesService].list}
          toRight={[
            ["duration", "min"],
            ["price", "€"],
          ]}
          onChoice={handleOnChoicePrestation}
          my={"20px"}
          disable={categorie === undefined}
        />
      </div>
    );
  }
};
