import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import React, { useContext, useRef } from 'react'
import { Transaction, Wallet } from '../../types/wallets';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { WalletContext } from '../../context/walletContext';
import { Toast } from 'primereact/toast';
import { getSeverity } from '../../utils/utils';

type Props = {
    title?: string
    wallet: Wallet
    confirmDelete?: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void
    handleEditTransaction?: (transaction: any) => void
    handleConfirmTransaction?: (transaction: Transaction, newStatus: string) => void
    handleDeleteTransaction?: (id: string) => void
}




export const TransactionsTable = ({ title, wallet, confirmDelete, handleEditTransaction, handleDeleteTransaction }: Props) => {


const {updateTransaction} = useContext(WalletContext);
const toast = useRef<Toast>(null);

    const statusBodyTemplate = (transaction: Transaction) => {
        return <Tag value={transaction.status?.charAt(0).toUpperCase() + transaction.status?.slice(1)} severity={getSeverity(transaction)}></Tag>;
    };

    const handleConfirmTransaction = (transaction: Transaction | any, newStatus: string) => {
        updateTransaction(wallet.id, { ...transaction, status: newStatus });
        toast.current?.show({ severity: 'success', summary: 'Transacción Confirmada', detail: 'La transacción ha sido confirmada', life: 3000 });
    }

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
                    <Column field='status' header='Estado' body={statusBodyTemplate} sortable  />
                    <Column body={(rowData) => {
                        return (
                            <div className="flex justify-end gap-2">
                                {handleEditTransaction && rowData.status === 'pendiente' && <Button size='small' icon="pi pi-pencil" severity="warning" onClick={() => handleEditTransaction(rowData)} />}
                                {confirmDelete && <Button size='small' icon="pi pi-trash" severity="danger" onClick={(e) => confirmDelete(e, rowData.id)} />}
                                {handleConfirmTransaction && rowData.status === 'pendiente' && <Button size='small' icon="pi pi-check" label="Confirmar" severity="success" onClick={() => handleConfirmTransaction(rowData, 'confirmada')} />}
                                {handleDeleteTransaction && rowData.status === 'pendiente' && <Button size='small' icon="pi pi-trash" label="Eliminar" severity="danger" onClick={() => handleDeleteTransaction(rowData.id)} />}
                            </div>
                        )

                    }} />


                </DataTable>
            </Card>
            <Toast ref={toast} />
        </>
    )
}