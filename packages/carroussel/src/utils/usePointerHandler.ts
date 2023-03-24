import * as React from "react";
import { Images } from "../component/Carroussel";

export const usePointerHandler = (images: Images, pasVariable: number) => {
  const arrayIndexImages = React.useMemo(
    () => images.map((item, index) => index),
    [images]
  );
  const numberImage = React.useMemo(() => images.length, [images]);
  const [stateNumber, setStateNumber] = React.useState(0);
  const [percentage, setPercentage] = React.useState(0);
  const [mouseDown, setMouseDown] = React.useState(false);

  const [indexImageLoadRight, setIndexImageLoadRight] = React.useState(
    arrayIndexImages[3]
  );
  const [indexImageLoadLeft, setIndexImageLoadLeft] = React.useState(
    arrayIndexImages.at(-3) as number
  );
  const refArrayAllNumberState = React.useRef([0, 1, 2, 3, 4, 5, 6]);
  const refDirectiobOfmouvement = React.useRef<"right" | "left">("right");
  const refPreviousPosX = React.useRef(0);
  const refStateNumber = React.useRef(0);
  const refStateNumberPrevious = React.useRef(0);
  const refPercentage = React.useRef(0);

  const makeHandlepointerMove =
    (xInit: number, imagesLenght: number) => (e: PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const movementX = (e.clientX - xInit) * pasVariable;
      const arraySplit = movementX.toString().split(".");
      const valeurEntier = parseInt(arraySplit[0], 10);
      const valeurFlootante = parseFloat(`0.${arraySplit[1]}`);
      const indexCurrentNumber = refArrayAllNumberState.current.findIndex(
        (item) => item === refStateNumberPrevious.current
      );
      const newStateNumber = refArrayAllNumberState.current.at(
        (indexCurrentNumber + valeurEntier) % 7
      ) as number;
      setStateNumber(newStateNumber);
      setPercentage(valeurFlootante);
      const diffPrevNext = movementX - refPreviousPosX.current;
      refPreviousPosX.current = movementX;
      const directionmovement = movementX < 0 ? "left" : "right";
      refDirectiobOfmouvement.current = directionmovement;
      if (refStateNumber.current !== newStateNumber) {
        if (refDirectiobOfmouvement.current === "right") {
          if (diffPrevNext < 0) {
            setIndexImageLoadRight(
              (prev) => Math.round(prev + 1) % numberImage
            );
            setIndexImageLoadLeft((prev) => Math.round(prev + 1) % numberImage);
          } else {
            setIndexImageLoadRight(
              (prev) => Math.round(prev - 1) % numberImage
            );
            setIndexImageLoadLeft((prev) => Math.round(prev - 1) % numberImage);
          }
        } else {
          if (diffPrevNext > 0) {
            setIndexImageLoadRight(
              (prev) => Math.round(prev - 1) % numberImage
            );
            setIndexImageLoadLeft((prev) => Math.round(prev - 1) % numberImage);
          } else {
            setIndexImageLoadRight(
              (prev) => Math.round(prev + 1) % numberImage
            );
            setIndexImageLoadLeft((prev) => Math.round(prev + 1) % numberImage);
          }
        }
      }
      refStateNumber.current = newStateNumber;
      refPercentage.current = valeurFlootante;
    };
  const handlePointerDown = React.useCallback((e: React.PointerEvent) => {
    const handlepointerMove = makeHandlepointerMove(e.clientX, numberImage);
    setMouseDown(true);
    document.addEventListener("pointermove", handlepointerMove);
    document.addEventListener(
      "pointerup",
      () => {
        const newStateNumber =
          refDirectiobOfmouvement.current === "right"
            ? Math.round(refStateNumber.current + refPercentage.current)
            : (refArrayAllNumberState.current.at(
                Math.round(refStateNumber.current - refPercentage.current)
              ) as number);
        if (newStateNumber !== refStateNumber.current) {
          if (refDirectiobOfmouvement.current !== "right") {
            setIndexImageLoadRight(
              (prev) => Math.round(prev + 1) % numberImage
            );
            setIndexImageLoadLeft((prev) => Math.round(prev + 1) % numberImage);
          } else {
            setIndexImageLoadRight(
              (prev) => Math.round(prev - 1) % numberImage
            );
            setIndexImageLoadLeft((prev) => Math.round(prev - 1) % numberImage);
          }
        }
        setStateNumber(newStateNumber === 7 ? 0 : newStateNumber);
        refStateNumberPrevious.current =
          newStateNumber === 7 ? 0 : newStateNumber;
        refStateNumber.current = newStateNumber === 7 ? 0 : newStateNumber;
        setPercentage(0);
        setMouseDown(false);
        refPercentage.current = 0;
        document.removeEventListener("pointermove", handlepointerMove);
      },
      { once: true }
    );
  }, []);

  const handleDownButton = (e: React.PointerEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMouseDown(true);
  };

  const handleUpButtonLeft = (e: React.PointerEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndexImageLoadRight((prev) => Math.round(prev + 1) % numberImage);
    setIndexImageLoadLeft((prev) => Math.round(prev + 1) % numberImage);
    setStateNumber(
      (previousState) =>
        refArrayAllNumberState.current.at(previousState - (1 % 7)) as number
    );
    setPercentage(0);
    setMouseDown(false);
  };

  const handleUpButtonRight = (e: React.PointerEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndexImageLoadRight((prev) => Math.round(prev - 1) % numberImage);
    setIndexImageLoadLeft((prev) => Math.round(prev - 1) % numberImage);
    setStateNumber((previousState) =>
      previousState + 1 === 7 ? 0 : previousState + 1
    );
    setPercentage(0);
    setMouseDown(false);
  };

  return {
    numberImage: numberImage,
    stateNumber: stateNumber,
    percentage: percentage,
    mouseDown: mouseDown,
    indexImageLoadRight: indexImageLoadRight,
    indexImageLoadLeft: indexImageLoadLeft,
    directiobOfmouvement: refDirectiobOfmouvement.current,
    makeHandlepointerMove: makeHandlepointerMove,
    handlePointerDown: handlePointerDown,
    handleDownButton: handleDownButton,
    handleUpButtonLeft: handleUpButtonLeft,
    handleUpButtonRight: handleUpButtonRight,
  };
};
