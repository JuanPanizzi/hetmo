import { useReducer } from "react";
import { walletsReducer } from "../reducers/walletsReducer";
import { initialWallets } from "../reducers/walletsReducer";

export function useWalletsReducer() { 

    //importo el estado global
    const [wallets, dispatch] = useReducer(walletsReducer, initialWallets);



    return { wallets, dispatch }


}

