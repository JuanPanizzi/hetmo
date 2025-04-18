import { useContext } from "react";
import { WalletContext } from "../context/walletContext";
import { useParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

export const WalletDetail = () => {
  const { wallets } = useContext(WalletContext);
  const { id } = useParams();

  const wallet = wallets.find(w => w.id === id);

  if (!wallet) {
    return <div>Wallet not found</div>;
  }

  return (
    <section className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl">{wallet.name}</h1>
        <Button 
          label="Nueva Transacción" 
          icon="pi pi-plus"
          className="p-button-primary"
        />
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
  );
};
