import { ENDPOINT } from "./EndpointDefinition";
import { MarketProps, ProductsProps } from "./types";

function createMarketProps(res: any): MarketProps {
    return {
        id: res.id,
        lat: res.lat,
        long: res.long,
        name: res.name,
        description: res.desc,
        startTime: res.start_time,
        endTime: res.end_time,
        userIds: res.user_ids ?? [],

    }
}

function createProductsProps(res: any): ProductsProps {
    return {
        id: res.id,
        name: res.name,
        quantity: res.qty,
        vendor: res.vendor,
        price: res.price,
        description: res.desc,
        image: res.image,
    }
}

export async function getMarketList(): Promise<MarketProps[]> {
    try {
        const result: any = await fetch(`${ENDPOINT}/markets/all`, {
            method: "GET",
            mode: "cors",
            headers: {
                "accept": "application/json",
            }
        });

        return (await result.json()).map(createMarketProps);
    } catch (ex) {
        console.log(ex);
        return ([
            {
                "desc": "Ackley Farmers' Market",
                "end_time": 1696127986,
                "id": 3,
                "lat": 42.551,
                "long": -93.0517,
                "name": "Ackley Farmers Market",
                "start_time": 1696126986,
                "user_ids": null
            },
            {
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "end_time": 1696127986,
                "id": 5,
                "lat": 41.5868,
                "long": -93.625,
                "name": "Des Moines Farmers Market",
                "start_time": 1696126986,
                "user_ids": null
            },
            {
                "desc": "test sql push",
                "end_time": 1696127986,
                "id": 6,
                "lat": 42.0308,
                "long": -93.6319,
                "name": "Ames Farmers Market",
                "start_time": 1696126986,
                "user_ids": null
            },
            {
                "desc": "Dubuque farmers market",
                "end_time": 1696127986,
                "id": 7,
                "lat": 42.5009,
                "long": -90.6648,
                "name": "Dubuque Farmers Market",
                "start_time": 1696126986,
                "user_ids": null
            },
            {
                "desc": "Waterloo farmers market",
                "end_time": 1696127986,
                "id": 8,
                "lat": 42.4928,
                "long": -92.3426,
                "name": "Waterloo Farmers Market",
                "start_time": 1696126986,
                "user_ids": null
            },
            {
                "desc": "Mason City farmers market",
                "end_time": 1696127986,
                "id": 9,
                "lat": 43.1536,
                "long": -93.201,
                "name": "Mason City Farmers Market",
                "start_time": 1696126986,
                "user_ids": null
            },
            {
                "desc": "Geneva Farmers' Market",
                "end_time": 1696127986,
                "id": 11,
                "lat": 42.7271,
                "long": -93.3127,
                "name": "Geneva Farmers Market",
                "start_time": 1696126986,
                "user_ids": null
            }
        ]).map(createMarketProps);
    }
}

export async function getProductsList(): Promise<ProductsProps[] | undefined> {
    try {
        const result: any = await fetch(`${ENDPOINT}/markets/8/items`, {
            method: "GET",
            mode: "cors",
            headers: {
                "accept": "application/json",
            }
        });

        return (await result.json()).map(createProductsProps);
    } catch (ex) {
        console.log(ex);
        return undefined;
    }
}