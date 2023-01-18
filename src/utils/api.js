import axios from 'axios';

/* Barcos */
export const obtenerBarcos = async (setBarcos, setEjecutarConsulta) => {
   const options = { method: 'GET', url: 'http://localhost:3001/ship' };

   await axios.request(options).then(function (response) {
      console.log("Barcos: ", response.data.items);
      setBarcos(response.data.items);
   }).catch(function (error) {
      console.error(error);
   });
   setEjecutarConsulta(false)
}

/* Categorias */
export const obtenerCategorias = async (setCategorias, setEjecutarConsulta) => {
   const options = { method: 'GET', url: 'http://localhost:3001/category' }

   await axios.request(options).then(function (response) {
      console.log("Categorias: ", response.data)
      setCategorias(response.data.items)
   }).catch(function (error) {
      console.error(error)
   })
   setEjecutarConsulta(false)
}

/* Usuarios */
export const obtenerUsuarios = async (setUsuarios, setEjecutarConsulta) => {
   const options = { method: 'GET', url: 'http://localhost:3001/user' }

   await axios
      .request(options)
      .then(function (response) {
         setUsuarios(response.data.items)
      })
      .catch(function (error) {
         console.error(error)
      })
   setEjecutarConsulta(false)
}