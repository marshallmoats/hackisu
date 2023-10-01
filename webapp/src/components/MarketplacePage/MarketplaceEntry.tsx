import Box from "@mui/material/Box";
import { FunctionComponent, useState } from "react";
import { MarketProps } from "../../utils/types";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from "@mui/material/Divider";
import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';
import { hashString, haversineDistance, randomMarketImage, timestampToDate } from "../../utils/Helpers";
import Rating from "@mui/material/Rating";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EventIcon from '@mui/icons-material/Event';
import ShareIcon from '@mui/icons-material/Share';
import CardActionArea from "@mui/material/CardActionArea";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from "react-router-dom";

interface MarketplaceEntryProps {
    market: MarketProps;
    handleSaveAction: (arg0: number) => void;
    isSaved: boolean;
    geodesicDistance: number;
}

const MarketplaceEntry: FunctionComponent<MarketplaceEntryProps> = (props): JSX.Element => {
    const [ratingValue, setRatingValue] = useState<number>(hashString(props.market.name) % 3 / 2 + 3.5);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<Card elevation={4} className="market-entry-card">
        <CardHeader
            style={{
                padding: "0.55em 1.3em 0.55em 1.125em",
                width: "90%"
            }}
            action={
                <IconButton
                    size="large"
                    color="inherit"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
            }
            title={
                <Typography fontSize="1em" sx={{
                    "&:hover": {
                        textDecoration: "underline",
                        cursor: "pointer"
                    }
                }}>
                    {props.market.name}
                </Typography>
            }
            subheader={<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <LocationOnIcon fontSize="small" />
                <Typography color="text.secondary" fontSize="0.9em">
                    {Math.round(props.geodesicDistance * 100) / 100} miles
                </Typography>
                &ensp;&#xB7;&ensp;
                <EventIcon fontSize="small" sx={{ mr: 0.3 }} />
                <Typography color="text.secondary" fontSize="0.9em">
                    {timestampToDate(props.market.startTime)} - {timestampToDate(props.market.endTime)}
                </Typography>
            </Box>
            }
        />
        <Divider />
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <ShareIcon />
                </ListItemIcon>
                <ListItemText>Share</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <VisibilityOffIcon />
                </ListItemIcon>
                <ListItemText>Hide</ListItemText>
            </MenuItem>
        </Menu>
        <CardActionArea
            sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start" }}
            component={Link} to={`/markets/${props.market.id}`}
        >
            <CardMedia
                component="img"
                height="132"
                image={randomMarketImage(props.market.id)}
            />
            <CardContent sx={{ p: "0.3em 0.7em" }}>
                <Typography sx={{
                    fontSize: "0.85em",
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                }} variant="body2" color="text.primary">
                    {props.market.description}
                </Typography>
            </CardContent>
        </CardActionArea>
        <Divider />
        <CardActions className="frsbc" sx={{ pt: 0, pb: 0, pr: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", m: "0.375em" }}>
                <IconButton aria-label="save" onClick={() => {
                    setTimeout(() => { props.handleSaveAction(props.market.id) }, 460)
                }}>
                    <BookmarkSharpIcon color={props.isSaved ? "primary" : undefined} />
                </IconButton>
                <Typography>
                    Save
                </Typography>
            </Box>
            <Rating value={ratingValue} precision={0.5} readOnly />
        </CardActions>
    </Card >);
}

export default MarketplaceEntry;