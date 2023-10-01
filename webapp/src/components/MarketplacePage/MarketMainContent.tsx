import Box from "@mui/material/Box";
import { FunctionComponent, useState } from "react";
import { MarketProps } from "../../utils/types";
import MarketplaceEntry from "./MarketplaceEntry";
import { cleanAndLowercase } from "../../utils/Helpers";
import Snackbar from "@mui/material/Snackbar";


interface MarketMainContentProps {
    markets: MarketProps[];
    searchPattern: string;
}

const MarketplaceMainContent: FunctionComponent<MarketMainContentProps> = (props): JSX.Element => {
    const [saved, setSaved] = useState<number[]>([]);
    const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");

    function handleSaveAction(id: number) {
        const updatedSaved = [...saved];
        const idx = updatedSaved.indexOf(id)
        if (idx === -1) {
            updatedSaved.push(id);
            setSnackbarMessage("Saved market")
        } else {
            updatedSaved.splice(idx, 1)
            setSnackbarMessage("Unsaved market")
        }
        setSnackbarOpen(true);
        setSaved(updatedSaved);
    }

    function acceptEntry(s: string, pattern: string) {
        if (pattern.length === 0) return true;
        return cleanAndLowercase(s).includes(pattern);
    }

    return <Box className="market-main-content">
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={isSnackbarOpen}
            autoHideDuration={5000}
            onClose={() => { setSnackbarOpen(false) }}
            message={snackbarMessage}
        />
        {props.markets.map((m: MarketProps, i: number) => {
            if (!acceptEntry(m.name, props.searchPattern)) return null;
            return <MarketplaceEntry
                key={i}
                market={m}
                handleSaveAction={handleSaveAction}
                isSaved={saved.includes(m.id)}
            />
        })}
    </Box>
}

export default MarketplaceMainContent;