import "../../App.css";

import { ChangeEvent, FunctionComponent, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import logo from "./logo.png";
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from '@mui/icons-material/Search';
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import InputBase from "@mui/material/InputBase";

interface NavBarProps {

}

const NavBar: FunctionComponent<NavBarProps> = (props): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return <Box className="frsbc" style={{
        flexGrow: 1,
        padding: "0.1em",
        background: "#f0000000"
    }}>
        <div style={{ flexGrow: 1, width: "100%" }}>
            <Paper className="frsbc navbar-chip" sx={{ width: "fit-content" }} elevation={8}>
                <a href="/">
                    <img src={logo} height={52} />
                </a>
                <Divider orientation="vertical" sx={{ height: 36 }} />
                <Box className="frsbc" sx={{
                    button: {
                        fontSize: "1.1em", typography: { textTransform: "none", color: "#000" },
                        "&:hover": {
                            background: "#ddd"
                        }
                    }
                }}>
                    <Link to={"/"}>
                        <Button>Home</Button>
                    </Link>
                    <Link to={"/produce"}>
                        <Button>Produce</Button>
                    </Link>
                    <Link to={"/markets"}>
                        <Button>Markets</Button>
                    </Link>
                    <Link to={"/map"}>
                        <Button>Map</Button>
                    </Link>
                </Box>
            </Paper>
        </div>
        {/* <div style={{ flexGrow: 1, width: "100%", display: "flex", justifyContent: "center" }}>
            <Paper className="frsbc navbar-chip" elevation={8} sx={{ width: "70% !important" }}>
                
            </Paper>
        </div> */}

        <div style={{ flexGrow: 1, width: "100%", display: "flex", justifyContent: "end" }}>
            <Paper className="frsbc navbar-chip" elevation={8} sx={{ height: "62px !important" }}>
                <Box
                    component="form"
                    sx={{
                        p: "3px",
                        pl: "6spx",
                        display: 'flex',
                        mt: "1px", mb: "1px",
                        alignItems: 'center',
                        width: "100%",
                        boxSizing: "border-box"
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search HarvestHub"
                        onChange={() => { }}
                    />
                    <IconButton type="button" sx={{ p: '4px' }}>
                        <SearchIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ height: 36}} orientation="vertical" />
                <Box className="frsbc" sx={{
                    button: {
                        fontSize: "1.0em", typography: { textTransform: "none", color: "#000" },
                        "&:hover": {
                            background: "#ddd"
                        }
                    }
                }}>
                    <Link to={"/login"}>
                        <Button><Typography noWrap fontSize="1em">Log in</Typography></Button>
                    </Link>
                    <Link to={"/register"}>
                        <Button><Typography noWrap fontSize="1em">Sign up</Typography></Button>
                    </Link>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Account</MenuItem>
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>Log out</MenuItem>
                    </Menu>
                </Box>
            </Paper>
        </div>
    </Box>;
}

export default NavBar;