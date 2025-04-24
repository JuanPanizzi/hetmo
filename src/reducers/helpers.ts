import { Wallet, Transaction } from "../types/wallets";

export const updateStatus = (state: any, payload: any) => { 

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


export const editTransaction = (state: any, payload: any) => {
    
    const newState = [...state];
    const walletIndex = newState.findIndex((wallet: Wallet) => wallet.id === payload.walletId);
    
    if (walletIndex === -1) {
        return state;
    }
    
    const transactionIndex = newState[walletIndex].transactions.findIndex(
        (transaction: Transaction) => transaction.id === payload.transaction.id
    );

    if (transactionIndex === -1) {
        return state;
    }

    
    newState[walletIndex].transactions[transactionIndex] = {
        ...payload.transaction,
        status: newState[walletIndex].transactions[transactionIndex].status 
    };

    return newState;
}


export const addNewTransaction = (state: any, payload: any) => {

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

    return newState;

}


export const deleteExistingTransaction = (state: any, payload: any) => {

    const {walletId, transaction: transactionToDelete} = payload;

    const newState = [...state];

    const walletIndex = newState.findIndex((wallet: Wallet) => wallet.id === walletId);
    
    if (walletIndex === -1) {
        return state;
    }

    newState[walletIndex].transactions = newState[walletIndex].transactions.filter(
        (transaction: Transaction) => transaction.id !== transactionToDelete.id
    );

    return newState;

}
    
    