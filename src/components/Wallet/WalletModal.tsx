import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext';
import { Wallet } from '../../types/wallets';

type Props = {
    isEditing?: boolean;
    showWalletModal: boolean;
    handleWalletModal: (showWalletModal: boolean, options?: { isEditing: boolean, selectedWallet?: Wallet }) => void;
    handleCancel: () => void;
    handleSaveWallet: () => void;
    newWallet: { name: string; id: string };
    handleNewWallet: (wallet: { name: string; id: string } | Wallet) => void;
    selectedWallet?: Wallet;
}

export const WalletModal = ({ isEditing, showWalletModal, handleWalletModal, handleCancel, handleSaveWallet, newWallet, handleNewWallet, selectedWallet }: Props) => {
 
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isEditing && selectedWallet) {
            handleNewWallet({
                ...selectedWallet,
                name: value
            });
        } else {
            handleNewWallet({
                ...newWallet,
                name: value
            });
        }
    };

    return (
    <>
    <Dialog
        header={isEditing ? "Editar Cartera" : "Crear Nueva Cartera"}
        visible={showWalletModal}
        className="w-[90vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw]"
        onHide={() => handleWalletModal(false)}
        footer={
          <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={handleCancel} className="p-button-text text-xs sm:text-sm md:text-base" />
            <Button label={isEditing ? "Guardar" : "Crear"} icon="pi pi-check" onClick={handleSaveWallet} autoFocus className="text-xs sm:text-sm md:text-base" />
          </div>
        }
      >
          <div className="flex flex-col">
            <label htmlFor="name" className='mb-2 text-xs sm:text-sm md:text-base'>Nombre de la Cartera</label>
            <InputText
              id="name"
              value={isEditing ? selectedWallet?.name : newWallet.name}
              onChange={handleInputChange}
              placeholder="Ingresa el nombre de la cartera"
              className="text-xs sm:text-sm md:text-base"
            />
          </div>
      </Dialog>
    </>
  )
}
