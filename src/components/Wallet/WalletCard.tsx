
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function WalletCard() {
    const header = (
        <div className='border border-t-gray-200'>

      <h1>Wallet</h1>
        </div>
        // <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const footer = (
        <>
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
        </>
    );

    return (
        <div className="card flex justify-content-center xl:max-w-xl">
            <Card title="Advanced Card" subTitle="Card subtitle" footer={footer} header={header} className="">
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>
        </div>
    )
}
        