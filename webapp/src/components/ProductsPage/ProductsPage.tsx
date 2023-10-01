//@ts-nocheck

import "./styles.css";
import Box from "@mui/material/Box";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";
import Item from "./Item";

const ProductsPage = (props): JSX.Element => {
    return <div right="0px" width="800px">
        <Box className="frsbc products-page-container" style={{
            height: "100%"
        }}>
            <Item item="Tomato" vendor="Ya Boi" location="Aldi's"/>
            <Item item="Tomato1" vendor="Ya Boi1" price="$5.00"/>
            <Item item="Tomato2" vendor="Ya Boi2" location="World Trade Center" price="$9.11"/>
        </Box>
        <Box className="frsbc market-page-container" style={{
            height: "100%"
        }}>
            <Item item="Tomato" vendor="Ya Boi"/>
            <Item item="Tomato1" vendor="Ya Boi1"/>
            <Item item="Tomato2" vendor="Ya Boi2"/>
        </Box>
    </div>
}

export default ProductsPage;