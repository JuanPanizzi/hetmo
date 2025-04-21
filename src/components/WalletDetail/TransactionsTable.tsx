import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import React from 'react'
import { Transaction, Wallet } from '../../types/wallets';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

type Props = {
    title?: string
    wallet: Wallet
    confirmDelete?: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void
    handleEditTransaction?: (transaction: any) => void
    handleConfirmTransaction?: (id: string) => void
    handleDeleteTransaction?: (id: string) => void
}




export const TransactionsTable = ({ title, wallet, confirmDelete, handleEditTransaction, handleConfirmTransaction, handleDeleteTransaction }: Props) => {

    const statusBodyTemplate = (transaction: Transaction) => {
        return <Tag value={transaction.status?.charAt(0).toUpperCase() + transaction.status?.slice(1)} severity={getSeverity(transaction)}></Tag>;
    };

    const getSeverity = (transaction: Transaction) => {
        switch (transaction.status) {
            case 'confirmada':
                return 'success';

            case 'pendiente':
                return 'warning';

            case 'cancelada':
                return 'danger';

            default:
                return null;
        }
    };

    return (
        <>
            <Card title={title} className="shadow-lg">
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
                    <Column field='status' header='Estado' body={statusBodyTemplate} />
                    <Column body={(rowData) => {
                        return (
                            <div className="flex justify-end gap-2">
                                {handleEditTransaction && rowData.status === 'pendiente' && <Button icon="pi pi-pencil" severity="warning" onClick={() => handleEditTransaction(rowData)} />}
                                {confirmDelete && <Button icon="pi pi-trash" severity="danger" onClick={(e) => confirmDelete(e, rowData.id)} />}
                                {handleConfirmTransaction && rowData.status === 'pendiente' && <Button icon="pi pi-check" label="Confirmar" severity="success" onClick={() => handleConfirmTransaction(rowData.id)} />}
                                {handleDeleteTransaction && rowData.status === 'pendiente' && <Button icon="pi pi-trash" label="Eliminar" severity="danger" onClick={() => handleDeleteTransaction(rowData.id)} />}
                            </div>
                        )

                    }} />


                </DataTable>
            </Card>
        </>
    )
}