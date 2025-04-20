import { useContext, useState } from "react";
import { WalletContext } from "../context/walletContext";
import { Wallet } from "../types/wallets";

export const useWallet = () => { 

    const { wallets, addWallet, deleteWallet } = useContext(WalletContext);
    const [visible, setVisible] = useState<boolean>(false);
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [newWallet, setNewWallet] = useState({
      name: '',
      id: `${crypto.randomUUID()}`
    });

const handleLoading = (loading: boolean) => setLoading(loading);

const handleVisible = (visible: boolean) => setVisible(visible);

const handleCryptos = (cryptos: Crypto[]) => setCryptos(cryptos);

const handleNewWallet = (newWallet: { name: string; id: string }) => setNewWallet(newWallet);


const createWallet = () => {

    if (newWallet.name === '') {
      return false;
    }
    addWallet({ ...newWallet, cryptocurrencies: [], transactions: [] });
    setVisible(false);
    setNewWallet({ name: '', id: crypto.randomUUID() });
    return true;
  };


return {

    wallets,
    visible,
    cryptos,
    loading,
    newWallet,
    addWallet,
    deleteWallet,   
    handleVisible,
    handleCryptos,
    handleLoading,
    handleNewWallet,
    createWallet
}
}
