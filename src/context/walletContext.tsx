import { createContext, FC, ReactNode } from "react";
import { useWalletsReducer } from "../hooks/useWalletsReducer";
import { Wallet } from "../types/wallets";

export const WalletContext = createContext<{wallets: Wallet[]}>({wallets: []});

export const WalletProvider: FC<{children: ReactNode}> = ({ children }) => { 
    const { wallets, dispatch } = useWalletsReducer();
    return (
        <WalletContext.Provider value={{wallets: wallets || []}}>
            {children}
        </WalletContext.Provider>
    );
}
