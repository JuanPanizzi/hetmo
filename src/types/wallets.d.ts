export interface Crypto {
    id: string | number;
    symbol: string;
    name: string;
}

export interface Cryptocurrency extends Crypto {
    id_crypto_currency?: string | number;
    amount: number;
    value: number;
}

export type Transaction = {
    type: 'buy' | 'sell';
    cryptocurrency: string;
    amount: number;
    value: number;
    date: string;
}

export type Wallet = {
    id: string;
    name: string;
    cryptocurrencies: Cryptocurrency[];
    transactions: Transaction[];
}

