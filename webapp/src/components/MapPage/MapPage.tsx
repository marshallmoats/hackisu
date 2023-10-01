import "./styles.css";
import { FunctionComponent } from "react";
import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { currentLongitude, currentLatitude, haversineDistance } from "../../utils/Helpers";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { MarketProps } from "../../utils/types";
import { getMarketList } from "../../utils/BackendCalls";
import MarketplaceEntry from "../MarketplacePage/MarketplaceEntry";

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
                // @ts-ignore
                new maplibregl.Marker().setLngLat([m.long, m.lat]).addTo(map.current);
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
        <Paper elevation={12} sx={{
            height: "100%",
            width: "30em",
            display: "flex",
            flexDirection: "column"
        }}>
            {markets.map((m: MarketProps, i: number) => <MarketplaceEntry
                key={i}
                market={m}
                handleSaveAction={() => { }}
                compactify={true}
                geodesicDistance={haversineDistance(m.long, m.lat)}
            />
            )}
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