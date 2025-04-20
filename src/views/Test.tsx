import { Button } from 'primereact/button';
import React from 'react';

export const Test = () => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/list', {
        headers: {
          'x-cg-demo-api-key': 'CG-MX4Unb5kP7XqRvxDnBrRD2PA'
        }
      });

      console.log('hola')
      console.log('response', response)
      const data = await response.json();
      console.log('Respuesta del API:', data);
    } catch (error) {
      console.error('Error al hacer fetch:', error);
    }
  };

  return (
    <div>
      <div>Test</div>
      <Button onClick={fetchData}>Fetch API</Button>
    </div>
  );
};
