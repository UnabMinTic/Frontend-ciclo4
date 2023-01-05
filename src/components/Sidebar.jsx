import useActiveRoute from "hooks/useActiveRoute";
import { Link } from "react-router-dom";
import ImagenLogo from "./ImagenLogo";

const Sidebar = () => {
   return (
      <nav className='hidden md:flex md:w-72 flex-col justify-between border border-gray-300 h-full bg-gray-200 p-4'>
         <Link to='/admin'>
            <ImagenLogo altura={40} />
         </Link>
         <div className='my-5'>
            <Ruta nombre='Barcos' ruta='/admin/barcos' icono='fa-light fa-ship' color='bg-indigo-700' />
            <Ruta nombre='Usuarios' ruta='/admin/usuarios' icono='fa-light fa-user' color='bg-indigo-700' />
            <Ruta nombre='Clientes' ruta='/admin/clientes' icono='fa-sharp fa-solid fa-user-tie' color='bg-indigo-700' />
            <Ruta nombre='Reservaciones' ruta='/admin/reservaciones' icono='fa-light fa-phone-volume' color='bg-indigo-700' />
            <Ruta nombre='Categorias' ruta='/admin/categorias' icono='fa-light fa-list' color='bg-indigo-700' />
            <Ruta nombre='Mensajes' ruta='/admin/mensajes' icono='fa-light fa-envelope' color='bg-indigo-700' />
         </div>
         {/* <Ruta nombre='Cerrar Sesión' ruta='/' icono='fa-light fa-door-open' color='bg-red-600' /> */}
         <Link to='/'>
            <button
               className='bg-red-500 p-2 text-white rounded-lg shadow-md hover:bg-red-700'>
               Cerrar Sesión
            </button>
         </Link>
      </nav>
   );
}

const Ruta = ({ nombre, ruta, icono, color }) => {
   const isActive = useActiveRoute(ruta);

   return (
      <Link to={ruta}>
         <button className={`flex items-center ${isActive ? 'bg-indigo-900' : color} text-gray-50 p-2 w-full rounded-md hover:bg-gray-500 my-1`}>
            <i className={`fas ${icono} w-10`} />
            {nombre}
         </button>
      </Link>
   );
}

export default Sidebar;