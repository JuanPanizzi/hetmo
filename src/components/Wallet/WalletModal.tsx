import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext';

type Props = {
    visible: boolean;
    handleVisible: (visible: boolean) => void;
    handleCancel: () => void;
    handleCreateWallet: () => void;
    newWallet: { name: string; id: string };
    handleNewWallet: (newWallet: { name: string; id: string }) => void;
}

export const WalletModal = ({ visible, handleVisible, handleCancel, handleCreateWallet, newWallet, handleNewWallet }: Props) => {
  return (
    <>
    <Dialog
        header="Crear Nueva Cartera"
        visible={visible}
        className="w-[90vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw]"
        onHide={() => handleVisible(false)}
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
              onChange={(e) => handleNewWallet({ ...newWallet, name: e.target.value })}
              placeholder="Ingresa el nombre de la cartera"
            />
          </div>
        </div>
      </Dialog>
    </>
  )
}
