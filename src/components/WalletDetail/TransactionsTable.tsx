import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import React from 'react'
import { Wallet } from '../../types/wallets';
import { Button } from 'primereact/button';

type Props = {
    wallet: Wallet
    confirmDelete: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void
    handleEditTransaction?: (transaction: any) => void
}

export const TransactionsTable = ({ wallet, confirmDelete, handleEditTransaction }: Props) => {
    return (
        <>
            <Card title="Historial de Transacciones" className="shadow-lg">
                <DataTable value={wallet?.transactions} paginator rows={5} tableStyle={{ minWidth: '50rem' }} emptyMessage="Sin transacciones">
                    <Column
                        field="date"
                        header="Fecha"
                        sortable
                        body={(rowData) => {
                            const date = new Date(rowData.date);
                            return date.toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            });
                        }}
                    />
                    <Column field="type" header="Tipo" sortable />
                    <Column field="crypto.name" header="Criptomoneda" sortable />
                    <Column field="amount" header="Cantidad" sortable />
                    <Column field="price" header="Precio" sortable body={(rowData) => {
                        return parseInt(rowData.price).toLocaleString('es-ES', {
                            style: 'currency',
                            currency: 'USD'
                        });
                    }} />
                    <Column body={(rowData) => {
                        return (
                            <div className="flex items-center gap-2">
                                <Button icon="pi pi-trash"  severity="danger" onClick={(e) => confirmDelete(e, rowData.id)} />
                                {handleEditTransaction && <Button icon="pi pi-pencil" severity="warning" onClick={() => handleEditTransaction(rowData)} />}    
                            </div>
                        )
                    }} />
                </DataTable>
            </Card>
        </>
    )
}