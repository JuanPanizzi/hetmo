import { MegaMenu } from "primereact/megamenu";
// import { Menubar } from "primereact/menubar"
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
    <div className="min-h-screen flex flex-col max-w-[2500px] mx-auto"> 
      
       <MegaMenu model={items} className="shadow-lg sm:mx-4  bg-[#14151B]" breakpoint="640px"  pt={{
        menuitem: {
          className: 'hover:bg-[#282936] rounded-sm'
        }
      }} />
        <main className=" flex-1 max-sm:py-4 sm:p-4 max-sm:mt-5   sm:m-4 h-full min-h-[calc(100vh-7rem)] rounded-lg bg-[#14151B] border-[1px] border-[#3E4053]">
          <Outlet />
        </main>
    </div>
    </>
  )
}
