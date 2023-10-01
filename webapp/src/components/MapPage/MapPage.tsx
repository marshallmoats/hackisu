import "./styles.css";
import { FunctionComponent } from "react";
import { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { currentLongitude, currentLatitude } from "../../utils/Helpers";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { getMarketList } from "../../utils/BackendCalls";
import { MarketProps } from "../../utils/types";
import Typography from '@mui/material/Typography';
import { haversineDistance, timestampToDate } from "../../utils/Helpers";
import EventIcon from '@mui/icons-material/Event';
import CardActionArea from "@mui/material/CardActionArea";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { Link } from "@mui/material";

interface MapPageProps {

}

const API_KEY = "OEOufTrEaCOnCBi5AyNf ";

const MapPage: FunctionComponent<MapPageProps> = (props): JSX.Element => {
    const [markets, setMarkets] = useState<MarketProps[]>([]);
    const mapContainer = useRef(null);
    const map = useRef<maplibregl.Map | null>(null);
    const [long, setLong] = useState(currentLongitude);
    const [lat, setLat] = useState(currentLatitude);
    const [zoom, setZoom] = useState(7);

    function initializeMarkets() {
        if (map.current === null) return;

        getMarketList().then((res): void => {
            setMarkets(res);
            res.map((m: MarketProps, i: number) => {
                const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
                    `
                    <li class="MuiListItem-root MuiListItem-gutters MuiListItem-padding css-2frhs5-MuiListItem-root"><a class="MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineAlways css-161n3cf-MuiTypography-root-MuiLink-root" href="markets/6"><p class="MuiTypography-root MuiTypography-body1 css-1v6f1wq-MuiTypography-root">
                    ${m.name}
                    </p></a><div class="MuiBox-root css-u4p24i"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-196n7va-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LocationOnIcon"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg><p class="MuiTypography-root MuiTypography-body1 css-jf1c50-MuiTypography-root">
                    ${Math.round(haversineDistance(m.long, m.lat) * 100) / 100} miles
                    </p></div></li>
                    `
                )
                const marker = new maplibregl
                    .Marker()
                    .setLngLat([m.long, m.lat])
                    .setPopup(popup)
                    // @ts-ignore
                    .addTo(map.current);

                marker.addClassName("marker")
            })
        })
    }

    useEffect(() => {
        if (map.current || mapContainer.current === null) return;

        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
            center: [long, lat],
            zoom: zoom
        });

        initializeMarkets()

    }, [API_KEY, long, lat, zoom]);

    return <Box className="frsbc"
        sx={{
            width: "100%",
            height: "88.5vh",
            boxSizing: "border-box",
            gap: "1em",
            padding: "18px 36px 0px 36px"
        }}>
        <Paper elevation={12} sx={{ height: "100%" }}>
            <List sx={{
                height: "100%",
                width: "30em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                gap: "0.3em",
                padding: "0.3em",
                overflowX: "clip",
                overflowY: "scroll",
            }}>
                {markets.map((m: MarketProps, i: number) => {
                    return <ListItem className="hover-darken" sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignContent: "start",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "0.3em 0.65em",
                        transition: "background 0.176s linear",
                    }} onClick={() => {
                        if (map.current === null) return;
                        map.current.flyTo({
                            center: [m.long, m.lat],
                            zoom: 14.67,
                            essential: true
                        })
                    }}>
                        <Link href={`markets/${m.id}`} sx={{
                            textDecorationColor: "#00000000 !important"
                        }}>
                            <Typography fontSize="1em" sx={{
                                color: "#000",
                                "&:hover": {
                                    textDecoration: "underline",
                                    cursor: "pointer"
                                }
                            }}>
                                {m.name}
                            </Typography>
                        </Link>
                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <LocationOnIcon fontSize="small" />
                            <Typography color="text.secondary" fontSize="0.9em">
                                {Math.round(haversineDistance(m.long, m.lat) * 100) / 100} miles
                            </Typography>
                            &ensp;-&ensp;
                            <EventIcon fontSize="small" sx={{ mr: 0.3 }} />
                            <Typography color="text.secondary" fontSize="0.9em">
                                {timestampToDate(m.startTime)} - {timestampToDate(m.endTime)}
                            </Typography>
                        </Box>
                    </ListItem>


                    // return <CardActionArea onClick={() => {
                    //     if (map.current === null) return;
                    //     map.current.flyTo({
                    //         center: [m.long, m.lat],
                    //         zoom: 14.67,
                    //         essential: true
                    //     })
                    // }}>
                    //     <MarketplaceEntry
                    //         key={i}
                    //         market={m}
                    //         handleSaveAction={() => { }}
                    //         compactify={true}
                    //         geodesicDistance={haversineDistance(m.long, m.lat)}
                    //     />
                    // </CardActionArea>
                })}
            </List>
        </Paper>
        <Paper elevation={8}
            sx={{
                height: "100%",
                flexGrow: 1
            }}>
            <div className="map-wrap">
                <div ref={mapContainer} className="map" />
            </div>
        </Paper>;
    </Box>
}

export default MapPage;