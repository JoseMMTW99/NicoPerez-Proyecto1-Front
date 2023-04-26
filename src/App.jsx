import React from 'react'
import { Route, Routes } from "react-router-dom";
import Inicio from './Pages/Inicio/Inicio';
import './app.css'
import Perfil from './Pages/Perfil/Perfil';
import Administrador from './Pages/Admininstrador/Administrador';
import CrearUsuario from './Pages/CrearUsuario/CrearUsuario';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/Administrador" element={<Administrador />} />
        <Route path="/CrearUsuario" element={<CrearUsuario   />} />
      </Routes>
    </>
  );
}

export default App;
