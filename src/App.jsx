import React from 'react'
import { Route, Routes } from "react-router-dom";
import Inicio from './Pages/Inicio/Inicio';
import './app.css'
import Perfil from './Pages/Perfil/Perfil';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/Perfil" element={<Perfil />} />
      </Routes>
    </>
  );
}

export default App;
