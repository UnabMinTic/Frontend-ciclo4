// Componentes
import { Outlet } from "react-router-dom";
import Footer from "components/Footer";
import Navbar from "components/Navbar";

const PublicLayout = () => {
   return (
      <div className='flex flex-col justify-between h-screen'>
         <Navbar />
         <main className='h-full overflow-y-scroll'>
            <Outlet />
         </main>
         <Footer />
      </div>
   )
}

export default PublicLayout;