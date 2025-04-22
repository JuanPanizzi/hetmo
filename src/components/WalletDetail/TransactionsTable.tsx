import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { useContext, useRef } from 'react'
import { Transaction, Wallet } from '../../types/wallets';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { WalletContext } from '../../context/walletContext';
import { Toast } from 'primereact/toast';
import { getSeverity } from '../../utils/utils';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

type Props = {
    title?: string
    wallet: Wallet
    handleEditTransaction?: (transaction: any) => void
    handleConfirmTransaction?: (transaction: Transaction, newStatus: string) => void

}




export const TransactionsTable = ({ title, wallet, handleEditTransaction }: Props) => {


    const { confirmTransaction, deleteTransaction } = useContext(WalletContext);

    const toast = useRef<Toast>(null);

    const statusBodyTemplate = (transaction: Transaction) => {
        return <Tag className='' value={transaction.status?.charAt(0).toUpperCase() + transaction.status?.slice(1)} severity={getSeverity(transaction)}></Tag>
    };

    const handleConfirmTransaction = (transaction: Transaction | any, newStatus: string) => {
        confirmTransaction(wallet.id, { ...transaction, status: newStatus });
        toast.current?.show({ severity: 'success', summary: 'Transacción Confirmada', detail: 'La transacción ha sido confirmada', life: 3000 });
    }


    const confirmDelete = (event: any, id: string) => {
        confirmPopup({
            target: event.currentTarget,
            message: '¿Está seguro de que desea eliminar esta transacción?',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            acceptLabel: 'Eliminar',
            rejectLabel: 'Cancelar',
            acceptClassName: 'p-button-danger',
            accept: () => {
                if (!wallet) {
                    return;
                }
                deleteTransaction(wallet.id, id);
                toast.current?.show({ severity: "success", summary: "Operación Exitosa", detail: "Transacción eliminada correctamente", life: 3000 });
            }
        });
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
                    <Column field='status' header='Estado' body={statusBodyTemplate} sortable />
                    <Column body={(rowData) => {
                        return (
                            <div className="flex justify-end gap-2">
                                {handleEditTransaction && rowData.status === 'pendiente' && <Button size='small' icon="pi pi-pencil" severity="warning" onClick={() => handleEditTransaction(rowData)} />}
                                {confirmDelete && <Button size='small' label="Eliminar" icon="pi pi-trash" severity="danger" onClick={(e) => confirmDelete(e, rowData.id)} />}
                                {handleConfirmTransaction && rowData.status === 'pendiente' && <Button size='small' icon="pi pi-check" label="Confirmar" severity="success" onClick={() => handleConfirmTransaction(rowData, 'confirmada')} />}

                            </div>
                        )

                    }} />


                </DataTable>
            </Card>
            <Toast ref={toast} />
            <ConfirmPopup acceptLabel="Si" rejectLabel="No" />
        </>
    )
}