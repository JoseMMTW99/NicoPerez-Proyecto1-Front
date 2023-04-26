import React from 'react'
import './perfil.css'

function Perfil() {

    const logeado = localStorage.getItem('logeado')

    // if (!logeado) {
    //     window.location.replace('/')
    // }

  return (
      <div className="d-flex align-items-center" style={{ height: "90vh" }}>
            <div className="container">
                <div className="row justify-content-center p-5 ms-2 mx-2" id='tarjeta'>
                      <h3 className='text-center p-3'>Nombre y Apellido de Usuario</h3>
                      <ul className='pt-5 ms-5'>
                        <li>Edificio: Nombre de edificio</li>
                        <li>Piso: Número de piso</li>
                        <li>Puerta: Número o Letra de Puerta</li>
                      </ul>
                      <button className="col-md-3 rounded p-1 mt-3">Descargar PDF</button>
                </div>
            </div>
        </div>
  )
}

export default Perfil