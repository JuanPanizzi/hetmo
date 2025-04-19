import { useReducer } from "react";
import { walletsReducer } from "../reducers/walletsReducer";
import { initialWallets } from "../reducers/walletsReducer";
import { Transaction, Wallet } from "../types/wallets";

function updateLocalStorage(wallets: Wallet[]): boolean {
    try {
      localStorage.setItem("wallets", JSON.stringify(wallets));
      return true;
    } catch (e) {
      console.error("Error guardando en localStorage", e);
      return false;
    }
}

export function useWalletsReducer() { 
    const [wallets, dispatch] = useReducer(walletsReducer, initialWallets);

    const addWallet = (wallet: Wallet): boolean => {
        const updatedWallets = [...wallets, wallet];
        if (!updateLocalStorage(updatedWallets)) return false;
        dispatch({ type: "ADD_WALLET", payload: wallet });
        return true;
    };
    
    const deleteWallet = (id: string): boolean => {
        const updatedWallets = wallets.filter((wallet: Wallet) => wallet.id !== id);
        if (!updateLocalStorage(updatedWallets)) return false;
        dispatch({ type: "DELETE_WALLET", payload: id });
        return true;
    };

    const addTransaction = (walletId: string, transaction: Transaction): boolean => {
        

        


        dispatch({ type: "ADD_TRANSACTION", payload: { walletId, transaction } });
        
        
        return true;
    }

    return { wallets, addWallet, deleteWallet, addTransaction }
}

