import { Wallet } from "../types/wallets";

//Estado global
export const initialWallets = JSON.parse(
    localStorage.getItem('wallets') ?? '[]'
  ) as Wallet[];

  
//Habria que actualizar el localStorage
export const walletsReducer = (state: any, action: any) => {
    const {type, payload} = action;
    switch (type) {
        case 'ADD_WALLET':
            return [...state, payload];
        case 'DELETE_WALLET': 

            return state.filter((wallet: Wallet) => wallet.id !== payload);
    }
}