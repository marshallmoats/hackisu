import moment from 'moment';

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

const foodImages = [
    "https://images.pexels.com/photos/2899682/pexels-photo-2899682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://nypost.com/wp-content/uploads/sites/2/2022/09/pumpkins-1.jpg?quality=75&strip=all&w=1024",
    "https://images.pexels.com/photos/3650647/pexels-photo-3650647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/16732706/pexels-photo-16732706/free-photo-of-fresh-corns-at-the-market.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/7129145/pexels-photo-7129145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://media.istockphoto.com/id/1128276208/photo/fresh-rhubarb.jpg?b=1&s=612x612&w=0&k=20&c=aezgYAuztHh1WZIg-Iv-zbLudtR6IsLr2hKirPKJEps=",
]

export function randomMarketImage(hash: number) {
    return images[hash % images.length];
}

export function getFoodImage(name: string) {
    switch(name) {
        case "Tomato": 
            return foodImages[0];
        case "Pumpkin":
            return foodImages[1];
        case "Carrot":
            return foodImages[2];
        case "Sweet Corn":
            return foodImages[3];
        case "Potato":
            return foodImages[4];
        case "Rhubarb":
            return foodImages[5];
    }
}

export function timestampToDate(timestampSeconds: number) {
    return moment.unix(timestampSeconds).format('ddd, MMM DD');
}

// Coordinates of ISU
const currentLongitude = -93.6512984
const currentLatitute = 42.0257609

function toRad(x: number) {
    return x * Math.PI / 180;
}

export function haversineDistance(long: number, lat: number) {

    var lon1 = currentLongitude;
    var lat1 = currentLatitute;

    var lon2 = long;
    var lat2 = lat;

    var R = 6371; // km

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d / 1.60934;  // to miles
}
