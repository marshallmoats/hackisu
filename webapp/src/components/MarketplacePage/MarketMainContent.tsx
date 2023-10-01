import { FunctionComponent, useState } from "react";
import { MarketProps } from "../../utils/types";
import MarketplaceEntry from "./MarketplaceEntry";
import { haversineDistance } from "../../utils/Helpers";
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import MarketCreationModal from "./MarketCreationModal";
import AddBoxIcon from '@mui/icons-material/AddBox';
import Paper from "@mui/material/Paper";


interface MarketMainContentProps {
    markets: MarketProps[];
    acceptEntry: (s: string, dist: number) => boolean;
    refreshMarketList: () => void;
}

const MarketplaceMainContent: FunctionComponent<MarketMainContentProps> = (props): JSX.Element => {
    const [saved, setSaved] = useState<number[]>([]);
    const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    function handleCloseModal() {
        props.refreshMarketList();
        setTimeout(() => { setModalOpen(false) }, 500);
    }

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

    return <Paper elevation={3} className="market-main-content">
        {modalOpen &&
            <MarketCreationModal isOpen={modalOpen} handleClose={handleCloseModal} />
        }
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={isSnackbarOpen}
            autoHideDuration={5000}
            onClose={() => { setSnackbarOpen(false) }}
            message={snackbarMessage}
        />
        {props.markets.map((m: MarketProps, i: number) => {
            const dist = haversineDistance(m.long, m.lat);
            if (!props.acceptEntry(m.name, dist)) return null;
            return <MarketplaceEntry
                key={i}
                market={m}
                handleSaveAction={handleSaveAction}
                isSaved={saved.includes(m.id)}
                geodesicDistance={dist}
            />
        })}
        <Card elevation={6} className="market-entry-card" sx={{ height: "21em" }}>
            <CardActionArea sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 4
            }}
                onClick={() => {
                    setModalOpen(true);
                }}>
                <AddBoxIcon sx={{
                    transform: "scale(2.0)"
                }} fontSize="large" />
                <Typography fontSize="1.3em">
                    Add market
                </Typography>
            </CardActionArea>
        </Card>
    </Paper>
}

export default MarketplaceMainContent;