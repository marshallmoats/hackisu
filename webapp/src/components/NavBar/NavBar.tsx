import { FunctionComponent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import logo from "./logo.png";
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface NavBarProps {

}

const NavBar: FunctionComponent<NavBarProps> = (props): JSX.Element => {
    const theme = useTheme();
    console.log(theme.palette);

    return <Box sx={{ flexGrow: 1 }}>
        <Box position="static" className="frsbc" style={{
            background: "none",
            // border: "1px solid red",
        }}>
            <Box style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1em",
                width: "fit-content",
                border: "2px solid " + theme.palette.primary.main,
                borderRadius: "8px",
            }}>
                <a href="/" target="_blank">
                    <img src={logo} height={52} alt="Foreman XAI by Percēv" />
                </a>
                <Divider orientation='vertical' />
                <Box className="frsbc">
                    <Button sx={{ fontSize: "1.2em", typography: { textTransform: "none", color: "#000" } }}>
                        Home
                    </Button>
                </Box>
            </Box>
        </Box>
    </Box>

}

export default NavBar;