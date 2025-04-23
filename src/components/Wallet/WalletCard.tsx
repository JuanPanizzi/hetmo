import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Wallet, WalletModalOptions } from '../../types/wallets';
import { confirmDialog } from 'primereact/confirmdialog';
import { useNavigate } from 'react-router-dom';



type Props = {
    wallet: Wallet;
    handleDeleteWallet: (id: string) => void;
    cryptos: Crypto[];
    handleWalletModal: (showWalletModal: boolean, options?: WalletModalOptions) => void;
}

export default function WalletCard({ wallet, handleDeleteWallet, handleWalletModal }: Props) {

    const navigate = useNavigate();

    

    const confirmDelete = () => {
        confirmDialog({
            message: '¿Está seguro de eliminar esta cartera?',
            header: 'Eliminar Cartera ',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger text-xs sm:text-sm md:text-base',
            rejectClassName: 'p-button-text text-xs sm:text-sm md:text-base',
            className: 'text-xs sm:text-sm md:text-base',
            accept: () => handleDeleteWallet(wallet.id)

        });
    };


    const header = (
        <div className='px-4 pt-4 sm:p-4'>
            <h1 className='sm:text-2xl font-bold'>{wallet.name}</h1>
        </div>
    );
    
    const footer = (
        <>
            <Button icon="pi pi-sign-in" label='Ingresar' onClick={() => navigate(`/wallet/${wallet.id}`)} className="text-xs sm:text-sm md:text-base" />
            <Button icon="pi pi-pencil" className="text-xs sm:text-sm md:text-base mx-2 " onClick={() => handleWalletModal(true, { isEditing: true, selectedWallet: { ...wallet } })}
            />
            <Button severity="danger" icon="pi pi-trash" className="text-xs sm:text-sm md:text-base" onClick={confirmDelete} />
        </>
    );

    return (
        <>


            <Card footer={footer} header={header} className=" sm:p-4 w-full  shadow-lg" pt={{
                footer: {
                    className: 'max-sm:pt-2'
                },
                content: {
                    className: 'max-sm:pt-1'
                }
            }}>
                {
                    !wallet.cryptocurrencies?.length ? (
                        <p>No hay criptomonedas en esta cartera</p>
                    ) : (
                        <div className="flex flex-col">
                            <div className="max-h-[140px] sm:max-h-[250px] overflow-y-auto space-y-4 sm:pr-2 text-xs sm:text-sm md:text-base">
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
                            </div>
                            <div className="pt-4 mt-4 border-t border-gray-700 ">
                                <div className="flex justify-between items-center text-sm sm:text-base md:text-lg">
                                    <span className="text-gray-200">Total</span>
                                    <span className="text-purple-500 sm:text-xl font-semibold">
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
