import { FC, PropsWithChildren } from "react";
import { DatepickerProps } from "../types";
export declare const ContextOption: import("react").Context<DatepickerProps | null>;
interface ProviderOptionProps {
    value: DatepickerProps | null;
}
export declare const ProviderOption: FC<PropsWithChildren<ProviderOptionProps>>;
export {};
