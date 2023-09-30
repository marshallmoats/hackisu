import { createContext, useContext } from "react";
import { MarketProps } from "./utils/types";

export interface AppContextProps {
    markets: MarketProps[],
    setMarkets: (arg0: MarketProps[]) => void;
}

export const emptyAppContext = {
    markets: [],
    setMarkets: () => [],
}

export const AppContext = createContext<AppContextProps>(emptyAppContext);