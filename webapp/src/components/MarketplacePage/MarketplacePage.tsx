import "./styles.css";

import Box from "@mui/material/Box";
import { FunctionComponent, useContext, useEffect } from "react";
import MarketLeftSidebar from "./MarketLeftSidebar";
import MarketMainContent from "./MarketMainContent";
import { AppContext } from "../../context";
import { getMarketList } from "../../utils/BackendCalls";

interface MarketplacePageProps {

}

const MarketplacePage: FunctionComponent<MarketplacePageProps> = (props): JSX.Element => {
    const appCtx = useContext(AppContext);

    useEffect(() => {
        getMarketList().then((res) => {
            appCtx.markets = res ?? appCtx.markets
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