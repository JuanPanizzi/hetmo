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
    type: 'compra' | 'venta';
    cryptocurrency: string;
    amount: number;
    value: number;
    date: string;
    id: string;
}

export type Wallet = {
    id: string;
    name: string;
    cryptocurrencies: Cryptocurrency[];
    transactions: Transaction[];
}

