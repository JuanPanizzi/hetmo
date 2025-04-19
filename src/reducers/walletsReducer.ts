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
            
            
            //1. Encontrar la wallet que coincide con el id
            const walletIndex = state.findIndex((wallet: Wallet) => wallet.id === payload.walletId);
            if (walletIndex === -1) {
                return state;
            }
            //2. Buscar si ya existe la criptomoneda en la wallet
            const cryptoIndex = state[walletIndex].cryptocurrencies.findIndex((crypto: Cryptocurrency) => crypto.name === payload.transaction.crypto);
            


            
            if (cryptoIndex !== -1) {
                if (payload.transaction.type === 'compra') {
                    state[walletIndex].cryptocurrencies[cryptoIndex].amount += payload.transaction.amount;
                } else if (payload.transaction.type === 'venta') {
                    state[walletIndex].cryptocurrencies[cryptoIndex].amount -= payload.transaction.amount;
                }
            }

            else {
                state[walletIndex].cryptocurrencies.push({
                    id: crypto.randomUUID(),
                    name: payload.transaction.crypto,
                    amount: payload.transaction.amount,
                    symbol: '',
                });
            }

            state[walletIndex].transactions.push(payload.transaction);

            //5. retornar el nuevo estado actualizado
            return state;


    }
}