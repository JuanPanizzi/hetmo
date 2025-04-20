import { createContext, FC, ReactNode } from "react";
import { useWalletsReducer } from "../hooks/useWalletsReducer";
import { Wallet, Transaction } from "../types/wallets";



export const WalletContext = createContext<{
    wallets: Wallet[];
    addWallet: (wallet: Wallet) => void;
    deleteWallet: (id: string) => void;
    addTransaction: (walletId: string, transaction: Transaction) => void;           
    deleteTransaction: (walletId: string, id: string) => void;
    updateWallet: (wallet: Wallet) => void;
}>({wallets: [], addWallet: () => {}, deleteWallet: () => {}, addTransaction: () => {}, deleteTransaction: () => {}, updateWallet: () => {}});

export const WalletProvider: FC<{children: ReactNode}> = ({ children }) => { 

    const { wallets, addWallet, deleteWallet, addTransaction, deleteTransaction, updateWallet  } = useWalletsReducer();

    return (
        <WalletContext.Provider value={ {wallets: wallets || [], addWallet, deleteWallet, addTransaction, deleteTransaction, updateWallet}}>
            {children}
        </WalletContext.Provider>
    );
}
