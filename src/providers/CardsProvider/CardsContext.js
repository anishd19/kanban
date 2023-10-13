import { createContext, useContext } from "react";

export const CardsContext = createContext();

export const useCards = () => {
  return useContext(CardsContext);
};
