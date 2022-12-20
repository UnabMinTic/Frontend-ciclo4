import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SidebarResponsive = () => {
   const [mostrarNavegacion, setMostrarNavegacion] = useState(false);

   return (
      <div className='md:hidden'
         onClick={() => {
            setMostrarNavegacion(!mostrarNavegacion);
         }}
      >
         <i className={`mx-3 fas fa-${mostrarNavegacion ? 'times' : 'bars'} hover:text-yellow-500`} />
         {mostrarNavegacion && <ul>
            <ResponsiveRuta nombre='Barcos' ruta='/admin/barcos' icono='fa-light fa-ship' color='bg-indigo-700' />
            <ResponsiveRuta nombre='Usuarios' ruta='/admin/usuarios' icono='fa-light fa-user' color='bg-indigo-700' />
            <ResponsiveRuta nombre='Clientes' ruta='/admin/clientes' icono='fa-sharp fa-solid fa-user-tie' color='bg-indigo-700' />
            <ResponsiveRuta nombre='Reservaciones' ruta='/admin/reservaciones' icono='fa-light fa-phone-volume' color='bg-indigo-700' />
            <ResponsiveRuta nombre='Categorias' ruta='/admin/categorias' icono='fa-light fa-list' color='bg-indigo-700' />
            <ResponsiveRuta nombre='Mensajes' ruta='/admin/mensajes' icono='fa-light fa-envelope' color='bg-indigo-700' />
            <ResponsiveRuta nombre='Cerrar Sesión' ruta='/' icono='fa-light fa-door-open' color='bg-red-600' />
         </ul>}
      </div>
   )
}

const ResponsiveRuta = ({ nombre, ruta, icono, color }) => {
   return (
      <Link to={ruta}>
         <li className='px-2'>
            <button className={`flex items-center ${color} text-gray-50 p-2 w-full rounded-md hover:bg-indigo-900 my-1`}>
               <i className={`fas ${icono} w-10`} />
               {nombre}
            </button>

         </li>
      </Link>
   );
}

export default SidebarResponsive;