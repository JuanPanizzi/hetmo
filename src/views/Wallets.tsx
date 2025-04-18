import { Button } from "primereact/button"
import WalletCard from "../components/Wallet/WalletCard"
import { WalletContext } from "../context/walletContext"
import { useContext, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export const Wallets = () => {
  const { wallets, addWallet } = useContext(WalletContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [newWallet, setNewWallet] = useState({
    name: '',
    id: Date.now()
  });

  const handleCreateWallet = () => {
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

  return (
    <section>
      <div className="flex w-full items-center justify-between p-2">
        <h1 className="text-4xl ">Carteras</h1>
        <Button label="Crear Cartera" icon="pi pi-plus" onClick={() => setVisible(true)} />
      </div>

      <div className="grid grid-cols-4 gap-4 place-items-center ">
        {wallets.map((wallet) => (
          <WalletCard key={wallet.id} wallet={wallet} />
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
              onChange={(e) => setNewWallet({...newWallet, name: e.target.value})} 
              placeholder="Ingresa el nombre de la cartera"
            />
          </div>
        </div>
      </Dialog>
    </section>
  )
}
