import Box from "@mui/material/Box";
import { FunctionComponent, useState } from "react";
import { ProductsProps } from "../../utils/types";
import ProductsplaceEntry from "./ProductsEntry";
import { cleanAndLowercase } from "../../utils/Helpers";
import Snackbar from "@mui/material/Snackbar";


interface ProductsMainContentProps {
    Products: ProductsProps[];
    searchPattern: string;
}

const ProductsplaceMainContent: FunctionComponent<ProductsMainContentProps> = (props): JSX.Element => {
    const [saved, setSaved] = useState<number[]>([]);
    const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    function handleSaveAction(id: number) {
        const updatedSaved = [...saved];
        const idx = updatedSaved.indexOf(id)
        if (idx === -1) {
            updatedSaved.push(id);
            setSnackbarMessage("Saved Products")
        } else {
            updatedSaved.splice(idx, 1)
            setSnackbarMessage("Unsaved Products")
        }
        setSnackbarOpen(true);
        setSaved(updatedSaved);
    }

    function acceptEntry(s: string, pattern: string) {
        if (pattern.length === 0) return true;
        return cleanAndLowercase(s).includes(pattern);
    }

    return <Box className="products-main-content">
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={isSnackbarOpen}
            autoHideDuration={5000}
            onClose={() => { setSnackbarOpen(false) }}
            message={snackbarMessage}
        />
        {props.Products.map((m: ProductsProps, i: number) => {
            if (!acceptEntry(m.name, props.searchPattern)) return null;
            return <ProductsplaceEntry
                key={i}
                Products={m}
                handleSaveAction={handleSaveAction}
                isSaved={saved.includes(m.id)}
            />
        })}
    </Box>
}

export default ProductsplaceMainContent;