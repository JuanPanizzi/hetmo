import { Toast } from "primereact/toast";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { useTransactions } from "../hooks/useTransactions";
import { Error } from "./Error";
import { CryptoTable } from "../components/WalletDetail/CryptoTable";
import { TransactionsTable } from "../components/WalletDetail/TransactionsTable";
import { HeaderCard } from "../components/UI/HeaderCard";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export const WalletDetail = () => {

    const navigate = useNavigate();
    const { wallet, deleteTransaction } = useTransactions();

    if (!wallet) {
        return <Error message="Cartera no encontrada" />;
    }

    const toast = useRef<Toast>(null);

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
            <section className="">
                <HeaderCard
                    title={wallet?.name || ''}
                    buttonLabel="Nueva Transacción"
                    onButtonClick={() => navigate(`/wallet/${wallet.id}/transactions`)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-5 mt-5">
                    <CryptoTable wallet={wallet} />
                    <TransactionsTable 
                        wallet={wallet} 
                        confirmDelete={confirmDelete}
                        title="Historial de Transacciones"
                        // handleEditTransaction={handleEditTransaction} 
                    />
                </div>
            </section>
            <ConfirmPopup acceptLabel="Si" rejectLabel="No" />
            <Toast ref={toast} />
        </>
    );
};
