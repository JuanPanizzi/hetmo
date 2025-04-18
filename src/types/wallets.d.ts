export type Cryptocurrency = {
    symbol: string;
    name: string;
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
    id: string | number;
    name: string;
    cryptocurrencies: Cryptocurrency[];
    transactions: Transaction[];
}

