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

function App() {

  const location = useLocation();
  
  return (
    <>
      {location.pathname !== '/' && <NavBar />}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Administracion" element={<Administrador />} />
        <Route path="/CrearUsuario" element={<CrearUsuario   />} />
        <Route path="/Edificio" element={<UsuariosEdificio   />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/CambiarContraseña" element={<CambiarContraseña />} />
        <Route path="/CrearEdificio" element={<CrearEdificio />} />
      </Routes>
    </>
  );
}

export default App;
