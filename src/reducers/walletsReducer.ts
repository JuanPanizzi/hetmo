import { Wallet } from "../types/wallets";

//Estado global
export const initialWallets = JSON.parse(
    localStorage.getItem('wallets') ?? '[]'
  ) as Wallet[];

  console.log('initialWallets', initialWallets)
  

export const walletsReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'ADD_WALLET':
            return [...state, action.payload];
    }
}