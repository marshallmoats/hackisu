import Box from "@mui/material/Box";
import { FunctionComponent, useState } from "react";
import { ProductsProps } from "../../utils/types";
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
import { hashString } from "../../utils/Helpers";
import Rating from "@mui/material/Rating";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ShareIcon from '@mui/icons-material/Share';
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router-dom";

interface ProductsplaceEntryProps {
    Products: ProductsProps;
    handleSaveAction: (arg0: number) => void;
    isSaved: boolean;
}

const ProductsplaceEntry: FunctionComponent<ProductsplaceEntryProps> = (props): JSX.Element => {
    const [ratingValue, setRatingValue] = useState<number>(hashString(props.Products.name) % 3 / 2 + 3.5);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    let imgURL;
    try {
        imgURL = URL.createObjectURL(props.Products.image);
    }
    catch {}

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<Card elevation={4} className="Products-entry-card">
        <CardActionArea sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start" }}
            component={Link} to={`/market/${props.Products.id}`}
        >
            <CardHeader
                style={{
                    padding: "0.65em 1.4em 0.65em 1.275em",
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
                    <Typography fontSize="1.2em" sx={{
                        "&:hover": {
                            textDecoration: "underline",
                            cursor: "pointer"
                        }
                    }}>
                        {props.Products.name}
                    </Typography>
                }
                subheader={
                    <Typography color="text.secondary" fontSize="0.8em">
                        {props.Products.vendor}
                    </Typography>
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
            <CardMedia
                component="img"
                height="192"
                image={imgURL ? imgURL : "./placeHolder.png"}
            />
            <CardContent >
                <Typography sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                }} variant="body2" color="text.primary">
                    {props.Products.description}
                </Typography>
            </CardContent>
        </CardActionArea>
        <Divider />
        <CardActions className="frsbc" sx={{ pt: 0, pb: 0, pr: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", m: "0.375em" }}>
                <IconButton aria-label="save" onClick={() => {
                    setTimeout(() => { props.handleSaveAction(props.Products.id) }, 620)
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

export default ProductsplaceEntry;