import { useReducer } from "react";
import { walletsReducer } from "../reducers/walletsReducer";
import { initialWallets } from "../reducers/walletsReducer";
import { Wallet } from "../types/wallets";

export function useWalletsReducer() { 

    //importo el estado global
    const [wallets, dispatch] = useReducer(walletsReducer, initialWallets);

    const addWallet = (wallet: Wallet) => dispatch({type: 'ADD_WALLET', payload: wallet});
    const deleteWallet = (id: number) => dispatch({type: 'DELETE_WALLET', payload: id});

    return { wallets, addWallet, deleteWallet }


}

