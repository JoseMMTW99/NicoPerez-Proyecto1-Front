import React from 'react'
import './perfil.css'

function Perfil() {

  const idUser = localStorage.getItem('id')
  // if (idUser === null) {
  //     window.location.replace('/')
  // }

  return (
    <div className="d-flex align-items-center" style={{ height: "100vh" }}>
      <div className="container">
        <div className="row p-5 ms-2 mx-2" id='tarjeta'>
          <div className='col-md-6'>
            <h1 className='pt-3'>Nombre y Apellido de Usuario</h1>
            <ul className='pt-3'>
              <li>Edificio: Nombre de edificio</li>
              <li>Piso: Número de piso</li>
              <li>Puerta: Número o Letra de Puerta</li>
            </ul>
            <button className="col-12 rounded p-1 mt-3 btn btn-dark p-2 btn-lg">Descargar comprobante</button>
          </div>
          <div className='col-md-6'>
            <div className="d-flex flex-column">
              <button className="col-12 col-md-7 rounded p-1 mt-3 btn btn-dark p-2 btn-lg ms-auto">Cambiar Contraseña</button>
              <button className="col-12 col-md-7 rounded p-1 mt-3 btn btn-dark p-2 btn-lg ms-auto">Cerrar Sesión</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Perfil