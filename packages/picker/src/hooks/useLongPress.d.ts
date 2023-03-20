import { MouseEvent, MouseEventHandler } from "react";
declare const useLongPress: (onLongPress: () => void, onClick: (e: globalThis.MouseEvent) => void, onQuitLongPress: (e: globalThis.MouseEvent) => void, delay?: number) => {
    onMouseDown: MouseEventHandler<HTMLDivElement>;
    onMouseMove: MouseEventHandler<HTMLDivElement>;
};
export default useLongPress;
