import "./styles.css";

import Box from "@mui/material/Box";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import MarketLeftSidebar from "./MarketLeftSidebar";
import MarketMainContent from "./MarketMainContent";
import { AppContext } from "../../context";
import { getMarketList } from "../../utils/BackendCalls";
import { MarketProps } from "../../utils/types";

interface MarketplacePageProps {

}

const MarketplacePage: FunctionComponent<MarketplacePageProps> = (props): JSX.Element => {
    const [markets, setMarkets] = useState<MarketProps[]>([]);
    const [searchPattern, setSearchPattern] = useState<string>("");

    useEffect(() => {
        getMarketList().then((res): void => {
            setMarkets(res ?? []);
        })
    }, [])

    return <Box className="frsbc market-page-container" style={{
        height: "100%"
    }}>
        <MarketLeftSidebar setSearchPattern={setSearchPattern} />
        <MarketMainContent markets={markets} searchPattern={searchPattern} />
    </Box>;
}

export default MarketplacePage;