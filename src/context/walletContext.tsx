import { createContext, FC, ReactNode,  } from "react";
import { useState } from "react";


export const WalletContext = createContext<{wallets: string}>({wallets: ''});

export const WalletProvider: FC<{children: ReactNode}> = ({ children }) => { 

const [wallets, setWallets] = useState('holaa');

return (
    <WalletContext.Provider value={{wallets}}>
        {children}
    </WalletContext.Provider>
);

}
