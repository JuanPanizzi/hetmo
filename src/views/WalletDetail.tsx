import { useTransactions } from "../hooks/useTransactions";
import { Error } from "./Error";
import { CryptoTable } from "../components/WalletDetail/CryptoTable";
import { TransactionsTable } from "../components/WalletDetail/TransactionsTable";
import { HeaderCard } from "../components/UI/HeaderCard";
import { useNavigate } from "react-router-dom";

export const WalletDetail = () => {

    const navigate = useNavigate();
    const { wallet } = useTransactions();

    if (!wallet) return <Error message="Cartera no encontrada" />;
    

    return (
        <>
            <section >
                <HeaderCard
                    title={wallet?.name || ''}
                    buttonLabel="Operar Transacciones"
                    buttonIcon="pi pi-arrow-right"
                    secondaryButtonLabel="Historial de Transacciones"
                    secondaryButtonIcon="pi pi-list-check"
                    onButtonClick={() => navigate(`/wallet/${wallet.id}/transactions`)}
                    onSecondaryButtonClick={() => { const transactionsTable = document.getElementById('transactions-history');
                        transactionsTable?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-3 sm:mx-5 mt-5">
                    <CryptoTable wallet={wallet} />
                    <TransactionsTable wallet={wallet} title="Historial de Transacciones" id="transactions-history" />
                </div>
            </section>
           
           
        </>
    );
};
