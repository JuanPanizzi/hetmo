import { useContext, useEffect, useRef, useState, useMemo } from "react";
import { WalletContext } from "../context/walletContext";
import { useParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Transaction, Crypto } from "../types/wallets";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { getCryptos } from "../services/API";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { useTransactions } from "../hooks/useTransactions";
import { Error } from "./Error";


export const WalletDetail = () => {

    const { wallets, wallet, deleteTransaction, newTransaction, handleNewTransaction, handleCancel, handleAddTransaction, visible, setVisible } = useTransactions();

    if (!wallet) {
        return <Error message="Cartera no encontrada" />;
    }

    const toast = useRef<Toast>(null);

    const [cryptos, setCryptos] = useState<Crypto[]>([]);

    const saveNewTransaction = () => {

        const result = handleAddTransaction();
        if (result.message) {
            toast.current?.show({
                severity: result.severity as 'error' | 'success',
                summary: result.severity === 'error' ? 'Error' : 'Operación Exitosa',
                detail: result.message,
                life: 3000
            });
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
            setCryptos(JSON.parse(cryptos));
        } else {
            const fetchCryptos = async () => {
                const response = await getCryptos();
                setCryptos(response.data);
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
            <Dialog header="Nueva Transacción" visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Dropdown
                        className="col-span-2"
                        options={['compra', 'venta']}
                        placeholder="Selecciona el tipo de transacción"
                        value={newTransaction.type}
                        onChange={(e) => handleNewTransaction({ type: e.value as 'compra' | 'venta' })}
                    />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="crypto">Criptomoneda</label>
                        <Dropdown
                            options={cryptos}
                            optionLabel="name"
                            placeholder="Selecciona la criptomoneda"
                            value={newTransaction.crypto}
                            disabled={!newTransaction.type}
                            onChange={(e) => handleNewTransaction({ crypto: e.value })}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="cantidad">Cantidad</label>
                        <InputNumber
                            id="cantidad"
                            placeholder="Cantidad"
                            value={newTransaction.amount}
                            min={0}
                            disabled={!newTransaction.type}
                            onChange={(e) => handleNewTransaction({ amount: e.value || 0 })}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="precio">Precio</label>
                        <InputNumber
                            id="precio"
                            placeholder="Precio"
                            mode="currency" currency="USD" locale="es-ES"
                            value={newTransaction.price}
                            disabled={!newTransaction.type}
                            readOnly
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="fecha">Fecha</label>
                        <Calendar
                            id="fecha"
                            placeholder="DD/MM/YYYY"
                            disabled={!newTransaction.type}
                            value={newTransaction.date ? new Date(newTransaction.date) : null}
                            onChange={(e) => handleNewTransaction({ date: e.value?.toISOString() || '' })}
                            locale={'es'}
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
                        onClick={saveNewTransaction}

                    />
                </div>
            </Dialog>


            <section className="p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl">{wallet?.name}</h1>
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
                        <DataTable title="Criptomonedas" value={wallet?.cryptocurrencies} paginator rows={5} tableStyle={{ minWidth: '50rem' }} emptyMessage="Sin criptomonedas">
                            <Column field="name" header="Criptomoneda" body={(rowData) => {
                                return <div className="flex items-center gap-2">
                                    <img src={rowData.image} alt={rowData.name} className="w-6 h-6 rounded-full" />
                                    {rowData.name}
                                </div>
                            }} />
                            <Column field="amount" header="Cantidad" />
                            <Column field="price" header="Valor" body={(rowData) => {
                                return (rowData.amount * rowData.current_price).toLocaleString('es-ES', {
                                    style: 'currency',
                                    currency: 'USD'
                                });
                            }} />
                        </DataTable>
                    </Card>

                    <Card title="Historial de Transacciones" className="shadow-lg">
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
                            <Column body={(rowData) => {
                                return (
                                    <div className="flex items-center gap-2">
                                        <Button icon="pi pi-trash" severity="danger" onClick={(e) => confirmDelete(e, rowData.id)} />
                                        {/* <Button icon="pi pi-pencil" severity="warning" onClick={() => handleEditTransaction(rowData)} />     */}
                                    </div>
                                )
                            }} />
                        </DataTable>
                    </Card>
                </div>
            </section>
        </>
    );
};
