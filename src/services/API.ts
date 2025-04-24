import axios from "axios";



export const getCryptos = async () => {

  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
      params: { vs_currency: 'usd' },
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.log('error', error);
    return { success: false, data: null }
  }

}

