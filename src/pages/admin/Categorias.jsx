// 19. useRef
import { useEffect, useState, useRef } from "react"
// 8. Importar función que consulta las categorias en la BD
import { obtenerCategorias } from "utils/api"
// 15. Keys para los registros <tr> renderizados
import { nanoid } from "nanoid"
import axios from "axios"
// 24. Mensajes
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Tooltip } from "@mui/material"
/* 36. Dialogo del mensaje para eliminar */
import Dialog from "@mui/material/Dialog"

const Categorias = () => {
   // 5. Estado para (ver/ocultar) componentes (TablaCategorias/FormularioCreacionCategoria)
   const [mostrarTabla, setMostrarTabla] = useState(true)
   // 6. Estados de texto y color
   const [textoBoton, setTextoBoton] = useState('Nueva Categoria')
   const [colorBoton, setColorBoton] = useState('indigo')
   // 9. Estados para ejecutar consulta a la BD para traer las categorias
   const [categorias, setCategorias] = useState([])
   const [ejecutarConsulta, setEjecutarConsulta] = useState(true)

   // 7. Cambiar texto y color cuando cambie estado [mostrarTabla], es decir, el botón
   useEffect(() => {
      if (mostrarTabla) {
         setTextoBoton('Nueva Categoria')
         setColorBoton('green')
         // 10.1 Actualizar estado para que ejecute el llamado a la función que consulta la BD
         setEjecutarConsulta(true)
      } else {
         setTextoBoton('Mostrar Categorias')
         setColorBoton('indigo')
      }
   }, [mostrarTabla])

   // 10. Monitorear el estado que ejecuta el llamado a la función que consulta la BD
   useEffect(() => {
      if (ejecutarConsulta) {
         obtenerCategorias(setCategorias, setEjecutarConsulta)
      }
   }, [ejecutarConsulta])

   // 1. Página Categorias
   return (
      <div className="flex flex-col h-full w-full items-center justify-start p-8">
         <div className="flex flex-col w-full">
            <h2 className="text-4xl font-extrabold text-gray-800 text-center">Categorias</h2>
            {/* 4. Renderización condicional (Tabla/Formulario) */}
            <button
               onClick={() => {
                  setMostrarTabla(!mostrarTabla)
               }}
               className={"text-white bg-" + colorBoton + "-500 p-4 rounded-full my-6 self-end"}
            >
               {textoBoton}
            </button>
         </div>
         {
            mostrarTabla ?
               (
                  // 11. Pasar prop con la lista de las categorias después de ejecutar la consulta
                  <TablaCategorias
                     listaCategorias={categorias}
                     setEjecutarConsulta={setEjecutarConsulta}
                  />
               ) : (
                  <FormularioCreacionCategoria
                     setMostrarTabla={setMostrarTabla}
                  />
               )
         }
         {/* 25. Contenedor donde apareceran los mensajes */}
         <ToastContainer position="bottom-center" autoClose={3000} />
      </div>
   )
}

// 2. Componente TablaCategorias
// 12. Recibir prop con el listado de categorias
const TablaCategorias = ({ listaCategorias, setEjecutarConsulta }) => {
   /* 41. Estados para la busqueda desde la caja de texto */
   const [busqueda, setBusqueda] = useState('')
   const [categoriasFiltradas, setCategoriasFiltradas] = useState(listaCategorias)

   /* 43. Monitorear los cambios en la busqueda */
   useEffect(() => {
      setCategoriasFiltradas(
         listaCategorias.filter((elemento) => {
            return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase())
         })
      )
   }, [busqueda, listaCategorias])

   return (
      <div className="flex flex-col items-center justify-center w-full">
         {/* 42. Caja de texto para buscar */}
         <input
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar"
            className="border border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500"
         />
         <h2 className="text-2xl font-extrabold text-gray-800 my-3">Listado de Categorias</h2>
         {/* 26. Meter la tabla en un <div> para ocultarla y mostrar las tarjetas */}
         <div className="hidden sm:flex w-full">
            <table className="tabla">
               <thead>
                  <tr>
                     <th>Nombre</th>
                     <th>Descripción</th>
                     <th>Acciones</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     // 14. Pasar los datos de cada categoria al componente para que este los renderice
                     categoriasFiltradas.map((categoria) => {
                        return (
                           // 14.1 Se envía la categoria al componente FilaCategoria
                           <FilaCategoria
                              key={nanoid()}
                              categoria={categoria}
                              setEjecutarConsulta={setEjecutarConsulta}
                           />
                        )
                     })
                  }
               </tbody>
            </table>
         </div>
         {/* 27. Crear las tarjetas que se veran en pantallas pequeñas */}
         <div className="flex flex-col w-full sm:hidden">
            {
               listaCategorias.map((el) => {
                  return (
                     <div className="flex flex-col m-2 rounded-xl border border-gray-200 shadow-md">
                        <span className="bg-gray-500 rounded-t-xl">.</span>
                        <div className="flex flex-col p-2">
                           <span>{el.name}</span>
                           <span>{el.description}</span>
                        </div>
                     </div>
                  )
               })
            }
         </div>
      </div>
   )
}

