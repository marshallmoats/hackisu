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