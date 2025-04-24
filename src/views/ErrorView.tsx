import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'

export const ErrorView = ({ message }: { message: string }) => {
    const navigate = useNavigate();
    return (
        <>
    <div className="flex flex-col justify-center items-center h-screen gap-4 px-4">
        <i className="pi pi-exclamation-triangle text-purple-500 text-6xl md:text-8xl"></i>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 text-center">{message}</h1>
            <Button label="Volver a inicio" icon="pi pi-arrow-left" onClick={() => navigate('/')} className="w-full md:w-auto max-w-[300px]" />
        </div>
    </>
  )
}
