import { useEffect, useReducer } from "react";
import { walletsReducer } from "../reducers/walletsReducer";
import { initialWallets } from "../reducers/walletsReducer";
import { Transaction, Wallet } from "../types/wallets";


export function useWalletsReducer() { 


    const [wallets, dispatch] = useReducer(walletsReducer, initialWallets);


    useEffect(() => {
        try {
            localStorage.setItem("wallets", JSON.stringify(wallets));
          } catch (e) {
            console.error("Error al guardar en localStorage", e);
          }
    }, [wallets]);


    const addWallet = (wallet: Wallet) => dispatch({ type: "ADD_WALLET", payload: wallet })
        
    const deleteWallet = (id: string) => dispatch({ type: "DELETE_WALLET", payload: id }); 

    const addTransaction = (walletId: string, transaction: Transaction): void => {
        dispatch({ type: "ADD_TRANSACTION", payload: { walletId, transaction } });
    }

    return { wallets, addWallet, deleteWallet, addTransaction }
}

