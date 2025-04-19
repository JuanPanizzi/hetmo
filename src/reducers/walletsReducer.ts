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
            return state.map((wallet: Wallet) => {
                if (wallet.id === payload.walletId) {
                    // Buscar si ya existe la criptomoneda en la wallet
                    const existingCrypto = wallet.cryptocurrencies.find(
                        crypto => crypto.name === payload.transaction.crypto
                    );

                    if (existingCrypto) {
                        // Si existe, actualizar la cantidad según el tipo de transacción
                        if (payload.transaction.type === 'compra') {
                            existingCrypto.amount += payload.transaction.amount;
                        } else if (payload.transaction.type === 'venta') {
                            if (existingCrypto.amount >= payload.transaction.amount) {
                                existingCrypto.amount -= payload.transaction.amount;
                            } else {
                                return wallet; // No se puede vender más de lo que se tiene
                            }
                        }
                    } else {
                        // Si no existe, agregar la nueva criptomoneda
                        wallet.cryptocurrencies.push({
                            id: '',
                            name: payload.transaction.crypto,
                            amount: payload.transaction.amount,
                            symbol: '',
                            current_price: 0,
                        });
                    }

                    // Agregar la transacción al historial
                    wallet.transactions.push(payload.transaction);
                }
                return wallet;
            });
    }
}