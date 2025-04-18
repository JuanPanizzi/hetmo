import { useReducer } from "react";
import { walletsReducer } from "../reducers/walletsReducer";
import { initialWallets } from "../reducers/walletsReducer";
import { Wallet } from "../types/wallets";

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

    //importo el estado global
    const [wallets, dispatch] = useReducer(walletsReducer, initialWallets);

    const addWallet = (wallet: Wallet): boolean => {

        const updatedWallets = [...wallets, wallet];
        
        if (!updateLocalStorage(updatedWallets)) return false;
        dispatch({ type: "ADD_WALLET", payload: wallet });
        return true;
      };
    
      const deleteWallet = (id: number): boolean => {
        const updatedWallets = wallets.filter((w: Wallet) => w.id !== id);
    
        if (!updateLocalStorage(updatedWallets)) return false;
        dispatch({ type: "DELETE_WALLET", payload: id });
        return true;
      
    };

    return { wallets, addWallet, deleteWallet }


}

