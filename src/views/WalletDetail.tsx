import { useContext, useRef, useState } from "react";
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
import { Toast } from "primereact/toast";

export const WalletDetail = () => {

    const { wallets, addTransaction } = useContext(WalletContext);
    const { id } = useParams();

    const toast = useRef<Toast>(null);

    const wallet = wallets.find(w => w.id === id);

    if (!wallet) {
        return <div>Cartera no encontrada</div>;
    }
    const [visible, setVisible] = useState<boolean>(false)
    const [newTransaction, setNewTransaction] = useState<Transaction>({
        type: '',
        crypto: '',
        amount: 0,
        price: 0,
        date: '',
        id: ''
    })

    const handleCancel = () => {
        setVisible(false);
        setNewTransaction({
            type: '',
            crypto: '',
            amount: 0,
            price: 0,
            date: '',
            id: ''
        })
    }

    const handleAddTransaction = () => {


        if (!newTransaction.type || !newTransaction.crypto || !newTransaction.amount || !newTransaction.price || !newTransaction.date) {
            toast.current?.show({ severity: "error", summary: "Error", detail: "Todos los campos son obligatorios", life: 3000 });
            return;
        }

        newTransaction.id = crypto.randomUUID();
        addTransaction(wallet.id, newTransaction);
        setVisible(false);
        setNewTransaction({
            type: '',
            crypto: '',
            amount: 0,
            price: 0,
            date: '',
            id: ''
        });
    }

    return (
        <>
        {JSON.stringify(newTransaction)}
            <Toast ref={toast} />
            <Dialog header="Nueva Transacción" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Dropdown
                        className="col-span-2"
                        options={['compra', 'venta']}
                        placeholder="Selecciona el tipo de transacción"
                        value={newTransaction.type}
                        onChange={(e) => setNewTransaction(prevState => ({ ...prevState, type: e.value as 'compra' | 'venta' }))}
                    />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="crypto">Criptomoneda</label>
                        <InputText
                            id="crypto"
                            placeholder="Nombre"
                            value={newTransaction.crypto}
                            disabled={!newTransaction.type}
                            onChange={(e) => setNewTransaction(prevState => ({ ...prevState, crypto: e.target.value }))}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="cantidad">Cantidad</label>
                    <InputNumber
                        id="cantidad"
                        placeholder="Cantidad"
                        value={newTransaction.amount}
                        disabled={!newTransaction.type}
                        onValueChange={(e) => setNewTransaction(prevState => ({ ...prevState, amount: e.value || 0 }))}
                        />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="precio">Precio (USD)</label>
                    <InputNumber
                        id="precio"
                        placeholder="Precio"
                        mode="currency" currency="USD" locale="en-US"
                        value={newTransaction.price}
                        disabled={!newTransaction.type}
                        onValueChange={(e) => setNewTransaction(prevState => ({ ...prevState, value: e.value || 0 }))}
                        />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="fecha">Fecha</label>
                            <Calendar
                                id="fecha"
                                placeholder="DD/MM/YYYY"
                                disabled={!newTransaction.type}
                                value={newTransaction.date ? new Date(newTransaction.date) : null}
                                onChange={(e) => setNewTransaction(prevState => ({ ...prevState, date: e.value?.toISOString() || '' }))}
                            />
                        </div>
                    <Button
                        label="Cancelar"
                        severity="secondary"
                        icon="pi pi-times"
                        onClick={handleCancel}
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
                            label="Nueva Transacción"
                            icon="pi pi-plus"
                            className=""
                            onClick={() => setVisible(true)}
                        />

                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title="Criptomonedas" className="shadow-lg">
                        <DataTable value={wallet.cryptocurrencies} paginator rows={5} tableStyle={{ minWidth: '50rem' }} emptyMessage="Sin criptomonedas">
                            <Column field="name" header="Criptomoneda" />
                            <Column field="amount" header="Cantidad" />
                            <Column field="value" header="Valor" />
                        </DataTable>



                    </Card>

                    <Card title="Historial de Transacciones" className="shadow-lg">
                        <DataTable value={wallet.transactions} paginator rows={5} tableStyle={{ minWidth: '50rem' }} emptyMessage="Sin transacciones">
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
