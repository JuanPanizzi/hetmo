import { Menubar } from "primereact/menubar"
import { MenuItem } from "primereact/menuitem";
import { Outlet, useNavigate } from "react-router-dom"

export const Layout = () => {
  
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      command: () => navigate('/')
    },
    {
      label: 'Criptomonedas',
      icon: 'pi pi-bitcoin',
      command: ()=> navigate('/cryptos')
    },

  ];
  
  
  return (
    <>
    <Menubar model={items} />
    <Outlet />
    </>
  )
}
