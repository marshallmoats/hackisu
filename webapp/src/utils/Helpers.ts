export function hashString(s: string | undefined): number {
    if (s === undefined) return 0;
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
        hash += 31 * hash + s.charCodeAt(i);
    }
    return hash
}

export function cleanAndLowercase(inputString: string) {
    const cleanedString = inputString.replace(/[^a-zA-Z0-9]/g, '');
    const lowercaseString = cleanedString.toLowerCase();
    return lowercaseString;
}

const images = [
    "https://images.pexels.com/photos/95425/pexels-photo-95425.jpeg?cs=srgb&dl=pexels-erik-scheel-95425.jpg",
    "https://st2.depositphotos.com/1765488/9491/i/950/depositphotos_94912618-stock-photo-local-farmers-market.jpg",
    "https://c8.alamy.com/comp/TA2X0N/small-farmers-market-with-vendors-selling-fresh-fruits-and-vegetables-the-shoppes-at-eastchase-montgomery-alabama-usa-TA2X0N.jpg",
    "https://www.downtownfarmersmarket.com/wp-content/uploads/2022/12/downtown-farmers-market-des-moines.jpg",
    "https://photos.bringfido.com/attractions/1387/26494_1387.jpg?size=full&density=2x",
    "https://www.dsmpartnership.com/desmoinesfarmersmarket/filesimages/Events/Calendar%20Event%20Photos/Header/CalendarEvents10_Header.jpg",
    "https://i.ytimg.com/vi/r9c-ASlORRA/maxresdefault.jpg",
]
export function randomMarketImage(hash: number) {
    return images[hash % images.length];
}

