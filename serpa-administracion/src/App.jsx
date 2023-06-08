import React from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import Inicio from './Pages/Inicio/Inicio';
import './App.css'
import Perfil from './Pages/Perfil/Perfil';
import Administrador from './Pages/Admininstrador/Administrador';
import CrearUsuario from './Pages/CrearUsuario/CrearUsuario';
import UsuariosEdificio from './Pages/UsuariosEdificio/UsuariosEdificio';
import CambiarContraseña from './Pages/CambiarContraseña/CambiarContraseña';
import CrearEdificio from './Pages/CrearEdificio/CrearEdificio';
import NavBar from './Components/NavBar/NavBar';
import CambiarContraseñaEmail from './Pages/CambiarContraseñaEmail/CambiarContraseñaEmail';
import CambiarContraseñaAdmin from './Pages/CambiarContraseñaAdmin/CambiarContraseñaAdmin';
import Footer from './Components/Footer/Footer';
import EditarUsuario from './Pages/EditarUsuario/EditarUsuario';

function App() {

  const location = useLocation();
  
  return (
    <>
      {location.pathname !== '/' && location.pathname !== '/Recuperar-contrase%C3%B1a' && !location.pathname.startsWith('/Recuperar-contrase%C3%B1a/') && <NavBar />}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Administracion" element={<Administrador />} />
        <Route path="/Crear/Usuario/:edificioName" element={<CrearUsuario   />} />
        <Route path="/Administracion/Editar/Usuario/:id/:edificioName" element={<EditarUsuario   />} />
        <Route path="/Edificio/:edificioName" element={<UsuariosEdificio />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/Administracion/Recuperar-contraseña/:id" element={<CambiarContraseñaAdmin />} />
        <Route path="/Recuperar-contraseña" element={<CambiarContraseñaEmail />} />
        <Route path="/Recuperar-contraseña/:token" element={<CambiarContraseña />} />
        <Route path="/Crear/Edificio" element={<CrearEdificio />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
