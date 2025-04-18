import { createContext, FC, ReactNode } from "react";
import { useWalletsReducer } from "../hooks/useWalletsReducer";
import { Wallet } from "../types/wallets";



export const WalletContext = createContext<{
    wallets: Wallet[];
    addWallet: (wallet: Wallet) => void;
    deleteWallet: (id: number) => void;
}>({wallets: [], addWallet: () => {}, deleteWallet: () => {}});

export const WalletProvider: FC<{children: ReactNode}> = ({ children }) => { 

    const { wallets, addWallet, deleteWallet } = useWalletsReducer();

    return (
        <WalletContext.Provider value={ {wallets: wallets || [], addWallet, deleteWallet}}>
            {children}
        </WalletContext.Provider>
    );
}
