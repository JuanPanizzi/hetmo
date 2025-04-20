import { Button } from "primereact/button"
import WalletCard from "../components/Wallet/WalletCard"
import { WalletContext } from "../context/walletContext"
import { useContext, useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { getCryptos } from "../services/API";
import { ProgressSpinner } from "primereact/progressspinner";
export const Wallets = () => {


  const { wallets, addWallet, deleteWallet } = useContext(WalletContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newWallet, setNewWallet] = useState({
    name: '',
    id: crypto.randomUUID()
  });
  const toast = useRef<Toast>(null);

  const handleCreateWallet = () => {

    if (newWallet.name === '') {
      toast.current?.show({ severity: "error", summary: "Error", detail: "El nombre de la cartera es obligatorio" });
      return;
    }
    addWallet({ ...newWallet, cryptocurrencies: [], transactions: [] });
    setVisible(false);
    setNewWallet({ name: '', id: crypto.randomUUID() });
  };

  const handleCancel = () => {
    setVisible(false);
    setNewWallet({ name: '', id: crypto.randomUUID() });
  };

  const handleDeleteWallet = (id: string) => {

    deleteWallet(id);
    toast.current?.show({ severity: "success", summary: "Operación exitosa", detail: "Cartera eliminada correctamente", life: 3000 });

  }

useEffect(() => {

  const cryptos = sessionStorage.getItem('cryptos');
  if (cryptos) {
    setCryptos(JSON.parse(cryptos));
  } else {
    const fetchCryptos = async () => {
      setLoading(true);
      const response = await getCryptos();
      if (response.success) {
      setCryptos(response.data);
      sessionStorage.setItem('cryptos', JSON.stringify(response.data));
      }
      setLoading(false);
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
        <Dialog
          header="Crear Nueva Cartera"
          visible={visible}
          className="w-[90vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw]"
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
      
      {loading && <div className="flex justify-center items-center h-screen">
          <ProgressSpinner />
      </div>}
      {!loading && cryptos.length > 0 && <section>
        <div className="flex w-full items-center justify-between p-2">
          <h1 className="text-4xl ">Carteras</h1>
          <Button label="Crear Cartera" icon="pi pi-plus" onClick={() => setVisible(true)} />
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
