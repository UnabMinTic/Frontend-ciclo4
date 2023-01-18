import { useState, useEffect, useRef } from 'react'
import { obtenerUsuarios } from 'utils/api'
import { nanoid } from 'nanoid'
import Tooltip from '@mui/material/Tooltip'
import Dialog from '@mui/material/Dialog'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Usuarios = () => {
   const [mostrarTabla, setMostrarTabla] = useState(true)
   const [textoBoton, setTextoBoton] = useState('Nuevo Usuario')
   const [colorBoton, setColorBoton] = useState('green')
   const [usuarios, setUsuarios] = useState([])
   const [ejecutarConsulta, setEjecutarConsulta] = useState(true)

   useEffect(() => {
      if (mostrarTabla) {
         setTextoBoton('Nuevo Usuario')
         setColorBoton('green')
         setEjecutarConsulta(true)
      } else {
         setTextoBoton('Mostrar Usuarios')
         setColorBoton('indigo')
      }
   }, [mostrarTabla])

   useEffect(() => {
      if (ejecutarConsulta) {
         obtenerUsuarios(setUsuarios, setEjecutarConsulta)
      }
   }, [ejecutarConsulta])

   return (
      <div className='flex flex-col h-full w-full items-center justify-start p-8 py-2'>
         <div className='flex flex-col w-full'>
            <h2 className='text-4xl font-extrabold text-gray-800 text-center'>Usuarios</h2>
            <button
               onClick={() => {
                  setMostrarTabla(!mostrarTabla)
               }}
               className={'text-white bg-' + colorBoton + '-500 p-4 rounded-full my-6 self-end'}
            >
               {textoBoton}
            </button>
         </div>
         {
            mostrarTabla ? (
               <TablaUsuarios
                  listaUsuarios={usuarios}
                  setEjecutarConsulta={setEjecutarConsulta}
               />
            ) : (
               <FormularioCreacionUsuario
                  setMostrarTabla={setMostrarTabla}
               />
            )
         }
         <ToastContainer position='bottom-center' autoClose={3000} />
      </div>
   )
}

const TablaUsuarios = ({ listaUsuarios, setEjecutarConsulta }) => {
   const [busqueda, setBusqueda] = useState('')
   const [usuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios)

   useEffect(() => {
      setUsuariosFiltrados(
         listaUsuarios.filter((elemento) => {
            return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase())
         })
      )
   }, [busqueda, listaUsuarios])

   return (
      <div className='flex flex-col items-center justify-center w-full'>
         <input
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder='Buscar'
            className='border border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500'
         />
         <h2 className='text-2xl font-extrabold'>Listado de Usuarios</h2>
         <div className='hidden sm:flex w-full'>
            <table className='tabla'>
               <thead>
                  <tr>
                     <th>Usuario</th>
                     <th>Email</th>
                     <th>Password</th>
                     <th>Perfil</th>
                     <th>Acciones</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     usuariosFiltrados.map((usuario) => {
                        return (
                           <FilaUsuario
                              key={nanoid()}
                              usuario={usuario}
                              setEjecutarConsulta={setEjecutarConsulta}
                           />
                        )
                     })
                  }
               </tbody>
            </table>
         </div>
         <div className='flex flex-col w-full sm:hidden'>
            {
               usuariosFiltrados.map((el) => {
                  return (
                     <div className='flex flex-col m-2 rounded-xl border border-gray-200 shadow-md'>
                        <span className='bg-gray-500 rounded-t-xl'>.</span>
                        <div className='flex flex-col p-2'>
                           <span>{el.username}</span>
                           <span>{el.email}</span>
                           <span>{el.password}</span>
                           <span>{el.perfil}</span>
                        </div>
                     </div>
                  )
               })
            }
         </div>
      </div>
   )
}

