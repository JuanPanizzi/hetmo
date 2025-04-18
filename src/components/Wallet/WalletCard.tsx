
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Wallet } from '../../types/wallets';
import { useContext } from 'react';
import { WalletContext } from '../../context/walletContext';

export default function WalletCard({wallet}: {wallet: Wallet}) {

    const {deleteWallet} = useContext(WalletContext);

    const header = (
        <div className='p-1'>

      <h1 className='text-2xl font-bold'>{wallet.name}</h1>
        </div>
        // <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footer = (
        <>
            <Button  icon="pi pi-check" />
            <Button  severity="danger" icon="pi pi-trash" style={{ marginLeft: '0.5em' }} onClick={() => deleteWallet(Number(wallet.id))} />
            
        </>
    );



    return (
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
    )
}
        