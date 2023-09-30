import Paper from "@mui/material/Paper";
import { FunctionComponent } from "react";
import Searchbar from "../Misc/Searchbar";
import Box from "@mui/material/Box";

interface MarketLeftSidebarProps {

}

const MarketLeftSidebar: FunctionComponent<MarketLeftSidebarProps> = (props): JSX.Element => {

    return (<Paper elevation={6} className="market-left-sidebar">
        <Box sx={{
            m: 2,
            background: "#eee",
            border: "1px solid #ccc",
            borderRadius: "4px"
        }}>
            <Searchbar onChange={() => { }} />
        </Box>
    </Paper>);
}

export default MarketLeftSidebar;