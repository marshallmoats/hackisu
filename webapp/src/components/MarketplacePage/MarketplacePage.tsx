import "./styles.css";

import Box from "@mui/material/Box";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import MarketLeftSidebar from "./MarketLeftSidebar";
import MarketMainContent from "./MarketMainContent";
import { AppContext } from "../../context";
import { getMarketList } from "../../utils/BackendCalls";
import { MarketProps } from "../../utils/types";
import { cleanAndLowercase } from "../../utils/Helpers";

interface MarketplacePageProps {

}

const MarketplacePage: FunctionComponent<MarketplacePageProps> = (props): JSX.Element => {
    const [markets, setMarkets] = useState<MarketProps[]>([]);
    const [searchPattern, setSearchPattern] = useState<string>("");

    const [isLimitDistance, setIsLimitDistance] = useState<boolean>(false);
    const [maxDistance, setMaxDistance] = useState<number>(100);

    function acceptEntry(s: string) {
        return cleanAndLowercase(s).includes(searchPattern);
    }

    useEffect(() => {
        getMarketList().then((res): void => {
            setMarkets(res);
        })
    }, [])

    return <Box className="frsbc market-page-container" style={{
        height: "100%"
    }}>
        <MarketLeftSidebar
            setSearchPattern={setSearchPattern}
            isLimitDistance={isLimitDistance}
            setIsLimitDistance={setIsLimitDistance}
            maxDistance={maxDistance}
            setMaxDistance={setMaxDistance}
        />
        <MarketMainContent markets={markets} acceptEntry={acceptEntry} />
    </Box>;
}

export default MarketplacePage;