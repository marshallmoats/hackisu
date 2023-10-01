import Paper from "@mui/material/Paper";
import { ChangeEvent, FunctionComponent, useState } from "react";
import Searchbar from "../Misc/Searchbar";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormGroup, InputLabel, MenuItem, Radio, RadioGroup, Select, Switch, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

interface MarketLeftSidebarProps {
    setSearchPattern: (arg0: string) => void;
    isLimitDistance: boolean;
    setIsLimitDistance: (arg0: boolean) => void;
    maxDistance: number;
    setMaxDistance: (arg0: number) => void;

}

const MarketLeftSidebar: FunctionComponent<MarketLeftSidebarProps> = (props): JSX.Element => {
    const [isStudent, setIsStudent] = useState(false);
    const [gender, setGender] = useState('male');
    const [country, setCountry] = useState('');

    const handleChange = (event: Event, newValue: number | number[]) => {
        props.setMaxDistance(newValue as number);
    };

    const handleCheckboxChange = (event: any) => {
        setIsStudent(event.target.checked);
    };

    const handleRadioChange = (event: any) => {
        setGender(event.target.value);
    };

    const handleDropdownChange = (event: any) => {
        setCountry(event.target.value);
    };

    return (
        <Paper elevation={6} className="market-left-sidebar">
            <Box style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "12px"
            }}>
                <Searchbar
                    placeholder="Search for markets"
                    onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => { props.setSearchPattern(e.target.value) }}
                />
            </Box>
            <FormGroup sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4em"
            }}>
                <Box className="frsbc">
                    <FormControlLabel control={
                        <Switch
                            value={props.isLimitDistance}
                            onChange={(e) => { props.setIsLimitDistance(e.target.checked) }}
                        />
                    } label="Limit distance" />
                    <FormControl aria-label="text" sx={{ flexGrow: 1 }}>
                        <Slider
                            value={props.maxDistance}
                            defaultValue={100}
                            disabled={!props.isLimitDistance}
                            onChange={handleChange}
                            min={0}
                            max={300}
                            valueLabelDisplay="auto"
                        />
                    </FormControl>
                    <Typography noWrap sx={{ width: "4.6em", ml: 2, float: "right" }}>{props.maxDistance} miles</Typography>
                </Box>
                <DatePicker label="Filter date: MM/DD/YYYY" />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isStudent}
                            onChange={handleCheckboxChange}
                            color="primary"
                        />
                    }
                    label="Placeholder"
                />
                <FormControl component="fieldset">
                    <FormLabel>Placeholder</FormLabel>
                    <RadioGroup
                        value={gender}
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel value="a" control={<Radio />} label="Placeholder" />
                        <FormControlLabel value="b" control={<Radio />} label="Placeholder" />
                        <FormControlLabel value="c" control={<Radio />} label="Placeholder" />
                    </RadioGroup>
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel id="country-label">Placeholder</InputLabel>
                    <Select
                        labelId="country-label"
                        id="country-select"
                        value={country}
                        onChange={handleDropdownChange}
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

export default MarketLeftSidebar;