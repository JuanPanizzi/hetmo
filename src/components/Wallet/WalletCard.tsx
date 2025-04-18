
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Wallet } from '../../types/wallets';
import {  useRef } from 'react';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
// import { WalletContext } from '../../context/walletContext';

export default function WalletCard({ wallet, handleDeleteWallet }: { wallet: Wallet, handleDeleteWallet: (id: number) => void }) {

    // const { deleteWallet } = useContext(WalletContext);

    const toast = useRef<Toast>(null);

    const accept = () => {
        handleDeleteWallet(Number(wallet.id))
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
        <div className='p-1'>

            <h1 className='text-2xl font-bold'>{wallet.name}</h1>
        </div>
        // <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footer = (
        <>
            <Button icon="pi pi-check" />
            <Button severity="danger" icon="pi pi-trash" style={{ marginLeft: '0.5em' }} onClick={confirmDelete} />

        </>
    );

    


    return (
        <>
            <Toast ref={toast} />
           
            <div className="card flex justify-content-center xl:max-w-xl">
                <Card title="" subTitle="" footer={footer} header={header} className="">
                    {
                        !wallet.cryptocurrencies?.length ? (
                            <p>No hay criptomonedas en esta cartera</p>
                        ) : (
                            <div>
                                {
                                    wallet.cryptocurrencies.map((crypto) => (
                                        <div key={crypto.id}>
                                            <p>{crypto.name}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </Card>
            </div>
        </>
    )
}
