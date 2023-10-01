import Box from "@mui/material/Box";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import logo from "./logo.png"
import Typography from "@mui/material/Typography";

const HomePage = () => {
    return <Box className="frsbc market-page-container" style={{
        height: "100%",
    }}>
        <div style={{        
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0px"
        }}>
            <img src={logo}></img>
        </div>
    </Box>;
}

export default HomePage;