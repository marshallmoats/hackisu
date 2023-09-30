import { createContext, useContext } from "react";
import { MarketProps } from "./utils/types";

export interface AppContextProps {
    markets: MarketProps[]
}

export const AppContext = createContext<AppContextProps>({
    markets: []
});