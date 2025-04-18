import { Button } from "primereact/button"
import WalletCard from "../components/Wallet/WalletCard"
import { WalletContext } from "../context/walletContext"
import { useContext, useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";

export const Wallets = () => {
  const { wallets, addWallet, deleteWallet } = useContext(WalletContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [newWallet, setNewWallet] = useState({
    name: '',
    id: Date.now()
  });

  const handleCreateWallet = () => {
    
    if (newWallet.name === '') {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "El nombre de la cartera es obligatorio",
      });
    return;
    }
    addWallet({
      ...newWallet,
      cryptocurrencies: [],
      transactions: []
    });
    setVisible(false);
    setNewWallet({ name: '', id: Date.now() });
  };

  const handleCancel = () => {
    setVisible(false);
    setNewWallet({ name: '', id: Date.now() });
  };


  const toast = useRef<Toast>(null);


  const handleDeleteWallet = async (id: number) => {

    const success = await deleteWallet(id);

    if (success) {
      toast.current?.show({
        severity: "success",
        summary: "Operación exitosa",
        detail: "Cartera eliminada correctamente",
        life: 3000,
      });
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo eliminar la cartera",
        life: 3000,
      });
    }
  }
  return (

    <>
      <ConfirmDialog
        acceptLabel="Eliminar"    
        rejectLabel="Cancelar"
        pt={{ rejectButton: { className: 'mr-2' } }} />
      <Toast ref={toast} />
      <section>
        <div className="flex w-full items-center justify-between p-2">
          <h1 className="text-4xl ">Carteras</h1>
          <Button label="Crear Cartera" icon="pi pi-plus" onClick={() => setVisible(true)} />
        </div>

        <div className="grid grid-cols-4 gap-4 place-items-center ">
          {wallets.map((wallet) => (
            <WalletCard key={wallet.id} wallet={wallet} handleDeleteWallet={handleDeleteWallet} />
          ))}
        </div>

        <Dialog
          header="Crear Nueva Cartera"
          visible={visible}
          style={{ width: '50vw' }}
          onHide={() => setVisible(false)}
          footer={
            <div>
              <Button label="Cancelar" icon="pi pi-times" onClick={handleCancel} className="p-button-text" />
              <Button label="Crear" icon="pi pi-check" onClick={handleCreateWallet} autoFocus />
            </div>
          }
        >
          <div className="p-fluid">
            <div className="field">
              <label htmlFor="name">Nombre de la Cartera</label>
              <InputText
                id="name"
                value={newWallet.name}
                onChange={(e) => setNewWallet({ ...newWallet, name: e.target.value })}
                placeholder="Ingresa el nombre de la cartera"
              />
            </div>
          </div>
        </Dialog>
      </section>
    </>
  )
}
