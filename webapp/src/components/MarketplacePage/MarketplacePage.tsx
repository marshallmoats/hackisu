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
    const appCtx = useContext(AppContext);
    const [markets, setMarkets] = useState<MarketProps[]>([]);

    useEffect(() => {
        getMarketList().then((res): void => {
            setMarkets(res ?? markets);
            appCtx.markets = markets;
            appCtx.setMarkets = setMarkets;
            console.log(markets)
        })
    }, [])

    return <Box className="frsbc market-page-container" style={{
        height: "100%"
    }}>
        <MarketLeftSidebar />
        <MarketMainContent />
    </Box>;
}

export default MarketplacePage;