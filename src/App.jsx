import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'styles/styles.css';

import PublicLayout from 'layouts/PublicLayout';
import AuthLayout from 'layouts/AuthLayout';
import PrivateLayout from 'layouts/PrivateLayout';
import Login from 'pages/auth/Login';
import Registro from 'pages/auth/Registro';
import Barcos from 'pages/admin/Barcos';
import Usuarios from 'pages/admin/Usuarios';
import Clientes from 'pages/admin/Clientes';
import Reservaciones from 'pages/admin/Reservaciones';
import Categorias from 'pages/admin/Categorias';
import Mensajes from 'pages/admin/Mensajes';
import IndexAdmin from 'pages/admin/Index';
import Index from 'pages/Index'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/auth' element={<AuthLayout />}>
            <Route path='registro' element={<Registro />} />
            <Route index element={<Login />} />
          </Route>
          <Route path='/admin' element={<PrivateLayout />}>
            <Route path='barcos' element={<Barcos />} />
            <Route path='usuarios' element={<Usuarios />} />
            <Route path='clientes' element={<Clientes />} />
            <Route path='reservaciones' element={<Reservaciones />} />
            <Route path='categorias' element={<Categorias />} />
            <Route path='mensajes' element={<Mensajes />} />
            <Route index element={<IndexAdmin />} />
          </Route>
          <Route path='/' element={<PublicLayout />}>
            <Route index element={<Index />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