const FilaUsuario = ({ usuario, setEjecutarConsulta }) => {
   const [edit, setEdit] = useState(false)
   const [openDialog, setOpenDialog] = useState(false)
   const [infoNuevoUsuario, setInfoNuevoUsuario] = useState({
      username: usuario.username,
      email: usuario.email,
      password: usuario.password,
      perfil: usuario.perfil
   })

   const actualizarUsuario = async () => {
      const options = {
         method: 'PUT',
         url: `http://localhost:3001/user/${usuario._id}`,
         headers: { 'Content-Type': 'application/json' },
         data: {
            username: infoNuevoUsuario.username,
            email: infoNuevoUsuario.email,
            password: infoNuevoUsuario.password,
            perfil: infoNuevoUsuario.perfil
         }
      }

      await axios
         .request(options)
         .then(function (response) {
            toast.success('Usuario actualizado con éxito!')
            setEdit(false)
            setEjecutarConsulta(true)
         })
         .catch(function (error) {
            toast.error('Error actualizando el usuario!')
         })
   }

   const eliminarUsuario = async () => {
      setOpenDialog(false)

      const options = {
         method: 'DELETE',
         url: `http://localhost:3001/user/${usuario._id}`,
         headers: { 'Content-Type': 'application/json' },
         data: {}
      }

      await axios
         .request(options)
         .then(function (response) {
            toast.success('Usuario eliminado con éxito!')
            setEjecutarConsulta(true)
         })
         .catch(function (error) {
            toast.error('Error eliminando el usuario!')
         })
   }

   return (
      <tr>
         {
            edit ? (
               <>
                  <td>
                     <input
                        type='text'
                        className='border border-gray-600 bg-gray-50 p-2 rounded-lg my-2 hover:outline-none focus:border-indigo-500'
                        value={infoNuevoUsuario.username}
                        onChange={(e) => setInfoNuevoUsuario(
                           { ...infoNuevoUsuario, username: e.target.value }
                        )}
                     />
                  </td>
                  <td>
                     <input
                        type='text'
                        className='border border-gray-600 bg-gray-50 p-2 rounded-lg my-2 hover:outline-none focus:border-indigo-500'
                        value={infoNuevoUsuario.email}
                        onChange={(e) => setInfoNuevoUsuario(
                           { ...infoNuevoUsuario, email: e.target.value }
                        )}
                     />
                  </td>
                  <td>
                     <input
                        type='text'
                        className='border border-gray-600 bg-gray-50 p-2 rounded-lg my-2 hover:outline-none focus:border-indigo-500'
                        value={infoNuevoUsuario.password}
                        onChange={(e) => setInfoNuevoUsuario(
                           { ...infoNuevoUsuario, password: e.target.value }
                        )}
                     />
                  </td>
                  <td>
                     <select
                        className='border border-gray-600 bg-gray-50 p-2 rounded-lg my-2 hover:outline-none focus:border-indigo-500'
                        value={infoNuevoUsuario.perfil}
                        onChange={(e) => setInfoNuevoUsuario(
                           { ...infoNuevoUsuario, perfil: e.target.value }
                        )}
                     >
                        <option>Administrador</option>
                        <option>Coordinador</option>
                        <option>Asesor</option>
                        <option>Cliente</option>
                     </select>
                  </td>
               </>
            ) : (
               <>
                  <td>{usuario.username}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.password}</td>
                  <td>{usuario.perfil}</td>
               </>
            )
         }
         <td>
            <div className='flex w-full justify-around'>
               {
                  edit ? (
                     <>
                        <Tooltip title='Confirmar Edición' arrow>
                           <i
                              onClick={() => actualizarUsuario()}
                              className='fas fa-check text-green-700 hover:text-green-500 cursor-pointer'
                           />
                        </Tooltip>
                        <Tooltip title='Cancelar Edición' arrow>
                           <i
                              onClick={() => setEdit(!edit)}
                              className='fas fa-ban text-yellow-700 hover:text-yellow-500 cursor-pointer'
                           />
                        </Tooltip>
                     </>
                  ) : (
                     <>
                        <Tooltip title='Editar Usuario' arrow>
                           <i
                              onClick={() => setEdit(!edit)}
                              className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500 cursor-pointer'
                           />
                        </Tooltip>
                        <Tooltip title='Eliminar Usuario' arrow>
                           <i
                              onClick={() => setOpenDialog(true)}
                              className='fas fa-trash text-red-700 hover:text-red-500 cursor-pointer'
                           />
                        </Tooltip>
                     </>
                  )
               }
            </div>
            <Dialog open={openDialog}>
               <div className='flex flex-col p-8'>
                  <h1 className='text-gray-900 text-2xl font-bold'>¿Está seguro de eliminar el usuario?</h1>
                  <div className='flex w-full justify-center my-4'>
                     <button
                        onClick={() => eliminarUsuario()}
                        className='px-4 py-2 mx-2 bg-green-500 text-white hover:bg-green-700 rounded-md'
                     >
                        Si
                     </button>
                     <button
                        onClick={() => setOpenDialog(false)}
                        className='px-4 py-2 mx-2 bg-red-500 text-white hover:bg-red-700 rounded-md'
                     >
                        No
                     </button>
                  </div>
               </div>
            </Dialog>
         </td>
      </tr>
   )
}

