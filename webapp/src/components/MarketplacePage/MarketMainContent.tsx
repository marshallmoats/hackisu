import Box from "@mui/material/Box";
import { FunctionComponent, useContext } from "react";
import { AppContext } from "../../context";

interface MarketMainContentProps {

}

const MarketplaceMainContent: FunctionComponent<MarketMainContentProps> = (props): JSX.Element => {
    const appCtx = useContext(AppContext);

    return (<Box className="market-main-content">
        
        {JSON.stringify(appCtx)}
    </Box>);
}

export default MarketplaceMainContent;