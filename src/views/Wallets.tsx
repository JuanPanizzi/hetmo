import { Button } from "primereact/button"
import WalletCard from "../components/Wallet/WalletCard"
import { useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { getCryptos } from "../services/API";
import { ProgressSpinner } from "primereact/progressspinner";
import { useWallet } from "../hooks/useWallet";
import { WalletModal } from "../components/Wallet/walletModal";
export const Wallets = () => {


  const { wallets, deleteWallet, handleVisible, handleCryptos, handleNewWallet, handleLoading, createWallet, visible, newWallet, loading, cryptos } = useWallet();


  const toast = useRef<Toast>(null);

  const handleCreateWallet = () => {
    if (!createWallet()) {
      toast.current?.show({ severity: "error", summary: "Error", detail: "El nombre de la cartera es obligatorio" });
      return
    }
    toast.current?.show({ severity: "success", summary: "Operación exitosa", detail: "Cartera creada correctamente", life: 3000 });
  }

  const handleCancel = () => {
    handleVisible(false);
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
      
      <WalletModal visible={visible} handleVisible={handleVisible} handleCancel={handleCancel} handleCreateWallet={handleCreateWallet} newWallet={newWallet} handleNewWallet={handleNewWallet} />

      {loading && <div className="flex justify-center items-center h-screen">
        <ProgressSpinner />
      </div>}
      {!loading && cryptos.length > 0 && <section>
        <div className="flex w-full items-center justify-between p-2">
          <h1 className="text-4xl ">Carteras</h1>
          <Button label="Crear Cartera" icon="pi pi-plus" onClick={() => handleVisible(true)} />
        </div>

        <div className="flex flex-wrap gap-10 items-start xl:mt-10 mx-5 place-items-center ">
          {wallets.map((wallet) => (
            <WalletCard key={wallet.id} wallet={wallet} handleDeleteWallet={handleDeleteWallet} cryptos={cryptos} />
          ))}
        </div>

      </section>}
      {!loading && wallets.length === 0 && <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl ">No se registran carteras en este momento, crea una para empezar a operar</h1>
      </div>}

    </>
  )
}
