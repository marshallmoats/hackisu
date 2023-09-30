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
import Searchbar from "../Misc/Searchbar";

interface NavBarProps {

}

const NavBar: FunctionComponent<NavBarProps> = (props): JSX.Element => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log(theme.palette);

    return <Box sx={{ flexGrow: 1 }}>
        <Box className="frsbc" style={{
            background: "none"
        }}>
            <Box className="frsbc" style={{
                gap: "1em",
                padding: "0.05em 0.85em 0.05em 1.15em",
                width: "fit-content",
                border: "2px solid " + theme.palette.primary.main,
                borderRadius: "12px",
                background: "#f2f2f2",
            }}>
                <a href="/">
                    <img src={logo} height={52} alt="Foreman XAI by Percēv" />
                </a>

                <Box className="frsbc" sx={{ button: { fontSize: "1.2em", typography: { textTransform: "none", color: "#000" } } }}>
                    <Button>Home</Button>
                    <Button>Market</Button>
                    <Button>Events</Button>
                    <Button>Map</Button>
                    <IconButton
                        size="large"
                        color="inherit"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <AccountCircleIcon color="primary"
                        />
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
            </Box>

            <Box className="frsbc" style={{
                gap: "1em",
                padding: "0.05em 0.85em 0.05em 1.15em",
                width: "fit-content",
                border: "2px solid " + theme.palette.primary.main,
                borderRadius: "12px",
                background: "#f2f2f2"
            }}>
                <Searchbar onChange={() => { }} />
            </Box>
        </Box>
    </Box>

}

export default NavBar;