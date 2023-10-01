import Paper from "@mui/material/Paper";
import { ChangeEvent, FunctionComponent } from "react";
import Searchbar from "../Misc/Searchbar";
import Box from "@mui/material/Box";

interface ProductsLeftSidebarProps {
    setSearchPattern: (arg0: string) => void;
}

const ProductsLeftSidebar: FunctionComponent<ProductsLeftSidebarProps> = (props): JSX.Element => {

    return (<Paper elevation={6} className="Products-left-sidebar">
        <Box sx={{
            m: 2,
            background: "#eee",
            border: "1px solid #ccc",
            borderRadius: "4px"
        }}>
            <Searchbar onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => { props.setSearchPattern(e.target.value) }} />
        </Box>
    </Paper>);
}

export default ProductsLeftSidebar;