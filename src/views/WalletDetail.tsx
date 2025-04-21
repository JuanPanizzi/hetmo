import { useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Crypto } from "../types/wallets";
import { Toast } from "primereact/toast";
import { getCryptos } from "../services/API";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { useTransactions } from "../hooks/useTransactions";
import { Error } from "./Error";
import { TransactionModal } from "../components/WalletDetail/TransactionModal";
import { CryptoTable } from "../components/WalletDetail/CryptoTable";
import { TransactionsTable } from "../components/WalletDetail/TransactionsTable";
import { HeaderCard } from "../components/UI/HeaderCard";


export const WalletDetail = () => {

    const { wallet, deleteTransaction, newTransaction, handleNewTransaction, handleCancel, handleAddTransaction, visible, handleSetVisible, cryptos, handleSetCryptos, handleEditTransaction, isEditing } = useTransactions();

    if (!wallet) {
        return <Error message="Cartera no encontrada" />;
    }

    const toast = useRef<Toast>(null);


    const saveNewTransaction = () => {
        const result = handleAddTransaction();
        if (result.message) {
            toast.current?.show({ severity: result.severity as 'error' | 'success', summary: result.severity === 'error' ? 'Error' : 'Operación Exitosa', detail: result.message, life: 3000 });
        }
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

    useEffect(() => {
        const cryptos = sessionStorage.getItem('cryptos');
        if (cryptos) {
            handleSetCryptos(JSON.parse(cryptos));
        } else {
            const fetchCryptos = async () => {
                const response = await getCryptos();
                handleSetCryptos(response.data);
                sessionStorage.setItem('cryptos', JSON.stringify(response.data));
            }
            fetchCryptos();
        }

    }, [])


    useEffect(() => {
        if (newTransaction.crypto && newTransaction.amount >= 0) {
            const derivedPrice = (newTransaction.crypto as Crypto).current_price * newTransaction.amount;
            handleNewTransaction({ price: derivedPrice });
        }
    }, [newTransaction.crypto, newTransaction.amount]);

    return (
        <>

            <ConfirmPopup acceptLabel="Si" rejectLabel="No" />
            <Toast ref={toast} />
            <TransactionModal 
                visible={visible} 
                handleSetVisible={handleSetVisible} 
                newTransaction={newTransaction} 
                handleNewTransaction={handleNewTransaction} 
                cryptos={cryptos} 
                handleCancel={handleCancel} 
                saveNewTransaction={saveNewTransaction} 
                isEditing={isEditing}
            />

            <section className="">
                <HeaderCard 
                    title={wallet?.name || ''}
                    buttonLabel="Nueva Transacción"
                    onButtonClick={() => handleSetVisible(true)}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-5 mt-5">
                    <CryptoTable wallet={wallet} />
                    <TransactionsTable wallet={wallet} confirmDelete={confirmDelete} handleEditTransaction={handleEditTransaction} />
                </div>
            </section>
        </>
    );
};
