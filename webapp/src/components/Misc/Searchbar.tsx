import { FunctionComponent, ChangeEvent } from "react";

import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";

import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

import Box from "@mui/material/Box";

interface SearchbarProps {
    onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    placeholder?: string | undefined;
}

const Searchbar: FunctionComponent<SearchbarProps> = (props): JSX.Element => {
    return (<Box
        component="form"
        sx={{
            p: "3px",
            pl: "8px",
            display: 'flex',
            mt: "2px", mb: "2px",
            alignItems: 'center',
            width: "100%",
            boxSizing: "border-box"
        }}
    >
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={props.placeholder ?? "Search"}
            onChange={props.onChange}
        />
        <IconButton type="button" sx={{ p: '10px' }}>
            <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton  sx={{ p: '10px' }}>
            <FilterListIcon />
        </IconButton>
    </Box>);
}

export default Searchbar;