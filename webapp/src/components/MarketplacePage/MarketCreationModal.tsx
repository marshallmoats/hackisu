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

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";


interface MarketCreationModalProps {
    isOpen: boolean;
    handleClose: () => void;
}

const MarketCreationModal: FunctionComponent<MarketCreationModalProps> = (props): JSX.Element => {
    function submitAction() {

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
                    width: "32em",
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
                    <FormGroup sx={{ flexGrow: 1 }}>
                        <TextField label="Name" variant="outlined" />
                    </FormGroup>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "1em",

                    }}>
                        <Button variant="outlined" onClick={clearAndClose}>
                            Cancel
                        </Button>
                        <Button
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

export default MarketCreationModal;