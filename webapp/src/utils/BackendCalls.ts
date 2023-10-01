import { ENDPOINT } from "./EndpointDefinition";
import { MarketProps } from "./types";

function createMarketProps(res: any): MarketProps {
    return {
        id: res.id,
        lat: res.lat,
        long: res.long,
        name: res.name,
        description: res.desc,
        userIds: res.user_ids
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
        return ([{
            "desc": "Placeholder Market",
            "id": 3,
            "lat": 37.0,
            "long": 19.0,
            "name": "Ackley",
            "user_ids": [
                1
            ]
        },
        {
            "desc": "Des Moines Farmers' Market",
            "id": 5,
            "lat": 20.0,
            "long": 10.0,
            "name": "Des Moines",
            "user_ids": []
        },
        {
            "desc": "Ames farmers market",
            "id": 6,
            "lat": 20.0,
            "long": 10.0,
            "name": "Ames",
            "user_ids": []
        },
        {
            "desc": "Dubuque farmers market",
            "id": 7,
            "lat": 15.0,
            "long": 15.0,
            "name": "Dubuque",
            "user_ids": []
        },
        {
            "desc": "Waterloo farmers market",
            "id": 8,
            "lat": 23.0,
            "long": 4.0,
            "name": "Waterloo",
            "user_ids": [
                14
            ]
        },
        {
            "desc": "Mason City farmers market",
            "id": 9,
            "lat": 19.0,
            "long": 11.0,
            "name": "Mason City",
            "user_ids": []
        }]).map(createMarketProps);
    }
}
