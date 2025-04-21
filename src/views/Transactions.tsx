import { ConfirmPopup } from 'primereact/confirmpopup'
import { HeaderCard } from '../components/UI/HeaderCard'
import { Toast } from 'primereact/toast'
import { useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TransactionModal } from '../components/WalletDetail/TransactionModal';
import { useParams } from 'react-router-dom';
import { useTransactions } from '../hooks/useTransactions';
import { useNavigate } from 'react-router-dom';
import { getCryptos } from '../services/API';
import { Crypto as CryptoType } from '../types/wallets';

    export const Transactions = () => {
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);


    const { wallet, deleteTransaction, newTransaction, handleNewTransaction, handleCancel, handleAddTransaction, visible, handleSetVisible, cryptos, handleSetCryptos, handleEditTransaction, isEditing, loading, handleLoading } = useTransactions();


    if (!wallet) {
        return <h1>Cartera no encontrada</h1>
    }


    const saveNewTransaction = () => {
        const result = handleAddTransaction();
        if (result.message) {
            toast.current?.show({ severity: result.severity as 'error' | 'success', summary: result.severity === 'error' ? 'Error' : 'Operación Exitosa', detail: result.message, life: 3000 });
        }
    }

    useEffect(() => {
        if (newTransaction.crypto && newTransaction.amount >= 0) {
            const derivedPrice = (newTransaction.crypto as CryptoType).current_price * newTransaction.amount;
            handleNewTransaction({ price: derivedPrice });
        }
    }, [newTransaction.crypto, newTransaction.amount]);

    useEffect(() => {

        (async()=>{
          try {
            const cryptos = sessionStorage.getItem('cryptos');
            if(cryptos){
              handleSetCryptos(JSON.parse(cryptos));
              return;
            }
            handleLoading(true);
            const response = await getCryptos();
            if (response.success) {
              handleSetCryptos(response.data);
              sessionStorage.setItem('cryptos', JSON.stringify(response.data));
            }
          } catch (error) {
            console.log('Error al obtener criptomonedas');
          } finally{
            handleLoading(false);
          }})();
    
      }, [])

    return (
        <>
            <section className="">
                <HeaderCard
                    title={'Transacciones'}
                    buttonLabel="Crear"

                    onButtonClick={() => { handleSetVisible(true) }}
                    secondaryButtonLabel="Regresar"
                    secondaryButtonIcon="pi pi-arrow-left"
                    onSecondaryButtonClick={() => { navigate('/wallet/' + wallet.id) }}
                />

                <div className="grid grid-cols-1  gap-6 mx-5 mt-5">
                    <Card>
                        <DataTable emptyMessage="No hay transacciones">
                            <Column field="date" header="Fecha"></Column>
                            <Column field="type" header="Tipo"></Column>
                            <Column field="crypto" header="Criptomoneda"></Column>
                            <Column field="amount" header="Cantidad"></Column>
                            <Column field="price" header="Precio"></Column>
                        </DataTable >
                    </Card>
                </div>
            </section>
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
        </>
    )
}