const FormularioCreacionUsuario = ({ setMostrarTabla }) => {
   const form = useRef(null)

   const submitForm = async (e) => {
      e.preventDefault()

      const fd = new FormData(form.current)
      const nuevoUsuario = {}

      fd.forEach((val, key) => {
         nuevoUsuario[key] = val
      })

      console.log('Usuario para guardar: ', nuevoUsuario)

      const options = {
         method: 'POST',
         url: 'http://localhost:3001/user',
         headers: { 'Content-Type': 'application/json' },
         data: {
            username: nuevoUsuario.username,
            email: nuevoUsuario.email,
            password: nuevoUsuario.password,
            perfil: nuevoUsuario.perfil
         }
      }

      await axios
         .request(options)
         .then(function (response) {
            toast.success('Usuario agregado con éxito!')
         })
         .catch(function (error) {
            toast.error('Error creando el usuario!')
         })

      setMostrarTabla(true)
   }

   return (
      <div className='flex flex-col justify-center items-center'>
         <h2 className='text-2xl font-extrabold text-gray-800 my-3'>Crear Nuevo Usuario</h2>
         <form ref={form} onSubmit={submitForm} className='flex flex-col space-y-2'>
            <label htmlFor="username" className='flex flex-col'>
               Nombre de usuario
               <input
                  name='username'
                  type='text'
                  placeholder='Nombre de usuario'
                  required
                  className='border border-gray-600 bg-gray-50 p-2 rounded-lg my-2 hover:outline-none focus:border-indigo-500'
               />
            </label>
            <label htmlFor="email" className='flex flex-col'>
               Email
               <input
                  name='email'
                  type='email'
                  placeholder='Email'
                  required
                  className='border border-gray-600 bg-gray-50 p-2 rounded-lg my-2 hover:outline-none focus:border-indigo-500'
               />
            </label>
            <label htmlFor="password" className='flex flex-col'>
               Password
               <input
                  name='password'
                  type='text'
                  placeholder='Password'
                  required
                  className='border border-gray-600 bg-gray-50 p-2 rounded-lg my-2 hover:outline-none focus:border-indigo-500'
               />
            </label>
            <label htmlFor="perfil" className='flex flex-col'>
               Perfil
               <select
                  name='perfil'
                  defaultValue=''
                  required
                  className='border border-gray-600 bg-gray-50 p-2 rounded-lg my-2 hover:outline-none focus:border-indigo-500'
               >
                  <option value='' disabled>Seleccione un perfil</option>
                  <option>Administrador</option>
                  <option>Coordinador</option>
                  <option>Asesor</option>
                  <option>Cliente</option>
               </select>
            </label>
            <button
               type='submit'
               className='bg-green-500 rounded-full p-2 shadow-md text-white hover:bg-green-600'
            >
               Guardar Usuario
            </button>
         </form>
      </div>
   )
}

export default Usuarios