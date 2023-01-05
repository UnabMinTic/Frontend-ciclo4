import { useEffect } from "react"

const Categorias = () => {
   useEffect(() => {
      console.log('Hola, me muestro a cargar la página!');
   }, [])

   return (
      <div>Categorias</div>
   )
}

export default Categorias