const API_KEY = 'CG-MX4Unb5kP7XqRvxDnBrRD2PA';
const BASE_URL = "https://api.coingecko.com/api/v3";

export const getCryptos = async () => {
  const url = `${BASE_URL}/coins/markets?vs_currency=usd&x_cg_demo_api_key=${API_KEY}`;

  try {

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-cg-demo-api-key": API_KEY
      }
    });
    if (response.status < 200 || response.status >= 300) {
      throw new Error();
    }
    const data = await response.json();
    return { success: true, data }
  } catch (error) {
    return { success: false, data: null }

  }

}
