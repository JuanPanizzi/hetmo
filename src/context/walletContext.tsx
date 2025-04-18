import { createContext, FC, ReactNode } from "react";
import { useWalletsReducer } from "../hooks/useWalletsReducer";
import { Wallet, Transaction } from "../types/wallets";



export const WalletContext = createContext<{
    wallets: Wallet[];
    addWallet: (wallet: Wallet) => boolean;
    deleteWallet: (id: string) => boolean;
    addTransaction: (walletId: string, transaction: Transaction) => boolean;
}>({wallets: [], addWallet: () => false, deleteWallet: () => false, addTransaction: () => false});

export const WalletProvider: FC<{children: ReactNode}> = ({ children }) => { 

    const { wallets, addWallet, deleteWallet, addTransaction } = useWalletsReducer();

    return (
        <WalletContext.Provider value={ {wallets: wallets || [], addWallet, deleteWallet, addTransaction}}>
            {children}
        </WalletContext.Provider>
    );
}
