import "./styles.css";

import Box from "@mui/material/Box";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import ProductsLeftSidebar from "./ProductsLeftSidebar";
import ProductsMainContent from "./ProductsMainContent";
import { AppContext } from "../../context";
import { getProductsList } from "../../utils/BackendCalls";
import { ProductsProps } from "../../utils/types";

interface ProductsplacePageProps {

}

const ProductsplacePage: FunctionComponent<ProductsplacePageProps> = (props): JSX.Element => {
    const [Products, setProducts] = useState<ProductsProps[]>([]);
    const [searchPattern, setSearchPattern] = useState<string>("");

    useEffect(() => {
        getProductsList().then((res): void => {
            setProducts(res ?? []);
        })
    }, [])

    return <Box className="frsbc Products-page-container" style={{
        height: "100%"
    }}>
        <ProductsLeftSidebar setSearchPattern={setSearchPattern} />
        <ProductsMainContent Products={Products} searchPattern={searchPattern} />
    </Box>;
}

export default ProductsplacePage;