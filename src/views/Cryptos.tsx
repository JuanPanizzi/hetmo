import { DataTable } from 'primereact/datatable'
import { useEffect } from 'react'


// En Vite, las variables de entorno van en import.meta.env
const API_KEY = 'CG-MX4Unb5kP7XqRvxDnBrRD2PA';
const BASE_URL = "https://api.coingecko.com/api/v3";

export async function fetchCoinsList() {
  const url = `${BASE_URL}/coins/list?x_cg_demo_api_key=${API_KEY}`;  // asegúrate de NO duplicar barras "//"
  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-cg-demo-api-key": API_KEY
    }
  });
  if (!resp.ok) {
    throw new Error(`CoinGecko responded ${resp.status}`);
  }
  return resp.json();
}


export const Cryptos = () => {
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const coins = await fetchCoinsList();
  //     console.log('COINS', coins)
  //   };
  //   fetchData();
  // }, [])


  return (

    <DataTable />
  )
}
