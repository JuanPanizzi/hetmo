import { HeaderCard } from '../components/UI/HeaderCard'
import { Toast } from 'primereact/toast'
import { useEffect, useRef } from 'react';
import { TransactionModal } from '../components/WalletDetail/TransactionModal';
import { useTransactions } from '../hooks/useTransactions';
import { useNavigate } from 'react-router-dom';
import { getCryptos } from '../services/API';
import {  CryptoType } from '../types/wallets';
import { TransactionsTable } from '../components/WalletDetail/TransactionsTable';
import { ErrorView } from './ErrorView';


export const Transactions = () => {

  
  const { wallet, newTransaction, handleNewTransaction, handleCancel, handleAddTransaction, visible, handleSetVisible, cryptos, handleSetCryptos, handleEditTransaction, isEditing, handleLoading } = useTransactions();
  
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  
  if (!wallet) return <ErrorView message="Error al cargar la cartera" />
  


  const saveNewTransaction = () => {
    const result = handleAddTransaction();
    if (result.message) {

      if (isEditing && result.message == "Transacción añadida correctamente") {
        toast.current?.show({ severity: result.severity as 'error' | 'success', summary: 'Operación Exitosa', detail: "Transacción editada correctamente", life: 3000 });
        return;
      }

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

    (async () => {
      try {
        const cryptos = sessionStorage.getItem('cryptos');
        if (cryptos) {
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
        
        toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al obtener criptomonedas, intente nuevamente', life: 3000 });
      } finally {
        handleLoading(false);
      }
    })();

  }, [])




  return (
    <>
      <section >
        <HeaderCard
          title={'Transacciones'}
          buttonLabel="Nueva Transacción"
          buttonIcon="pi pi-plus"
          onButtonClick={() => { handleSetVisible(true) }}
          secondaryButtonLabel="Regresar"
          secondaryButtonIcon="pi pi-arrow-left"
          onSecondaryButtonClick={() => { navigate('/wallet/' + wallet.id) }}
        />

        <div className="grid grid-cols-1  mx-3 sm:mx-5 mt-5">
            <TransactionsTable 
            wallet={{ ...wallet, transactions: wallet.transactions.filter(t => t.status === 'pendiente') }} 
            handleEditTransaction={handleEditTransaction} 
            isOperating={true} 
            title="Transacciones pendientes" />
        </div>
      </section>


      <TransactionModal
        visible={visible}
        handleSetVisible={handleSetVisible}
        newTransaction={newTransaction}
        handleNewTransaction={handleNewTransaction}
        cryptos={cryptos}
        handleCancel={handleCancel}
        saveNewTransaction={saveNewTransaction}
        isEditing={isEditing}
        data-testid="transaction-modal"
      />
      <Toast ref={toast} className="text-xs sm:text-sm md:text-base max-sm:max-w-[90%]" />
    </>
  )
}
