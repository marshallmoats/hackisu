import { ChangeEvent, FunctionComponent, useState } from "react";
import Searchbar from "../Misc/Searchbar";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormGroup, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Switch, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

interface ProductsLeftSidebarProps {
    setSearchPattern: (arg0: string) => void;
}

const ProductsLeftSidebar: FunctionComponent<ProductsLeftSidebarProps> = (props): JSX.Element => {

    return (<Paper elevation={6} className="products-left-sidebar">
        <Box sx={{
            background: "#eee",
            border: "1px solid #ccc",
            borderRadius: "4px"
        }}>
            <Searchbar onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => { props.setSearchPattern(e.target.value) }} />

        </Box>
        <FormGroup sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.4em"
        }}>
            <FormControlLabel
                control={
                    <Checkbox color="primary" />
                }
                label="Placeholder"
            />
            <FormControl component="fieldset">
                <FormLabel>Placeholder</FormLabel>
                <RadioGroup>
                    <FormControlLabel value="a" control={<Radio />} label="Placeholder" />
                    <FormControlLabel value="b" control={<Radio />} label="Placeholder" />
                    <FormControlLabel value="c" control={<Radio />} label="Placeholder" />
                </RadioGroup>
            </FormControl>
            <FormControl variant="outlined">
                <InputLabel id="label">Placeholder</InputLabel>
                <Select
                    labelId="label"
                    id="select"
                    label="Placeholder"
                >
                    <MenuItem value="a">Placeholder</MenuItem>
                    <MenuItem value="b">Placeholder</MenuItem>
                    <MenuItem value="c">Placeholder</MenuItem>
                    <MenuItem value="d">Placeholder</MenuItem>
                </Select>
            </FormControl>
        </FormGroup>
    </Paper>);
}

export default ProductsLeftSidebar;