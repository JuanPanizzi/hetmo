
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Wallet } from '../../types/wallets';
import { confirmDialog } from 'primereact/confirmdialog';


export default function WalletCard({ wallet, handleDeleteWallet }: { wallet: Wallet, handleDeleteWallet: (id: string) => void }) {

  

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
        <div className='p-1'>

            <h1 className='text-2xl font-bold'>{wallet.name}</h1>
        </div>
    );
    const footer = (
        <>
            <Button icon="pi pi-sign-in" label='Ingresar' />
            <Button icon="pi pi-pencil" className='mx-2'/>
            <Button severity="danger" icon="pi pi-trash"  onClick={confirmDelete} />

        </>
    );

    return (
        <>
           
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
