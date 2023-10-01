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
        return [];
    }
}
