import * as React from "react";

export const useHover = () => {
  const [hover, setHover] = React.useState<boolean>(false);
  const handleEnter = React.useCallback(() => {
    setHover(true);
  }, []);

  const handleLeave = React.useCallback(() => {
    setHover(false);
  }, []);
  return {
    onHover: {
      onPointerEnter: handleEnter,
      onPointerLeave: handleLeave,
    },
    hover: hover,
  };
};
