import {  Transaction, Wallet } from "../types/wallets";
import { addNewTransaction, editTransaction, updateStatus } from "./helpers";

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
        case 'UPDATE_WALLET':
            return state.map((wallet: Wallet) => 
                wallet.id === payload.id ? payload : wallet
            );
        case 'ADD_TRANSACTION': {

            const newState = addNewTransaction(state, payload);
            return newState;
        }

        case 'UPDATE_TRANSACTION_STATUS': {
            
           const newState = updateStatus(state, payload);
           return newState;
        }

        case 'EDIT_TRANSACTION': {
            
            const newState = editTransaction(state, payload);
            return newState;
        }
            
        case 'DELETE_TRANSACTION': {
            
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

        default:
            return state;
    }
}