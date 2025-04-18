
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Wallet } from '../../types/wallets';
import { useContext } from 'react';
import { WalletContext } from '../../context/walletContext';

export default function WalletCard({wallet}: {wallet: Wallet}) {

    const {deleteWallet} = useContext(WalletContext);

    const header = (
        <div className='p-1'>

      <h1>{wallet.name}</h1>
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
                <p className="m-0">
                    {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas! */}
                </p>
            </Card>
        </div>
    )
}
        