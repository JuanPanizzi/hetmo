import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'

export const Error = ({ message }: { message: string }) => {
    const navigate = useNavigate();
    return (
        <>
    <div className="flex flex-col justify-center items-center h-screen gap-4">
        <i className="pi pi-exclamation-triangle text-purple-500 text-8xl"></i>
        <h1 className="text-4xl font-bold text-gray-800">{message}</h1>
            {/* <p className="text-xl text-gray-600">{message}</p> */}
            <Button label="Volver a inicio" icon="pi pi-arrow-left" onClick={() => navigate('/')} />
        </div>
    </>
  )
}
