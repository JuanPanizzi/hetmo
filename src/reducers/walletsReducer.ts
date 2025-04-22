import {  Transaction, Wallet } from "../types/wallets";

//Estado global
export const initialWallets = JSON.parse(
    localStorage.getItem('wallets') ?? '[]'
) as Wallet[];


// const calculateWalletCryptocurrencies = (transactions: any[]) => {
//     const cryptos: { [key: string]: { name: string; amount: number; image: string; current_price: number; symbol: string } } = {};
    
//     transactions?.forEach((transaction) => {
//         const crypto = transaction.crypto;
//         if (!cryptos[crypto.name]) {
//             cryptos[crypto.name] = {
//                 name: crypto.name,
//                 amount: 0,
//                 image: crypto.image || '',
//                 current_price: crypto.current_price,
//                 symbol: crypto.symbol
//             };
//         }
        
//         cryptos[crypto.name].amount += transaction.type === 'Compra' 
//             ? transaction.amount 
//             : -transaction.amount;
//     });

//     return Object.values(cryptos)
//         .filter(crypto => crypto.amount > 0)
//         .map(crypto => ({
//             name: crypto.name,
//             amount: crypto.amount,
//             image: crypto.image,
//             current_price: crypto.current_price,
//             symbol: crypto.symbol
//         }));
// };

export const walletsReducer = (state: any, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_WALLET':
            return [...state, payload];
        case 'DELETE_WALLET':
            return state.filter((wallet: Wallet) => wallet.id !== payload);
        case 'UPDATE_WALLET':
            return state.map((wallet: Wallet) => 
                wallet.id === payload.id ? payload : wallet
            );
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
                symbol: payload.transaction.crypto.symbol,
                status: payload.transaction.status
            });

            // if(payload.transaction.status === 'confirmada'){

            //     newState[walletIndex].cryptocurrencies = calculateWalletCryptocurrencies(newState[walletIndex].transactions);
            
            // }
          
            return newState;

        case 'UPDATE_TRANSACTION_STATUS': {
            
            const updateState = [...state];
            const updateWalletIndex = updateState.findIndex((wallet: Wallet) => wallet.id === payload.walletId);
            
            if (updateWalletIndex === -1) {
                return state;
            }

            const transactionIndex = updateState[updateWalletIndex].transactions.findIndex(
                (transaction: Transaction) => transaction.id === payload.transaction.id
            );

            if (transactionIndex === -1) {
                return state;
            }

            
            updateState[updateWalletIndex].transactions[transactionIndex] = {
                ...payload.transaction,
                status: payload.transaction.status
            };

           
            if (payload.transaction.status === 'confirmada') {
                const transaction = updateState[updateWalletIndex].transactions[transactionIndex];
                const cryptoName = transaction.crypto.name;
                
                
                const cryptoIndex = updateState[updateWalletIndex].cryptocurrencies.findIndex(
                    (crypto: any) => crypto.name === cryptoName
                );

                if (cryptoIndex !== -1) {
                   
                    if (transaction.type === 'Compra') {
                        updateState[updateWalletIndex].cryptocurrencies[cryptoIndex].amount += transaction.amount;
                    } else if (transaction.type === 'Venta') {
                        
                        if(updateState[updateWalletIndex].cryptocurrencies[cryptoIndex].amount > transaction.amount){
                            updateState[updateWalletIndex].cryptocurrencies[cryptoIndex].amount -= transaction.amount;
                        }else{
                            updateState[updateWalletIndex].cryptocurrencies[cryptoIndex].amount = 0;
                        }

                    }
                } else if (transaction.type === 'Compra') {
                    
                    updateState[updateWalletIndex].cryptocurrencies.push({
                        name: cryptoName,
                        amount: transaction.amount,
                        image: transaction.crypto.image,
                        current_price: transaction.crypto.current_price,
                        symbol: transaction.crypto.symbol
                    });
                }
                
                
                updateState[updateWalletIndex].cryptocurrencies = updateState[updateWalletIndex].cryptocurrencies.filter(
                    (crypto: any) => crypto.amount > 0
                );
            }

            if(payload.transaction.status === 'cancelada'){
                const transaction = updateState[updateWalletIndex].transactions[transactionIndex];
                transaction.status = 'cancelada';
                updateState[updateWalletIndex].transactions[transactionIndex] = transaction;
            }

            return updateState;
        }

        case 'EDIT_TRANSACTION': {

            const newState = [...state];
            const walletIndex = newState.findIndex((wallet: Wallet) => wallet.id === payload.walletId);
            
            if (walletIndex === -1) {
                return state;
            }
            const transactionIndex = newState[walletIndex].transactions.findIndex(
                (transaction: Transaction) => transaction.id === payload.transaction.id
            );

            newState[walletIndex].transactions.splice(newState[walletIndex].transactions[transactionIndex], 1, payload.transaction);

            return newState;
           
        }
            
        case 'DELETE_TRANSACTION': {

            const newState = [...state];

            const walletIndex = newState.findIndex((wallet: Wallet) => wallet.id === payload.walletId);
            
            if (walletIndex === -1) {
                return state;
            }

            newState[walletIndex].transactions = newState[walletIndex].transactions.filter(
                (transaction: Transaction) => transaction.id !== payload.id
            );

            return newState;
        }

        default:
            return state;
    }
}