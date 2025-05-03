"use client";

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Colors = "blue" | "green" | "";

type ColorPrefrencesContext = {
  color: Colors;
  selectColor: (color: Colors) => void;
};

const ColorPrefrencesContext = createContext<
  ColorPrefrencesContext | undefined
>(undefined);

export const useColorPrefrences = () => {
  const context = useContext(ColorPrefrencesContext);
  if (!context) {
    throw new Error(
      "useColorPrefrences must be used within a ColorPrefrencesProvider"
    );
  }

  return context;
};

export const ColorPrefrencesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [color, setColor] = useState<Colors>(() => {
    const storedColor =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("selectedColor")
        : null;
    return (storedColor as Colors) || "";
  });
  const [isMounted, setIsMounted] = useState(false);

  const selectColor = (color: Colors) => {
    setColor(color);
  };

  useEffect(() => {
    localStorage.setItem("selectedColor", color);
    setIsMounted(true);
  }, [color]);

  if (!isMounted) return null;
  return (
    <ColorPrefrencesContext.Provider value={{ color, selectColor }}>
      {children}
    </ColorPrefrencesContext.Provider>
  );
};
