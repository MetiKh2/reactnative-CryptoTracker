export interface CoinDetails{
    id:string;  
    symbol: string;
    name: string;
    market_cap_rank: number;
    image:{
        small:string;
    };
    market_data:{
        current_price:{
            usd:number;
        }
        price_change_percentage_24h:number;
    };
}
export interface CoinMarketChart{
    prices:[]
}