import { useRef, useEffect, createContext } from "react";

interface ShiftContext {
  isShiftPressed: boolean;
}

const ShiftContext = createContext({
  isShiftPressed: false,
} as ShiftContext);

type ShiftContextProviderProps = {
  children: React.ReactNode;
};

const ShiftContextProvider = (props: ShiftContextProviderProps) => {
  const isShiftPressed = useRef<boolean>(false);

  useEffect(() => {
    if (!window) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        isShiftPressed.current = true;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        isShiftPressed.current = false;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <ShiftContext.Provider value={{ isShiftPressed: isShiftPressed.current }}>
      {props.children}
    </ShiftContext.Provider>
  );
};

export { ShiftContext, ShiftContextProvider };
