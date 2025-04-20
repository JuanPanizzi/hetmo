import {  Transaction, Wallet } from "../types/wallets";

//Estado global
export const initialWallets = JSON.parse(
    localStorage.getItem('wallets') ?? '[]'
) as Wallet[];


const calculateWalletCryptocurrencies = (transactions: any[]) => {
    const cryptos: { [key: string]: { name: string; amount: number; image: string; current_price: number; symbol: string } } = {};
    
    transactions?.forEach((transaction) => {
        const crypto = transaction.crypto;
        if (!cryptos[crypto.name]) {
            cryptos[crypto.name] = {
                name: crypto.name,
                amount: 0,
                image: crypto.image || '',
                current_price: crypto.current_price,
                symbol: crypto.symbol
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
            current_price: crypto.current_price,
            symbol: crypto.symbol
        }));
};

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
                symbol: payload.transaction.crypto.symbol
            });

            
            newState[walletIndex].cryptocurrencies = calculateWalletCryptocurrencies(newState[walletIndex].transactions);
          
            return newState;

        case 'EDIT_TRANSACTION':
            const editState = [...state];
            const editWalletIndex = editState.findIndex((wallet: Wallet) => wallet.id === payload.walletId);
            
            if (editWalletIndex === -1) {
                return state;
            }

            const { id: editId, symbol: editSymbol, name: editName, image: editImage, current_price: editCurrentPrice } = payload.transaction.crypto;

     
            const transactionIndex = editState[editWalletIndex].transactions.findIndex(
                (transaction: Transaction) => transaction.id === payload.transaction.id
            );

            if (transactionIndex === -1) {
                return state;
            }

            editState[editWalletIndex].transactions[transactionIndex] = {
                id: payload.transaction.id,
                type: payload.transaction.type,
                crypto: { id: editId, symbol: editSymbol, name: editName, image: editImage, current_price: editCurrentPrice },
                amount: payload.transaction.amount,
                price: payload.transaction.price,
                date: payload.transaction.date,
                symbol: payload.transaction.crypto.symbol
            };

            
            editState[editWalletIndex].cryptocurrencies = calculateWalletCryptocurrencies(editState[editWalletIndex].transactions);

            return editState;

        case 'DELETE_TRANSACTION':
            const deleteState = [...state];
            const deleteWalletIndex = deleteState.findIndex((wallet: Wallet) => wallet.id === payload.walletId);
            
            if (deleteWalletIndex === -1) {
                return state;
            }

            
            deleteState[deleteWalletIndex].transactions = deleteState[deleteWalletIndex].transactions.filter(
                (transaction: Transaction) => transaction.id !== payload.id
            );

            
            deleteState[deleteWalletIndex].cryptocurrencies = calculateWalletCryptocurrencies(deleteState[deleteWalletIndex].transactions);

            return deleteState;
    }
}