
import WalletCard from "../components/Wallet/WalletCard"
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { getCryptos } from "../services/API";
import { ProgressSpinner } from "primereact/progressspinner";
import { useWallet } from "../hooks/useWallet";
import { WalletModal } from "../components/Wallet/WalletModal";
import { HeaderCard } from "../components/UI/HeaderCard";
import { EmptyWallets } from "../components/Wallet/EmpyWallets";

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

    (async()=>{
      try {
        const cryptos = sessionStorage.getItem('cryptos');
        if(cryptos){
          handleCryptos(JSON.parse(cryptos));
          return;
        }
        handleLoading(true);
        const response = await getCryptos();
        if (response.success) {
          handleCryptos(response.data);
          sessionStorage.setItem('cryptos', JSON.stringify(response.data));
        }
      } catch (error) {
        console.log('Error al obtener las criptomonedas en el inicio');
      } finally{
        handleLoading(false);
      }})();

  }, [])
  
  return (

    <>

      {loading && 
      <div className="flex justify-center items-center h-screen" >
        <ProgressSpinner  data-testid="spinner"/>
      </div>}

      {!loading  && 
      <div>
        <HeaderCard 
          title="Carteras"
          subtitle="Administra tus carteras y criptomonedas"
          buttonLabel="Crear Cartera"
          onButtonClick={() => handleWalletModal(true, { isEditing: false })}
          />
        </div>}

        {
         !loading && wallets.length > 0 && 

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 items-start mt-5 mx-3 sm:mx-5 place-items-center max-sm:max-h-[70vh] overflow-y-auto">
          {wallets.map((wallet) => (
            <WalletCard key={wallet.id} wallet={wallet} handleDeleteWallet={handleDeleteWallet}
             cryptos={cryptos} 
            handleWalletModal={handleWalletModal} data-testid="wallet-card"/>
          ))}
        </div>
        }
        
      {!loading && wallets.length === 0 && 
        <EmptyWallets />
      }

      <ConfirmDialog acceptLabel="Eliminar" rejectLabel="Cancelar" pt={{ rejectButton: { className: 'mr-2' } }} /> 
      <Toast ref={toast} className="text-xs sm:text-sm md:text-base max-sm:max-w-[90%]" />

      <WalletModal isEditing={isEditing} showWalletModal={showWalletModal} handleWalletModal={handleWalletModal} handleCancel={handleCancel} handleSaveWallet={handleSaveWallet} newWallet={newWallet} handleNewWallet={handleNewWallet} selectedWallet={selectedWallet} />

    </>
  )
}
