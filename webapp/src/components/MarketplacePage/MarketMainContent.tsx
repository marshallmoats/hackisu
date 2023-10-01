import Box from "@mui/material/Box";
import { FunctionComponent, useState } from "react";
import { MarketProps } from "../../utils/types";
import MarketplaceEntry from "./MarketplaceEntry";
import { cleanAndLowercase, haversineDistance } from "../../utils/Helpers";
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import MarketCreationModal from "./MarketCreationModal";


interface MarketMainContentProps {
    markets: MarketProps[];
    acceptEntry: (s: string, dist: number) => boolean;
}

const MarketplaceMainContent: FunctionComponent<MarketMainContentProps> = (props): JSX.Element => {
    const [saved, setSaved] = useState<number[]>([]);
    const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    function handleCloseModal() {
        setModalOpen(false);
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

    return <Box className="market-main-content">
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
        <Card elevation={4} className="market-entry-card">
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
                <EditCalendarIcon sx={{
                    transform: "scale(1.65)"
                }} fontSize="large" />
                <Typography fontSize="1.3em">
                    Add event
                </Typography>
            </CardActionArea>
        </Card>
    </Box>
}

export default MarketplaceMainContent;