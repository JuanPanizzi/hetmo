import { useContext, useState } from "react";
import { WalletContext } from "../context/walletContext";
import { Wallet } from "../types/wallets";

export const useWallet = () => { 

    const { wallets, addWallet, deleteWallet, updateWallet } = useContext(WalletContext);
    const [showWalletModal, setShowWalletModal] = useState<boolean>(false);
    const [cryptos, setCryptos] = useState<Crypto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedWallet, setSelectedWallet] = useState<Wallet | undefined>(undefined);
    const [newWallet, setNewWallet] = useState({
      name: '',
      id: `${crypto.randomUUID()}`
    });

const handleLoading = (loading: boolean) => setLoading(loading);

const handleWalletModal = (showWalletModal: boolean, options?: { isEditing: boolean, selectedWallet?: Wallet }) => {
    setShowWalletModal(showWalletModal);
    setIsEditing(options?.isEditing || false);
    if (options?.selectedWallet) {
        setSelectedWallet(options.selectedWallet);
    } else {
        setSelectedWallet(undefined);
    }
}

const handleCryptos = (cryptos: Crypto[]) => setCryptos(cryptos);

const handleNewWallet = (wallet: { name: string; id: string } | Wallet) => {
    if (isEditing && selectedWallet) {
        setSelectedWallet(wallet as Wallet);
    } else {
        setNewWallet(wallet as { name: string; id: string });
    }
}

const handleIsEditing = (isEditing: boolean) => setIsEditing(isEditing);

const createWallet = () => {
    if (isEditing && selectedWallet) {
        if (selectedWallet.name === '') {
            return false;
        }
        updateWallet(selectedWallet);
        setShowWalletModal(false);
        setSelectedWallet(undefined);
        setIsEditing(false);
        return true;
    } else {
        if (newWallet.name === '') {
            return false;
        }
        addWallet({ ...newWallet, cryptocurrencies: [], transactions: [] });
        setShowWalletModal(false);
        setNewWallet({ name: '', id: crypto.randomUUID() });
        return true;
    }
};

return {
    wallets,
    showWalletModal,
    cryptos,
    loading,
    newWallet,
    addWallet,
    deleteWallet,   
    handleWalletModal,
    handleCryptos,
    handleLoading,
    handleNewWallet,
    createWallet,
    isEditing,
    handleIsEditing,
    selectedWallet
}
}
