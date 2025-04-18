import { Wallet } from "../types/wallets";

//Estado global
export const initialWallets = JSON.parse(
    localStorage.getItem('wallets') ?? '[]'
  ) as Wallet[];

  

export const walletsReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ADD_WALLET':
            console.log('action.payload', action.payload)

            return [...state, action.payload];
    }
}