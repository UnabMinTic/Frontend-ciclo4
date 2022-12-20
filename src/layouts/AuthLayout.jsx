import { Link, Outlet } from "react-router-dom";

const AuthLayout = () => {
   return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-200 py-2 px-4 sm:px-6 lg:px-8'>
         <div className='w-full flex items-start'>
            <Link to='/'>
               <i className='fas fa-home cursor-pointer hover:text-indigo-500' />
            </Link>
         </div>
         <div className='max-w-md pb-3 w-full'>
            <Outlet />
         </div>
      </div>
   )
}

export default AuthLayout;