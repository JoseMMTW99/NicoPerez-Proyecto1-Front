import React from 'react'
import { Route, Routes } from "react-router-dom";
import Inicio from './Pages/Inicio/Inicio';
import './app.css'
import Perfil from './Pages/Perfil/Perfil';
import Administrador from './Pages/Admininstrador/Administrador';
import CrearUsuario from './Pages/CrearUsuario/CrearUsuario';
import UsuariosEdificio from './Pages/UsuariosEdificio/UsuariosEdificio';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Administracion" element={<Administrador />} />
        <Route path="/CrearUsuario" element={<CrearUsuario   />} />
        <Route path="/Edificio" element={<UsuariosEdificio   />} />
        <Route path="/Perfil" element={<Perfil />} />
      </Routes>
    </>
  );
}

export default App;
