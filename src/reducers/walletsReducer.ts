import {  Transaction, Wallet } from "../types/wallets";
import { addNewTransaction, deleteExistingTransaction, editTransaction, updateStatus } from "./helpers";

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
            
            const newState = deleteExistingTransaction(state, payload);
            return newState;
        }

        default:
            return state;
    }
}