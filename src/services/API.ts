import axios from "axios";


const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const getCryptos = async () => {

  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: { vs_currency: 'usd' },
      headers: { 'x-cg-demo-api-key': API_KEY }
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log('error', error);
    return { success: false, data: null }
  }

}

