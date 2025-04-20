import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Wallet } from '../../types/wallets';
import { confirmDialog } from 'primereact/confirmdialog';
import { useNavigate } from 'react-router-dom';

interface WalletModalOptions {
    isEditing: boolean;
    selectedWallet?: Wallet;
  }

type Props = {
    wallet: Wallet;
    handleDeleteWallet: (id: string) => void;
    cryptos: Crypto[];
    handleWalletModal: (showWalletModal: boolean, options?: WalletModalOptions) => void;
}

export default function WalletCard({ wallet, handleDeleteWallet, handleWalletModal }: Props) {

  const navigate = useNavigate();

    const accept = () => {
        handleDeleteWallet(wallet.id)
    }
   
    const confirmDelete = () => {
        confirmDialog({
            message: '¿Está seguro que desea eliminar esta cartera?',
            header: 'Eliminar Cartera',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept
          
        });
    };


    const header = (
        <div className='p-4'>

            <h1 className='text-2xl font-bold'>{wallet.name}</h1>
        </div>
    );
    const footer = (
        <>
            <Button icon="pi pi-sign-in" label='Ingresar' onClick={() => navigate(`/wallet/${wallet.id}`)} />
            <Button icon="pi pi-pencil" className='mx-2 h-full' onClick={() => handleWalletModal(true, { isEditing: true, selectedWallet: {...wallet} })} />
            <Button severity="danger"  icon="pi pi-trash" className='!h-full' style={{height: '100%'}}  onClick={confirmDelete} />

        </>
    );

    return (
        <>
        
     
                <Card title="" subTitle="" footer={footer} header={header} className="p-4 w-full xl:max-w-xl">
                    {
                        !wallet.cryptocurrencies?.length ? (
                            <p>No hay criptomonedas en esta cartera</p>
                        ) : (
                            <div className="space-y-4 ">
                                {
                                    wallet.cryptocurrencies.map((crypto, index) => (
                                        <div key={`${crypto.id}-${crypto.symbol}-${index}`} className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <img src={crypto.image} alt={crypto.name} className="w-6 h-6 rounded-full" />
                                                <span className="text-gray-200">{crypto.symbol?.toUpperCase()}</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-gray-200">{crypto.amount} {crypto.symbol?.toUpperCase()}</p>
                                                <p className="text-gray-400">US$ {(crypto.current_price * crypto.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className="pt-4 mt-4 border-t border-gray-700">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-200">Total</span>
                                        <span className="text-purple-500 text-xl font-semibold">
                                            US$ {wallet.cryptocurrencies.reduce((total, crypto) => total + (crypto.current_price * crypto.amount), 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    
                </Card>
           {/* {JSON.stringify(wallet)} */}
        </>
    )
}
