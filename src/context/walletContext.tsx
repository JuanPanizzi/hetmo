import { createContext, FC, ReactNode } from "react";
import { useWalletsReducer } from "../hooks/useWalletsReducer";
import { Wallet, Transaction } from "../types/wallets";



export const WalletContext = createContext<{
    wallets: Wallet[];
    addWallet: (wallet: Wallet) => void;
    deleteWallet: (id: string) => void;
    addTransaction: (walletId: string, transaction: Transaction) => void;           
    deleteTransaction: (walletId: string, transaction: Transaction) => void;
    updateWallet: (wallet: Wallet) => void;
    editTransaction: (walletId: string, transaction: Transaction) => void;
    updateTransactionStatus: (walletId: string, transaction: Transaction) => { success: boolean; error?: string };
}>({
    wallets: [], 
    addWallet: () => {}, 
    deleteWallet: () => {}, 
    addTransaction: () => {}, 
    deleteTransaction: () => {}, 
    updateWallet: () => {},
    editTransaction: () => {},
    updateTransactionStatus: () => ({ success: false, error: "" })
});

export const WalletProvider: FC<{children: ReactNode}> = ({ children }) => { 

    const { wallets, addWallet, deleteWallet, addTransaction, deleteTransaction, updateWallet, editTransaction, updateTransactionStatus } = useWalletsReducer();

    return (
        <WalletContext.Provider value={ {wallets: wallets || [], addWallet, deleteWallet, addTransaction, deleteTransaction, updateWallet, editTransaction, updateTransactionStatus}}>
            {children}
        </WalletContext.Provider>
    );
}
