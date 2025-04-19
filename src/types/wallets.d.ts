export interface Crypto {
    id:                               string;
    symbol:                           string;
    name:                             string;
    current_price:                    number;
    image?:                            string;
    market_cap?:                       number;
    market_cap_rank?:                  number;
    fully_diluted_valuation?:          number;
    total_volume?:                     number;
    high_24h?:                         number;
    low_24h?:                          number;
    price_change_24h?:                 number;
    price_change_percentage_24h?:      number;
    market_cap_change_24h?:            number;
    market_cap_change_percentage_24h?: number;
    circulating_supply?:               number;
    total_supply?:                     number;
    max_supply?:                       number;
    ath?:                              number;
    ath_change_percentage?:            number;
    ath_date?:                         Date;
    atl?:                              number;
    atl_change_percentage?:            number;
    atl_date?:                         Date;
    roi?:                              null;
    last_updated?:                     Date;
}


export interface Cryptocurrency extends Crypto {
    id_crypto_currency?: string | number;
    amount: number;
    value?: number;
  
}

export type Transaction = {
    type: string;
    crypto: string;
    amount: number;
    price: number;
    date: string;
    id: string;
}

export type Wallet = {
    id: string;
    name: string;
    cryptocurrencies: Cryptocurrency[];
    transactions: Transaction[];
}

