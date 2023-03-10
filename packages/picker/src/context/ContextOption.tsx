import { FC, createContext, PropsWithChildren } from "react";
import { DatepickerProps } from "../types";

export const ContextOption = createContext<DatepickerProps | null>(null);

interface ProviderOptionProps {
  value: DatepickerProps | null;
}

export const ProviderOption: FC<PropsWithChildren<ProviderOptionProps>> = ({
  children,
  value,
}) => {
  return (
    <ContextOption.Provider value={value}>{children}</ContextOption.Provider>
  );
};
