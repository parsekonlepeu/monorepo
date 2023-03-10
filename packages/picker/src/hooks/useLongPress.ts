import {
  useCallback,
  useRef,
  useState,
  MouseEvent,
  MouseEventHandler,
} from "react";

type Coord = {
  x: number;
  y: number;
};

const useLongPress = (
  onLongPress: () => void,
  onClick: (e: globalThis.MouseEvent) => void,
  onQuitLongPress: (e: globalThis.MouseEvent) => void,
  delay = 300
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const [PressTriggered, setPressTriggered] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const longPress = useRef<boolean>(false);
  const coordInit = useRef<Coord>();

  const start = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      coordInit.current = {
        x: e.clientX,
        y: e.clientY,
      };
      setPressTriggered(true);
      // onClick()
      document.body.addEventListener("mouseup", clear, { once: true });
      timeout.current = setTimeout(() => {
        onLongPress();
        longPress.current = true;
        setLongPressTriggered(true);
        setPressTriggered(false);
      }, delay);
    },
    [onLongPress, delay, onClick]
  );

  const onMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (!longPress.current && PressTriggered) {
        if (coordInit.current) {
          const deltaX = e.clientX - coordInit.current?.x;
          const deltaY = e.clientY - coordInit.current?.y;
          if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
            timeout.current && clearTimeout(timeout.current);
            onLongPress();
            longPress.current = true;
            setLongPressTriggered(true);
            setPressTriggered(false);
            // document.body.addEventListener("mouseup", clear, { once: true })
          }
        }
      }
    },
    [PressTriggered, longPressTriggered, onLongPress, coordInit.current]
  );

  const clear: (this: HTMLElement, e: globalThis.MouseEvent) => any =
    useCallback(
      (e) => {
        timeout.current && clearTimeout(timeout.current);
        longPress.current && onQuitLongPress(e);
        !longPress.current && onClick(e);
        longPress.current = false;
        setLongPressTriggered(false);
        setPressTriggered(false);
      },
      [onQuitLongPress, longPressTriggered]
    );

  return {
    onMouseDown: start as React.MouseEventHandler<HTMLDivElement>,
    // onTouchStart: onClick,
    onMouseMove: onMove as React.MouseEventHandler<HTMLDivElement>,
    // onMouseUp: clear,
  };
};

export default useLongPress;
