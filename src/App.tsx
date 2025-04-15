

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];

  return (
    <>
    <div className="card flex justify-content-center">
    <Button  label="click me" />
            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
                placeholder="Select a City" className="w-full md:w-14rem" />
        </div>
    </>
  )
}

export default App
