import Sidebar from "components/Sidebar";
import SidebarResponsive from "components/SidebarResponsive";
import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
   return (
      <div className='flex w-screen h-screen'>
         <div className='flex flex-col md:flex-row flex-nowrap h-full w-full'>
            <Sidebar />
            <SidebarResponsive />
            <main className='flex w-full overflow-y-scroll items-center justify-center'>
               <Outlet />
            </main>
         </div>
      </div>
   )
}

export default PrivateLayout;