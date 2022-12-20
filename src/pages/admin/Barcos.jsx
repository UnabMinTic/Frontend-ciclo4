import { useEffect, useState, useRef } from "react"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from "nanoid";

const Barcos = () => {
   const [mostrarTabla, setMostrarTabla] = useState(true);
   const [textoBoton, setTextoBoton] = useState('Crear Nuevo Barco');
   const [barcos, setBarcos] = useState([]);
   const [colorBoton, setColorBoton] = useState('indigo');
   const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

   useEffect(() => {
      const obtenerBarcos = async () => {
         const options = { method: 'GET', url: 'http://localhost:5000/barcos' };

         await axios.request(options).then(function (response) {
            console.log("Barcos: ", response.data);
            setBarcos(response.data);
         }).catch(function (error) {
            console.error(error);
         });
      }
      if (ejecutarConsulta) {
         obtenerBarcos();
         setEjecutarConsulta(false);
      }
   }, [ejecutarConsulta])


   useEffect(() => {
      // Obtener lista de barcos desde el backend
      if (mostrarTabla) {
         setEjecutarConsulta(true);
      }
   }, [mostrarTabla])

   useEffect(() => {
      if (mostrarTabla) {
         setTextoBoton('Nuevo Barco');
         setColorBoton('green');
      } else {
         setTextoBoton('Mostrar Barcos');
         setColorBoton('indigo');
      }
   }, [mostrarTabla])

   return (
      <div className='flex h-full w-full flex-col items-center justify-start p-8 my-7'>
         <div className='flex flex-col w-full'>
            <h2 className='text-3xl font-extrabold text-gray-800'>Página de administración de barcos</h2>
            <button
               onClick={() => {
                  setMostrarTabla(!mostrarTabla)
               }}
               className={`text-white bg-${colorBoton}-500 p-4 rounded-full m-6 w-20 self-end`}
            >
               {textoBoton}
            </button>
         </div>
         {mostrarTabla ?
            (
               <TablaBarcos listaBarcos={barcos} setEjecutarConsulta={setEjecutarConsulta} />
            ) : (
               <FormularioCreacionBarcos
                  setMostrarTabla={setMostrarTabla}
                  listaBarcos={barcos}
                  setBarcos={setBarcos}
               />
            )
         }
         <ToastContainer position="bottom-center" autoClose={3000} />
      </div>
   )
}

const TablaBarcos = ({ listaBarcos, setEjecutarConsulta }) => {
   useEffect(() => {
      console.log("Este es el listado de barcos en el componente de tabla", listaBarcos);
   }, [listaBarcos])

   return (
      <div className='flex flex-col items-center justify-center w-full'>
         <h2 className='text-2xl font-extrabold text-gray-800'>Todos los Barcos</h2>
         <table className="tabla">
            <thead>
               <tr>
                  <th>Serie</th>
                  <th>Nombre</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Acciones</th>
               </tr>
            </thead>
            <tbody>
               {
                  listaBarcos.map((barco) => {
                     return (
                        <FilaBarco
                           key={nanoid()}
                           barco={barco}
                           setEjecutarConsulta={setEjecutarConsulta}
                        />
                     )
                  })
               }
            </tbody>
         </table>
      </div>
   )
}

