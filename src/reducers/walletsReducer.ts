import { Cryptocurrency, Wallet } from "../types/wallets";

//Estado global
export const initialWallets = JSON.parse(
    localStorage.getItem('wallets') ?? '[]'
) as Wallet[];

// Función para calcular las criptomonedas de una wallet
const calculateWalletCryptocurrencies = (transactions: any[]) => {
    const cryptos: { [key: string]: { name: string; amount: number; image: string; current_price: number } } = {};
    
    transactions?.forEach((transaction) => {
        const crypto = transaction.crypto;
        if (!cryptos[crypto.name]) {
            cryptos[crypto.name] = {
                name: crypto.name,
                amount: 0,
                image: crypto.image || '',
                current_price: crypto.current_price
            };
        }
        
        cryptos[crypto.name].amount += transaction.type === 'compra' 
            ? transaction.amount 
            : -transaction.amount;
    });

    return Object.values(cryptos)
        .filter(crypto => crypto.amount > 0)
        .map(crypto => ({
            name: crypto.name,
            amount: crypto.amount,
            image: crypto.image,
            current_price: crypto.current_price
        }));
};

export const walletsReducer = (state: any, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_WALLET':
            return [...state, payload];
        case 'DELETE_WALLET':
            return state.filter((wallet: Wallet) => wallet.id !== payload);
        case 'ADD_TRANSACTION':
            const newState = [...state];
            const walletIndex = newState.findIndex((wallet: Wallet) => wallet.id === payload.walletId);
            
            if (walletIndex === -1) {
                return state;
            }

            const { id, symbol, name, image, current_price } = payload.transaction.crypto;
            
            newState[walletIndex].transactions.push({
                id: payload.transaction.id,
                type: payload.transaction.type,
                crypto: { id, symbol, name, image, current_price },
                amount: payload.transaction.amount,
                price: payload.transaction.price,
                date: payload.transaction.date,
            });

            // Actualizar las criptomonedas de la wallet
            newState[walletIndex].cryptocurrencies = calculateWalletCryptocurrencies(newState[walletIndex].transactions);
          
            return newState;
    }
}