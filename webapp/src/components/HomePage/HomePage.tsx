import "./styles.css";

import Box from "@mui/material/Box";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import { getMarketList } from "../../utils/BackendCalls";
import { MarketProps } from "../../utils/types";
import { cleanAndLowercase } from "../../utils/Helpers";

interface MarketplacePageProps {

}

const MarketplacePage: FunctionComponent<MarketplacePageProps> = (props): JSX.Element => {
    return <Box className="frsbc market-page-container" style={{
        height: "100%"
    }}>
        Hi
    </Box>;
}

export default MarketplacePage;