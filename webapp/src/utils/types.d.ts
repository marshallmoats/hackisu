export interface MarketProps {
    id: number,
    lat: number,
    long: number,
    name: string,
    description: string,
    userIds: number[]
}

export interface ProductsProps {
    id: number,
    name: string,
    quantity: number,
    vendor: string,
    price: number,
    description: string,
    image: Blob,
}