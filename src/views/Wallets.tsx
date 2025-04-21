import { Button } from "primereact/button"
import WalletCard from "../components/Wallet/WalletCard"
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { getCryptos } from "../services/API";
import { ProgressSpinner } from "primereact/progressspinner";
import { useWallet } from "../hooks/useWallet";
import { WalletModal } from "../components/Wallet/WalletModal";
import { HeaderCard } from "../components/UI/HeaderCard";

export const Wallets = () => {


  const { wallets, deleteWallet, handleWalletModal, handleCryptos, handleNewWallet, handleLoading,  saveWallet, isEditing, showWalletModal, newWallet, loading, cryptos, selectedWallet } = useWallet();


  const toast = useRef<Toast>(null);

  const handleSaveWallet = () => {
    if (!saveWallet()) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "El nombre de la cartera es obligatorio" });
      return
    }
    toast.current?.show({ severity: "success", summary: "Operación exitosa", detail: isEditing ? "Cartera editada correctamente" : "Cartera creada correctamente", life: 3000 });
  }

  const handleCancel = () => {
    handleWalletModal(false);
    handleNewWallet({ name: '', id: crypto.randomUUID() });
  };

  const handleDeleteWallet = (id: string) => {

    deleteWallet(id);
    toast.current?.show({ severity: "success", summary: "Operación exitosa", detail: "Cartera eliminada correctamente", life: 3000 });

  }

  useEffect(() => {
    const cryptos = sessionStorage.getItem('cryptos');
    if (cryptos) {
      handleCryptos(JSON.parse(cryptos));
    } else {
      const fetchCryptos = async () => {
        handleLoading(true);
        const response = await getCryptos();
        if (response.success) {
          handleCryptos(response.data);
          sessionStorage.setItem('cryptos', JSON.stringify(response.data));
        }
        handleLoading(false);
      }
      fetchCryptos();
    }
  }, [])


  return (

    <>
 
      <ConfirmDialog
        acceptLabel="Eliminar"
        rejectLabel="Cancelar"
        pt={{ rejectButton: { className: 'mr-2' } }} />
      <Toast ref={toast} />

      <WalletModal isEditing={isEditing} showWalletModal={showWalletModal} handleWalletModal={handleWalletModal} handleCancel={handleCancel} handleSaveWallet={handleSaveWallet} newWallet={newWallet} handleNewWallet={handleNewWallet} selectedWallet={selectedWallet} />

      {loading && <div className="flex justify-center items-center h-screen">
        <ProgressSpinner />
      </div>}
      {!loading && cryptos.length > 0 && 
      <section>
        <HeaderCard 
          title="Carteras"
          subtitle="Administra tus carteras y criptomonedas"
          buttonLabel="Crear Cartera"
          onButtonClick={() => handleWalletModal(true, { isEditing: false })}
        />

        <div className="flex flex-wrap gap-10 items-start xl:mt-10 mx-5 place-items-center">
          {wallets.map((wallet) => (
            <WalletCard key={wallet.id} wallet={wallet} handleDeleteWallet={handleDeleteWallet} cryptos={cryptos} handleWalletModal={handleWalletModal} />
          ))}
        </div>
      </section>}
      {!loading && wallets.length === 0 && 
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <i className="pi pi-wallet text-6xl mb-4 text-gray-500"></i>
          <h1 className="text-2xl text-gray-300 mb-4">No se registran carteras en este momento</h1>
          <Button 
            label="Crear mi primera cartera" 
            icon="pi pi-plus"
            onClick={() => handleWalletModal(true, { isEditing: false })} 
          />
        </div>
      }

    </>
  )
}
