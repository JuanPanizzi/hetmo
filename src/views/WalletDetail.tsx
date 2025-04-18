import { useContext, useState } from "react";
import { WalletContext } from "../context/walletContext";
import { useParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Transaction } from "../types/wallets";
import { Dropdown } from "primereact/dropdown";

export const WalletDetail = () => {

    const { wallets, addTransaction } = useContext(WalletContext);
    const { id } = useParams();

    const wallet = wallets.find(w => w.id === id);

    if (!wallet) {
        return <div>Cartera no encontrada</div>;
    }
    const [visible, setVisible] = useState<boolean>(false)
    const [newTransaction, setNewTransaction] = useState<Transaction>({
        type: 'compra',
        cryptocurrency: '',
        amount: 0,
        value: 0,
        date: '',
        id: ''
    })

    const handleAddTransaction = () => {
        newTransaction.id = crypto.randomUUID();
        addTransaction(wallet.id, newTransaction);
        setVisible(false);
        setNewTransaction({
            type: 'compra',
            cryptocurrency: '',
            amount: 0,
            value: 0,
            date: '',
            id: ''
        });
    }
    
    return (
        <>
            <Dialog header="Nueva Transacción" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <div>
                    <InputText 
                        placeholder="Nombre" 
                        value={newTransaction.cryptocurrency}
                        onChange={(e) => setNewTransaction(prevState => ({...prevState, cryptocurrency: e.target.value}))}
                    />
                    <InputNumber 
                        placeholder="Cantidad" 
                        value={newTransaction.amount}
                        onValueChange={(e) => setNewTransaction(prevState => ({...prevState, amount: e.value || 0}))}
                    />
                    <InputNumber 
                        placeholder="Precio" 
                        value={newTransaction.value}
                        onValueChange={(e) => setNewTransaction(prevState => ({...prevState, value: e.value || 0}))}
                    />
                    <Calendar 
                        placeholder="Fecha"
                        value={newTransaction.date ? new Date(newTransaction.date) : null}
                        onChange={(e) => setNewTransaction(prevState => ({...prevState, date: e.value?.toISOString() || ''}))}
                    />
                    <Dropdown
                        options={['compra', 'venta']}
                        value={newTransaction.type}
                        onChange={(e) => setNewTransaction(prevState => ({...prevState, type: e.value as 'compra' | 'venta'}))}
                    />
                    <Button 
                        label="Aceptar" 
                        icon="pi pi-check"
                        onClick={handleAddTransaction}
                    />
                </div>
            </Dialog>


            <section className="p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl">{wallet.name}</h1>
                    <div>

                    <Button
                        label="Comprar"
                        icon="pi pi-plus"
                        className=""
                        onClick={() => setVisible(true)}
                        />
                    
                        </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title="Criptomonedas" className="shadow-lg">
                        {wallet.cryptocurrencies?.length ? (
                            <div className="space-y-2">
                                {wallet.cryptocurrencies.map(crypto => (
                                    <div key={crypto.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                        <span className="font-medium">{crypto.name}</span>
                                        <span>{crypto.amount}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No hay criptomonedas en esta cartera</p>
                        )}
                    </Card>

                    <Card title="Historial de Transacciones" className="shadow-lg">
                        <DataTable value={wallet.transactions} paginator rows={5} tableStyle={{ minWidth: '50rem' }}>
                            <Column field="date" header="Fecha" sortable />
                            <Column field="type" header="Tipo" sortable />
                            <Column field="cryptocurrency" header="Criptomoneda" sortable />
                            <Column field="amount" header="Cantidad" sortable />
                            <Column field="price" header="Precio" sortable />
                        </DataTable>
                    </Card>
                </div>
            </section>
        </>
    );
};
