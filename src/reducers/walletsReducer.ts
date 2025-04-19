import { Cryptocurrency, Wallet } from "../types/wallets";

//Estado global
export const initialWallets = JSON.parse(
    localStorage.getItem('wallets') ?? '[]'
) as Wallet[];



export const walletsReducer = (state: any, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_WALLET':
            return [...state, payload];
        case 'DELETE_WALLET':
            return state.filter((wallet: Wallet) => wallet.id !== payload);
        case 'ADD_TRANSACTION':


        //La transaccion tiene que guardar por un lado la transaccion y por otro lado la criptomoneda

            const newState = [...state];
            
            const walletIndex = newState.findIndex((wallet: Wallet) => wallet.id === payload.walletId);
            if (walletIndex === -1) {
                return state;
            }

            const cryptoIndex = newState[walletIndex].cryptocurrencies.findIndex(
                (crypto: Cryptocurrency) => crypto.name === payload.transaction.crypto.name
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
                    id_crypto_currency: crypto.randomUUID(),
                    name: payload.transaction.crypto.name,
                    amount: payload.transaction.amount,
                    image: payload.transaction.crypto.image,
                    symbol: payload.transaction.crypto.symbol,
                  
                });
            }

            newState[walletIndex].transactions.push(payload.transaction);


            return newState;


    }
}