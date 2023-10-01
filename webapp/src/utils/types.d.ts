export interface MarketProps {
    id: number,
    lat: number,
    long: number,
    name: string,
    description: string,
    startTime: number,
    endTime: number,
    userIds: number[]
}

export interface ProductsProps {
    id: number,
    name: string,
    quantity: number,
    vendor: string,
    price: number,
    description: string,
}