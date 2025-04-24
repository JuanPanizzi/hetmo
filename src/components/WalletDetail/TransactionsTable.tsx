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

type TransactionsTableProps = {
    title?: string
    wallet: Wallet,
    isOperating?: boolean,
    handleEditTransaction?: (transaction: any) => void
    handleUpdateTransactionStatus?: (transaction: Transaction, newStatus: string) => void
    id?: string
}




export const TransactionsTable = ({ title, wallet, handleEditTransaction, isOperating, id }: TransactionsTableProps) => {


    const { updateTransactionStatus, deleteTransaction } = useContext(WalletContext);

    const toast = useRef<Toast>(null);

    const statusBodyTemplate = (transaction: Transaction) => {
        return <Tag className='' value={transaction.status?.charAt(0).toUpperCase() + transaction.status?.slice(1)} severity={getSeverity(transaction)}></Tag>
    };

    const handleUpdateTransactionStatus = (transaction: Transaction | any, newStatus: string) => {
        const result = updateTransactionStatus(wallet.id, { ...transaction, status: newStatus });

        if (!result.success) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: result.error || 'Error al actualizar la transacción', life: 3000 });
            return;
        }
        if (newStatus === 'confirmada') {
            toast.current?.show({ severity: 'success', summary: 'Transacción Confirmada', detail: 'La transacción ha sido confirmada', life: 3000 });
            return;
        } else {
            toast.current?.show({ severity: 'warn', summary: 'Transacción Cancelada', detail: 'La transacción ha sido cancelada', life: 3000 });
            return;
        }
    }



    const confirmDelete = (event: any, transaction: Transaction) => {
        confirmPopup({
            target: event.currentTarget,
            message: isOperating || !isOperating && transaction.status === 'pendiente' ? '¿Está seguro de cancelar esta transacción?' : '¿Está seguro de eliminar esta transacción?',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            acceptLabel: isOperating || !isOperating && transaction.status === 'pendiente' ? 'Sí' : 'Eliminar',
            rejectLabel: isOperating || !isOperating && transaction.status === 'pendiente' ? 'No' : 'Cancelar',
            acceptClassName: 'p-button-danger text-xs sm:text-sm md:text-base',
            rejectClassName: 'p-button-text text-xs sm:text-sm md:text-base',
            className: 'text-xs sm:text-sm md:text-base',
            accept: () => {
                if (!wallet) {
                    return;
                }
                if (isOperating || !isOperating && transaction.status === 'pendiente') {
                    handleUpdateTransactionStatus(transaction, 'cancelada');

                    return;
                }


                deleteTransaction(wallet.id, transaction);
                toast.current?.show({ severity: "success", summary: "Operación Exitosa", detail: "Transacción eliminada correctamente", life: 3000 });
                return;
            }
        });
    };




    return (
        <>
            <Card title={title} className="shadow-lg">
                <DataTable value={wallet?.transactions} paginator rows={5} tableStyle={{ minWidth: '30rem' }} emptyMessage="Sin transacciones" className='text-xs sm:text-sm md:text-base' id={id}  >
                    <Column header="Acciones" body={(rowData) => {
                        return (
                            <div className="flex justify-start gap-2">
                                {
                                    handleEditTransaction && rowData.status === 'pendiente' &&
                                    <Button className='text-xs sm:text-sm md:text-base max-sm:p-2 sm:p-1 sm:px-2  max-sm:max-w-8'
                                        size='small'
                                        icon="pi pi-pencil"
                                        severity="warning"
                                        onClick={() => handleEditTransaction(rowData)} />
                                }
                                {
                                    isOperating || !isOperating && rowData.status === 'pendiente' ?
                                        <Button className='text-xs sm:text-sm md:text-base max-sm:p-2 sm:p-1 sm:px-2  max-sm:max-w-8'
                                            size='small'
                                            label='Cancelar'
                                            icon="pi pi-times"
                                            severity='danger'
                                            onClick={(e) => confirmDelete(e, rowData)}
                                        /> :
                                        confirmDelete &&
                                        <Button className='text-xs sm:text-sm md:text-base max-sm:p-2 sm:p-1 sm:px-2  max-sm:max-w-8' size='small' label="Eliminar" icon="pi pi-trash" severity="danger" onClick={(e) => confirmDelete(e, rowData)} />

                                }
                                {
                                    handleUpdateTransactionStatus && rowData.status === 'pendiente' && <Button className='text-xs sm:text-sm md:text-base max-sm:p-2 sm:p-1 sm:px-2  max-sm:max-w-8' size='small' icon="pi pi-check" label="Confirmar" severity="success" onClick={() => handleUpdateTransactionStatus(rowData, 'confirmada')} />
                                }
                            </div>
                        )

                    }} />

                    <Column field='status' header='Estado' body={statusBodyTemplate} sortable />
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


                </DataTable>
            </Card>
            <Toast ref={toast} className="text-xs sm:text-sm md:text-base max-sm:max-w-[90%]" />
            <ConfirmPopup acceptLabel="Si" rejectLabel="No" />
        </>
    )
}