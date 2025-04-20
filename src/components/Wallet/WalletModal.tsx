import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext';
import { Wallet } from '../../types/wallets';

type Props = {
    // isEditing: boolean;
    isEditing?: any;
    showWalletModal: boolean;
    handleWalletModal: (showWalletModal: boolean, options?: { isEditing: any, selectedWallet?: any }) => void;
    handleCancel: () => void;
    handleCreateWallet: () => void;
    newWallet: { name: string; id: string };
    handleNewWallet: (newWallet: { name: string; id: string }) => void;
    selectedWallet?: Wallet | any;
}

export const WalletModal = ({ isEditing, showWalletModal, handleWalletModal, handleCancel, handleCreateWallet, newWallet, handleNewWallet, selectedWallet }: Props) => {
 
 console.log(selectedWallet)
    return (
    <>
    <Dialog
        header={isEditing ? "Editar Cartera" : "Crear Nueva Cartera"}
        visible={showWalletModal}
        className="w-[90vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw]"
        onHide={() => handleWalletModal(false)}
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
              value={isEditing ? selectedWallet?.name : newWallet.name}
              onChange={(e) => !isEditing ? handleNewWallet({ ...newWallet, name: e.target.value }) : handleNewWallet({ ...selectedWallet, name: e.target.value })}

            //   placeholder="Ingresa el nombre de la cartera"
              placeholder={isEditing ? selectedWallet?.name : "Ingresa el nombre de la cartera"}
            />
          </div>
        </div>
      </Dialog>
    </>
  )
}
