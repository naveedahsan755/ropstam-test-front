import { useContext } from "react";
import { storeContext } from "../Store";

export const useStore = () => {
  return useContext(storeContext);
};