// 13. Componente que pinta cada categoria recibiendola como prop
const FilaCategoria = ({ categoria, setEjecutarConsulta }) => {
   // 29. Crear estado que muestra y oculta botones y permite editar y eliminar categorias
   const [edit, setEdit] = useState(false)
   // 32. Estado con los datos de la categoria para cargar en las cajas de texto
   const [infoNuevaCategoria, setInfoNuevaCategoria] = useState({
      name: categoria.name,
      description: categoria.description
   })
   /* 37. Estado para eliminar categoria */
   const [openDialog, setOpenDialog] = useState(false)

   /* 34. Función que actualiza al confirmar la actualización */
   const actualizarCategoria = async () => {
      const options = {
         method: 'PUT',
         url: `http://localhost:3001/category/${categoria._id}`,
         headers: { 'Content-Type': 'application/json' },
         data: { name: infoNuevaCategoria.name, description: infoNuevaCategoria.description }
      }

      await axios
         .request(options)
         .then(function (response) {
            toast.success('Categoria actualizada con éxito!')
            setEdit(false)
            setEjecutarConsulta(true)
         })
         .catch(function (erroe) {
            toast.error('Error actualizando la categoria!')
         })
   }

   /* 39. Función que elimina una categoria al confirmar la eliminación */
   const eliminarCategoria = async () => {
      setOpenDialog(false)

      const options = {
         method: 'DELETE',
         url: `http://localhost:3001/category/${categoria._id}`,
         headers: { 'Content-Type': 'application/json' },
         data: {}
      }

      await axios
         .request(options)
         .then(function (response) {
            toast.success('Categoria eliminada con éxito!')
            setEjecutarConsulta(true)
         })
         .catch(function (error) {
            toast.error('Error eliminando la categoria!')
         })
   }

   return (
      <tr>
         {/* 30. Crear las cajas de texto para editar la categoria y renderizar condicionalmente */}
         {
            edit ? (
               <>
                  <td>
                     <input
                        type="text"
                        className="border border-gray-600 bg-gray-50 p-2 rounded-lg m-2"
                        /* 33. Cargar el valor a la caja y actualizar estado al cambiar la info de la caja */
                        value={infoNuevaCategoria.name}
                        onChange={(e) => setInfoNuevaCategoria(
                           { ...infoNuevaCategoria, name: e.target.value }
                        )}
                     />
                  </td>
                  <td>
                     <input
                        type="text"
                        className="border border-gray-600 bg-gray-50 p-2 rounded-lg m-2"
                        value={infoNuevaCategoria.description}
                        onChange={(e) => setInfoNuevaCategoria(
                           { ...infoNuevaCategoria, description: e.target.value }
                        )}
                     />
                  </td>
               </>
            ) : (
               <>
                  <td>{categoria.name}</td>
                  <td>{categoria.description}</td>
               </>
            )
         }
         <td>
            {/* 28. Crear botones editar y eliminar */}
            <div className="flex w-full justify-around">
               {/* 31. Renderizar condicionalmente la confirmación de editar */}
               {
                  edit ? (
                     <>
                        <Tooltip title='Confirmar Edición' arrow>
                           <i
                              onClick={() => actualizarCategoria()}/* 35. Invocar función */
                              className="fas fa-check text-green-700 hover:text-green-500 cursor-pointer"
                           />
                        </Tooltip>
                        <Tooltip title='Cancelar Edición' arrow>
                           <i
                              onClick={() => setEdit(!edit)}
                              className="fas fa-ban text-yellow-700 hover:text-yellow-500 cursor-pointer"
                           />
                        </Tooltip>
                     </>
                  ) : (
                     <>
                        <Tooltip title='Editar Categoria' arrow>
                           <i
                              onClick={() => setEdit(!edit)}
                              className="fas fa-pencil-alt text-yellow-700 hover:text-yellow-500 cursor-pointer"
                           />
                        </Tooltip>
                        <Tooltip title='Eliminar Categoria' arrow>
                           <i
                              onClick={() => setOpenDialog(true)}
                              className="fas fa-trash text-red-700 hover:text-red-500 cursor-pointer"
                           />
                        </Tooltip>
                     </>
                  )
               }
            </div>
            {/* 38. Implementar mensaje para eliminar */}
            <Dialog open={openDialog}>
               <div className="flex flex-col p-8">
                  <h1 className="text-gray-900 text-2xl font-bold">¿Está seguro de eliminar la categoria?</h1>
                  <div className="flex w-full justify-center my-4">
                     <button
                        /* 40. Invocar la función */
                        onClick={() => eliminarCategoria()}
                        className="px-4 py-2 mx-2 bg-green-500 text-white hover:bg-green-700 rounded-md"
                     >
                        Si
                     </button>
                     <button
                        onClick={() => setOpenDialog(false)}
                        className="px-4 py-2 mx-2 bg-red-500 text-white hover:bg-red-700 rounded-md"
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

// 3. Formulario Nueva Categoria
const FormularioCreacionCategoria = ({ setMostrarTabla }) => {
   // 20. useRef()
   const form = useRef(null)

   // 17. Función que se ejecuta con el botón Guardar Categoria, recibe el evento (e)
   const submitForm = async (e) => {

      // 18. Evitar que el formulario me redirija a otra página por defecto
      e.preventDefault()
      // 22. Convertir los datos de las cajar del form en json
      const fd = new FormData(form.current)
      const nuevaCategoria = {}

      fd.forEach((val, key) => {
         nuevaCategoria[key] = val
      })
      //console.log('Categoria desde el form: ', nuevaCategoria);

      // 23. Insertar en la BD
      const options = {
         method: 'POST',
         url: 'http://localhost:3001/category',
         headers: { 'Content-Type': 'application/json' },
         data: { name: nuevaCategoria.name, description: nuevaCategoria.description }
      }

      await axios.request(options).then(function (response) {
         //console.log('Categoria retornada despues de guardar: ', response.data);
         toast.success('Categoria agregada con éxito')
      }).catch(function (error) {
         console.log(error);
         toast.error('Error creando la categoria')
      })

      setMostrarTabla(true)
   }

   return (
      <div className="flex flex-col justify-center items-center">
         <h2 className="text-2xl font-extrabold text-gray-800 my-3">Crear Nueva Categoria</h2>
         {/* 16. onSubmit
            21. ref={form} */}
         <form ref={form} onSubmit={submitForm} className="flex flex-col space-y-2">
            <label htmlFor="name" className="flex flex-col">
               Nombre
               <input
                  name="name"
                  type="text"
                  placeholder="Nombre"
                  className="border border-gray-600 bg-gray-50 p-2 rounded-lg my-2"
                  required
               />
            </label>
            <label htmlFor="description" className="flex flex-col">
               Descripción
               <input
                  name="description"
                  type="text"
                  placeholder="Descripción"
                  className="border border-gray-600 bg-gray-50 p-2 rounded-lg my-2"
                  required
               />
            </label>
            <button
               type="submit"
               className="bg-green-500 rounded-full p-2 shadow-md text-white hover:bg-green-600"
            >
               Guardar Categoria
            </button>
         </form>
      </div>
   )
}

export default Categorias