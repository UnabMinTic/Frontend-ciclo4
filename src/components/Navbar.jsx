import { Link } from "react-router-dom";
import ImagenLogo from "./ImagenLogo";

const Navbar = () => {

   return (
      <nav className='bg-gray-200'>
         <ul className='flex flex-row items-center justify-between p-3 shadow-gray-400'>
            <li className='h-10'>
               <ImagenLogo altura={10} />
            </li>
            <li>Opción 1</li>
            <li className='px-3'>
               <Link to='/auth'>
                  <button
                     className='bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700'>
                     Iniciar Sesión
                  </button>
               </Link>
            </li>
         </ul>
      </nav>
   )
}

export default Navbar;