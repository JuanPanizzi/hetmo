import { Cryptocurrency, Wallet } from "../types/wallets";

//Estado global
export const initialWallets = JSON.parse(
    localStorage.getItem('wallets') ?? '[]'
) as Wallet[];


//Habria que actualizar el localStorage
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

            const cryptoIndex = newState[walletIndex].cryptocurrencies.findIndex(
                (crypto: Cryptocurrency) => crypto.name === payload.transaction.crypto
            );
            
            if (cryptoIndex !== -1) {
                if (payload.transaction.type === 'compra') {
                    newState[walletIndex].cryptocurrencies[cryptoIndex].amount += payload.transaction.amount;
                } else if (payload.transaction.type === 'venta') {
                    if (newState[walletIndex].cryptocurrencies[cryptoIndex].amount >= payload.transaction.amount) {
                        newState[walletIndex].cryptocurrencies[cryptoIndex].amount -= payload.transaction.amount;
                    } else {
                        return state; // No se puede vender más de lo que se tiene
                    }
                }
            } else {
                newState[walletIndex].cryptocurrencies.push({
                    id: crypto.randomUUID(),
                    name: payload.transaction.crypto,
                    amount: payload.transaction.amount,
                    symbol: '',
                });
            }

            newState[walletIndex].transactions.push(payload.transaction);

            try {
                localStorage.setItem('wallets', JSON.stringify(newState));
            } catch (error) {
                console.error('Error al guardar en localStorage:', error);
                return state; 
            }

            return newState;


    }
}