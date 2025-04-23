import { useEffect, useReducer } from "react";
import { walletsReducer } from "../reducers/walletsReducer";
import { initialWallets } from "../reducers/walletsReducer";
import { Transaction, Wallet, Crypto as CryptoType } from "../types/wallets";


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

    const updateWallet = (wallet: Wallet) => dispatch({ type: "UPDATE_WALLET", payload: wallet });

    const addTransaction = (walletId: string, transaction: Transaction): void => {
        dispatch({ type: "ADD_TRANSACTION", payload: { walletId, transaction } });
    }

    const editTransaction = (walletId: string, transaction: Transaction): void => {
        dispatch({ type: "EDIT_TRANSACTION", payload: { walletId, transaction } });
    }

    const deleteTransaction = (walletId: string, transaction: Transaction): void => {
        dispatch({ type: "DELETE_TRANSACTION", payload: { walletId, transaction } });
    }

    const updateTransactionStatus = (walletId: string, transaction: Transaction): { success: boolean; error?: string } => {
        
        const wallet = wallets.find((w: Wallet) => w.id === walletId);
        if (!wallet) {
            return { success: false, error: "Cartera no encontrada" };
        }
        if (transaction.type === 'Venta' && transaction.status === 'confirmada') {
            const cryptoName = (transaction.crypto as CryptoType).name;
            const existingCrypto = wallet.cryptocurrencies.find((c: CryptoType) => c.name === cryptoName);
            
            if (!existingCrypto) {
                return { success: false, error: "Criptomoneda no encontrada en la cartera" };
            }

            
            if (existingCrypto.amount < transaction.amount) {
                return { success: false, error: "No hay suficientes criptomonedas para realizar la venta por la cantidad especificada" };
            }
        }

        
        dispatch({ type: "UPDATE_TRANSACTION_STATUS", payload: { walletId, transaction } });
        return { success: true };
    }

    return { wallets, addWallet, deleteWallet, addTransaction, deleteTransaction, updateWallet, editTransaction, updateTransactionStatus }
}

