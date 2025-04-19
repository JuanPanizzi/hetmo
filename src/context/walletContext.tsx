import { createContext, FC, ReactNode } from "react";
import { useWalletsReducer } from "../hooks/useWalletsReducer";
import { Wallet, Transaction } from "../types/wallets";



export const WalletContext = createContext<{
    wallets: Wallet[];
    addWallet: (wallet: Wallet) => void;
    deleteWallet: (id: string) => void;
    addTransaction: (walletId: string, transaction: Transaction) => void;
}>({wallets: [], addWallet: () => {}, deleteWallet: () => {}, addTransaction: () => {}});

export const WalletProvider: FC<{children: ReactNode}> = ({ children }) => { 

    const { wallets, addWallet, deleteWallet, addTransaction } = useWalletsReducer();

    return (
        <WalletContext.Provider value={ {wallets: wallets || [], addWallet, deleteWallet, addTransaction}}>
            {children}
        </WalletContext.Provider>
    );
}
