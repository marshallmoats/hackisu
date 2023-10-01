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
    }
}
export async function createMarket(
    name: string,
    long: number,
    lat: number,
    description: string,
    startTime: number,
    endTime: number
) {
    try {
        const result: any = await fetch(`${ENDPOINT}/markets/create`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                long: long,
                lat: lat,
                desc: description,
                // start_time: startTime,
                // end_time: endTime,
            }),
        });

        await result.json();
    } catch (ex) {
        console.log(ex);
    }
}

export async function getCoordinates(address: string) {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/117.0',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Referer': 'https://www.latlong.net/convert-address-to-lat-long.html',
        'Content-type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'Origin': 'https://www.latlong.net',
        'Connection': 'keep-alive',
        'Cookie': 'PHPSESSID=vs13am7efjn9fh2u7l2mdccul1',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'TE': 'trailers'
    };

    const data = 'c1=606%20bissell%20road%20ames%20iowa&action=gpcm&cp=';
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

export async function getAddressCoordinates(address: string): Promise<{ latitude: number; longitude: number, formattedAddress: string } | undefined> {
    try {
        const apiKey = "AIzaSyC6jYez1NcN4BozawgiBnubXZ1V70Atq_M";
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "accept": "application/json",
            }
        });
        if (response.ok) {
            const data = await response.json();
            if (data.status === "OK") {
                const location = data.results[0].geometry.location;
                return { latitude: location.lat, longitude: location.lng, formattedAddress: data.results[0].formatted_address };
            }
        }
        return undefined;
    } catch (ex) {
        console.log(ex);
        return undefined;
    }
}
