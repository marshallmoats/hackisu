import "./styles.css";

import Box from "@mui/material/Box";
import logo from "./logo.png"
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";

const HomePage = () => {
    return <Box style={{
        height: "100%",
        padding: "0em 0em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }}>
        <div className="frsbc" style={{
            margin: "4em 0em",
            maxWidth: "87em"
        }}>

            <div style={{
                width: "100%",
                height: "100%",
                paddingBottom: "2.275em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0px"
            }}>
                <img src={logo} height={350}></img>
            </div>
            <Divider orientation="vertical" sx={{ height: "20em", borderWidth: 2, ml: 4, mr: 4, borderColor: "#3d3d61" }} />
            <Box sx={{
                pt: 4,
                typography: {
                    color: "#0b0b23"
                }
            }}>
                <Typography variant="h4">
                    Welcome to <strong>HarvestHub</strong>, where we facilitate connections between farmers and consumers. Farmers can sell their produce, and users can discover local farmers markets. Our goal is to bring farmers and consumers closer together, ensuring that the     freshest produce reaches your table.
                    <br />Let's cultivate connections together.
                </Typography>
                <Box sx={{
                    mt: 2,
                    p: "0.1em 0.9em 0.7em 0em",
                    width: "fit-content",
                    textDecoration: "underline",
                    textDecorationColor: "#fe8801"
                }}>
                    <Typography variant="h4" color="#fe8801">
                        Sign up
                    </Typography>
                </Box>
            </Box>
        </div>
        <Box className="frsbc" sx={{
            width: "70%",
        }}>
            <Link href="/produce">
                <Button className="intro-chips">
                    <Typography variant="h5">
                        Placeholder text
                    </Typography>
                </Button>
            </Link>
            <Link href="markets">
                <Button className="intro-chips">
                    <Typography variant="h5">
                        Browse farmers' marketplaces
                    </Typography>
                </Button>
            </Link>
            <Link href="map">
                <Button className="intro-chips">
                    <Typography variant="h5">
                        Explore local markets near you
                    </Typography>
                </Button>
            </Link>
        </Box>
    </Box>;
}

export default HomePage;