const FilaBarco = ({ barco, setEjecutarConsulta }) => {
   const [edit, setEdit] = useState(false);
   const [infoNuevoBarco, setInfoNuevoBarco] = useState({
      serie: barco.serie,
      nombre: barco.nombre,
      marca: barco.marca,
      modelo: barco.modelo
   });

   const actualizarBarco = async () => {
      console.log(infoNuevoBarco);
      // Enviar la info al backend
      const options = {
         method: 'PATCH',
         url: 'http://localhost:5000/barcos/update',
         headers: { 'Content-Type': 'application/json' },
         data: { ...infoNuevoBarco, id: barco._id }
      }

      await axios
         .request(options)
         .then(function (response) {
            console.log(response.data);
            toast.success('Barco actualizado con éxito!');
            setEdit(false);
            setEjecutarConsulta(true);
         })
         .catch(function (error) {
            console.error(error);
            toast.error('Error actualizando el barco!');
         });
   }

   const eliminarBarco = async () => {
      const options = {
         method: 'DELETE',
         url: 'http://localhost:5000/barcos/delete',
         headers: { 'Content-Type': 'application/json' },
         data: { id: barco._id }
      }

      await axios
         .request(options)
         .then(function (response) {
            console.log(response.data);
            toast.success('Barco eliminado con éxito!');
            setEjecutarConsulta(true);
         })
         .catch(function (error) {
            console.error(error);
            toast.error('Error eliminando el barco!');
         });
   }

   return (
      <tr>
         {edit ?
            (
               <>
                  <td>
                     <input
                        className='border border-gray-600 bg-gray-50 p-2 rounded-lg m-2'
                        type="text"
                        value={infoNuevoBarco.serie}
                        onChange={(e) =>
                           setInfoNuevoBarco({ ...infoNuevoBarco, serie: e.target.value })
                        }
                     />
                  </td>
                  <td>
                     <input
                        className='border border-gray-600 bg-gray-50 p-2 rounded-lg m-2'
                        type="text"
                        value={infoNuevoBarco.nombre}
                        onChange={(e) =>
                           setInfoNuevoBarco({ ...infoNuevoBarco, nombre: e.target.value })
                        }
                     />
                  </td>
                  <td>
                     <input
                        className='border border-gray-600 bg-gray-50 p-2 rounded-lg m-2'
                        type="text"
                        value={infoNuevoBarco.marca}
                        onChange={(e) =>
                           setInfoNuevoBarco({ ...infoNuevoBarco, marca: e.target.value })
                        }
                     />
                  </td>
                  <td>
                     <input
                        className='border border-gray-600 bg-gray-50 p-2 rounded-lg m-2'
                        type="text"
                        value={infoNuevoBarco.modelo}
                        onChange={(e) =>
                           setInfoNuevoBarco({ ...infoNuevoBarco, modelo: e.target.value })
                        }
                     />
                  </td>
               </>
            )
            :
            (
               <>
                  <td>{barco.serie}</td>
                  <td>{barco.nombre}</td>
                  <td>{barco.marca}</td>
                  <td>{barco.modelo}</td>
               </>
            )
         }
         <td>
            <div className='flex w-full justify-around'>
               {edit ?
                  (
                     <i
                        onClick={() => actualizarBarco()}
                        className='fas fa-check text-green-700 hover:text-green-500 cursor-pointer'
                     />
                  )
                  :
                  (
                     <i
                        onClick={() => setEdit(!edit)}
                        className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500 cursor-pointer'
                     />
                  )
               }
               <i
                  onClick={() => eliminarBarco()}
                  className='fas fa-trash text-red-700 hover:text-red-500 cursor-pointer'
               />
            </div>
         </td>
      </tr>
   );
}

const FormularioCreacionBarcos = ({ setMostrarTabla, listaBarcos, setBarcos }) => {
   const form = useRef(null);

   const submitForm = async (e) => {
      e.preventDefault();
      const fd = new FormData(form.current);
      const nuevoBarco = {};

      fd.forEach((val, key) => {
         nuevoBarco[key] = val;
      })

      console.log("Nuevo Barco: ", nuevoBarco);

      const options = {
         method: 'POST',
         url: 'http://localhost:5000/barcos/nuevo',
         headers: { 'Content-Type': 'application/json' },
         data: { serie: nuevoBarco.serie, nombre: nuevoBarco.nombre, marca: nuevoBarco.marca, modelo: nuevoBarco.modelo }
      };

      await axios.request(options).then(function (response) {
         console.log("Despues de guardar: ", response.data);
         toast.success("Barco agregado con éxito!");
      }).catch(function (error) {
         console.error(error);
         toast.error("Error creando el barco!");
      });

      setMostrarTabla(true);
      //console.log("Datos enviados por el form", nuevoBarco)

   }

   return (
      <div className='flex flex-col items-center justify-center'>
         <h2 className='text-2xl font-extrabold text-gray-800 my-3'>Crear Nuevo Barco</h2>
         <form ref={form} onSubmit={submitForm} className='flex flex-col space-y-2'>
            <label className='flex flex-col' htmlFor="serie">
               Serie
               <input
                  name="serie"
                  className='border border-gray-600 bg-gray-50 p-2 rounded-lg m-2'
                  type="number"
                  placeholder="123456"
                  min={111111}
                  max={999999}
                  required
               />
            </label>
            <label className='flex flex-col' htmlFor="nombre">
               Nombre
               <input
                  name="nombre"
                  className='border border-gray-600 bg-gray-50 p-2 rounded-lg m-2'
                  type="text"
                  placeholder="Catamaran"
                  required
               />
            </label>
            <label className='flex flex-col' htmlFor="marca">
               Marca
               <select
                  name="marca"
                  className='border border-gray-600 bg-gray-50 p-2 rounded-lg m-2'
                  defaultValue=''
                  required
               >
                  <option value='' disabled>Seleccione una marca</option>
                  <option>Yamaha</option>
                  <option>Tranding</option>
                  <option>MotorsOne</option>
                  <option>BlueBird</option>
                  <option>OceanBlue</option>
               </select>
            </label>
            <label className='flex flex-col' htmlFor="modelo">
               Modelo
               <input
                  name="modelo"
                  className='border border-gray-600 bg-gray-50 p-2 rounded-lg m-2'
                  type="number"
                  placeholder="2021"
                  min={1992}
                  max={2023}
                  required
               />
            </label>
            <button
               type="submit"
               className='col-span-2 bg-green-500 rounded-full p-2 shadow-md hover:bg-green-600 text-white'
/*                onClick={() => { enviarAlBackend() }}
 */            >
               Guardar Barco
            </button>
         </form>
      </div>
   )
}

export default Barcos;