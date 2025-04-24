import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable'
import { useEffect, useRef, useState } from 'react'
import { getCryptos } from '../services/API';
import { Toast } from 'primereact/toast';
import { CryptoType } from '../types/wallets';
import { Card } from 'primereact/card';
import { formatCurrency } from '../utils/utils';




export const Cryptos = () => {

  const [coins, setCoins] = useState<CryptoType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);


  useEffect(() => {

    (async () => {

      try {
        const cryptos = sessionStorage.getItem('cryptos');
        if (cryptos) {
          setCoins(JSON.parse(cryptos));
          return;
        }
        setLoading(true);
        const response = await getCryptos();
        if (response.success) {
          setCoins(response.data);
          sessionStorage.setItem('cryptos', JSON.stringify(response.data));
        } else {
          throw new Error('Error al obtener las criptomonedas');
        }
      } catch (error) {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error al obtener las criptomonedas, intente nuevamente', life: 3000 });
      } finally {
        setLoading(false);
      }
    })();

  }, []);


  return (

    <>

      <Card title="Listado de criptomonedas" className="shadow-lg sm:m-4 max-sm:mx-3">

        <DataTable
          value={coins ?? []}
          paginator
          scrollable
          rows={6}
          loading={loading}
          loadingIcon="pi pi-spinner pi-spin"
          emptyMessage="Sin resultados"
          className="text-xs sm:text-sm md:text-base "
          tableStyle={{ minWidth: '20rem', maxWidth: '100%' }}
        >
          <Column
            header="Criptomoneda"
            body={(row) => (
              <div className="flex items-center gap-2">
                <img src={row.image} alt={row.name} className='w-6 h-6 sm:w-10 sm:h-10 rounded-full' />
                <span>{row.name}</span>
              </div>
            )}
          />
          <Column field="symbol" header="Símbolo" />
          <Column field="current_price" header="Precio (USD)" body={(row) => formatCurrency(row.current_price)} />

        </DataTable>

      </Card>
      <Toast ref={toast} className="text-xs sm:text-sm md:text-base max-sm:max-w-[90%]" />

    </>
  )
}
