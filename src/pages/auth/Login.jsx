import { Link } from "react-router-dom";
import Google from 'media/google_logo.png';

const Login = () => {
   return (
      <>
         <div className='max-w-md w-full space-y-8'>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
               Inicia sesión en tu cuenta
            </h2>
            <form className='mt-8 space-y-6'>
               <div className='rounded-md shadow-sm -space-y-px'>
                  <div>
                     <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                        placeholder="Correo electrónico"
                     />
                  </div>
                  <div>
                     <input
                        id="password"
                        name="password"
                        tye="password"
                        autoComplete="current-password"
                        required
                        className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                        placeholder="Contraseña"
                     />
                  </div>
               </div>
               <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                     <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-500 rounded'
                     />
                     <label htmlFor="remember-me" className='ml-2 block text-gray-900'>
                        Recuérdame
                     </label>
                  </div>
                  <div>
                     <a href="/" className='font-medium text-indigo-600 hover:text-indigo-500'>
                        ¿Olvidaste tu contraseña?
                     </a>
                  </div>
               </div>
               <div>
                  <button
                     type="submit"
                     className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                     <Link to="/admin">Iniciar Sesión</Link>
                  </button>
               </div>
               <div className='flex items-center justify-between'>
                  <span>¿No tienes cuenta?</span>
                  <Link to='/auth/registro'>
                     <span className='font-medium text-indigo-600 hover:text-indigo-500'>Regístrate</span>
                  </Link>
               </div>
            </form>
         </div>
         <div className='flex items-center justify-center'>
            <span className='mx-4'>------------------------</span>
            <h2 className='my-4 text-center text-sm font-extrabold text-gray-900'>O</h2>
            <span className='mx-4'>------------------------</span>
         </div>
         <div className='max-w-md w-full'>
            <div>
               <button
                  type='submit'
                  className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
               >
                  <div className='flex items-center justify-start'>
                     <img src={Google} alt='Logo Google' className='h-6 w-6' />
                     <span className='mx-4'>Continúa con Google</span>
                  </div>
               </button>
            </div>
         </div>
      </>
   )
}

export default Login;