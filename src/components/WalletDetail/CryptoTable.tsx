import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Card } from 'primereact/card'
import { Wallet } from '../../types/wallets'

type Props = {
    wallet: Wallet
}

export const CryptoTable = ({ wallet }: Props) => {
    return (
        <>
            <Card title="Criptomonedas" className="shadow-lg">
                <DataTable title="Criptomonedas" value={wallet?.cryptocurrencies} paginator rows={5} tableStyle={{ minWidth: '50rem' }} emptyMessage="Sin criptomonedas" className='text-xs sm:text-sm md:text-base'>
                    <Column field="name" header="Criptomoneda" body={(rowData) => {
                        return <div className="flex items-center gap-2">
                            <img src={rowData.image} alt={rowData.name} className="w-6 h-6 rounded-full" />
                            {rowData.name}
                        </div>
                    }} />
                    <Column field="amount" header="Cantidad" />
                    <Column field="price" header="Valor" body={(rowData) => {
                        return (rowData.amount * rowData.current_price).toLocaleString('es-ES', {
                            style: 'currency',
                            currency: 'USD'
                        });
                    }} />
                </DataTable>
            </Card>
        </>
    )
}