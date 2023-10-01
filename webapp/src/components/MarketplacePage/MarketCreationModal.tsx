import { FunctionComponent, useState, useContext, useEffect } from "react";

import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { createMarket, getAddressCoordinates } from "../../utils/BackendCalls";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


interface MarketCreationModalProps {
    isOpen: boolean;
    handleClose: () => void;
}

const MarketCreationModal: FunctionComponent<MarketCreationModalProps> = (props): JSX.Element => {
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [long, setLong] = useState<number | null>(null);
    const [lat, setLat] = useState<number | null>(null);
    const [formattedAddress, setFormattedAddress] = useState<string | null>(null);
    const [findSuccessful, setFindSuccessful] = useState<boolean | null>(null);
    const [waitingFind, setWaitingFind] = useState<boolean>(false);
    const [description, setDescription] = useState<string>("");
    const [waiting, setWaiting] = useState<boolean>(false);
    const incompleteForm = long === null || lat === null || name.length === 0 || description.length === 0;

    function findAddressAction() {
        setWaitingFind(true);
        setTimeout(() => {
            getAddressCoordinates(address).then((res) => {
                if (res === undefined) {
                    setFindSuccessful(false);
                } else {
                    setLong(res.longitude);
                    setLat(res.latitude);
                    setFormattedAddress(res.formattedAddress);
                    setFindSuccessful(true);
                }
            }).finally(() => {
                setWaitingFind(false);
            })
        }, 1300)
    }

    function printMessage() {
        if (waitingFind) return "Locating address..."
        if (findSuccessful === null) return "Input address and press find"
        if (!findSuccessful || lat === null || long === null) return "Error in locating address, try again"
        return `Success, located ${formattedAddress} at ${Math.round(lat * 1e6) / 1e6}, ${Math.round(long * 1e6) / 1e6}`
    }

    function submitAction() {
        setWaiting(true);
        if (!incompleteForm) {
            createMarket(name, long, lat, description, 0, 0).then(() => {
                clearAndClose();
                setWaiting(false);
            })
        } else {
            setWaiting(false);
        }
    }

    function clearAndClose() {
        props.handleClose();
    }

    return <Modal
        open={props.isOpen}
        onClose={props.handleClose}
        closeAfterTransition
    >
        <Fade in={props.isOpen}>
            <div style={{
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
                display: "grid",
                placeItems: "center",
                overflowY: "scroll"
            }}>
                <Paper sx={{
                    width: "39em",
                    height: "28em",
                    padding: "1.6em",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <div className="frsbc">
                        <Typography variant="h5">Create new market</Typography> :
                        <IconButton onClick={clearAndClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Divider sx={{ mt: 1, mb: 2 }} />
                    <FormGroup sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}>
                        <TextField label="Name" variant="outlined" value={name} onChange={(e) => { setName(e.target.value) }} />
                        <Box>
                            <Box className="frsbc" sx={{ gap: "1em", height: "60%" }}>
                                <TextField sx={{ flexGrow: 1 }} value={address} label="Address" variant="outlined" onChange={(e) => {
                                    setAddress(e.target.value)
                                }} />
                                <Button variant="contained" sx={{ height: "100%" }} disabled={waitingFind || address.length < 5}
                                    onClick={findAddressAction}>
                                    <SearchIcon />&ensp;
                                    <Typography>
                                        Find Address
                                    </Typography>
                                </Button>
                            </Box>
                            <Typography sx={{ mt: 0.5 }}>
                                {printMessage()}
                            </Typography>
                        </Box>
                        <TextField
                            multiline
                            value={description}
                            inputProps={{ maxLength: 8192 }}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                            maxRows={7}
                            placeholder="Description"
                        />
                        <Box className="frsbc" sx={{ gap: 2 }}>
                            <DatePicker sx={{ width: "100%" }} label="Start date" />
                            <DatePicker sx={{ width: "100%" }} label="End date" />
                        </Box>
                    </FormGroup>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "1em",
                    }}>
                        <Button
                            disabled={waiting}
                            variant="outlined"
                            onClick={clearAndClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={waiting || incompleteForm}
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={submitAction}
                        >
                            Submit
                        </Button>
                    </div>
                </Paper>
            </div>
        </Fade>
    </Modal>;
}

export default MarketCreationModal