import React, { useState, useEffect } from 'react'
import './perfil.css'
import axios from 'axios'

function Perfil() {

  const [users, setUsers] = useState({})
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const idUser = localStorage.getItem('id')
  if (idUser === null) {
      window.location.replace('/')
  }

  useEffect(() =>{
    if (idUser !== null){
        axios.get(`https://serpa-administracion-jose-martinez-teran.up.railway.app/users/${idUser}`)
        .then((response) =>{
            setUsers(response.data);
        })
        .catch((error) =>{
            console.error(error);
        })
    }
}, [idUser])

const downloadPdf = async () => {
  setIsLoading(true);
  try {
    const response = await axios.get(`https://serpa-administracion-jose-martinez-teran.up.railway.app/uploads/getpdf/${idUser}`, {
      responseType: 'blob',
    });
    console.log(response);

    if(response.status === 200){
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Comprobante - Serpa.pdf');
      document.body.appendChild(link);
      link.click();
      setIsLoading(false);
    } else if (response.status === 206){
      setIsLoading(false);
      setError(true)
    }
  } catch (error) {
    console.log(error);
  }
};

const cerrarSesion = () => {
  localStorage.removeItem('idUsuarioLogeado');
  localStorage.removeItem('token');
  window.location.replace('/')
}

const cambiarContraseña = () => {
  window.location.replace('/CambiarContraseña')
}

  return (
    <>
    <div className="d-flex align-items-center" style={{ height: "100vh" }}>
      <div className="container">
        <div className="row p-5 ms-2 mx-2" id='tarjeta'>
          <div className='col-md-6'>
            <h1 className='pt-3'>{users.name} {users.surname}</h1>
            <ul className='pt-3'>
              <li>Edificio: {users.edificio}</li>
              <li>Piso: {users.piso}</li>
              <li>Puerta: {users.puerta}</li>
            </ul>
            {isLoading ? ( // show spinner if loading is true
                <div className="d-flex justify-content-center mt-3">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Descargando...</span>
                  </div>
                </div>
              ) : (
                <button className="col-12 rounded p-1 mt-3 btn btn-dark p-2 btn-lg" onClick={downloadPdf}>
                  Descargar comprobante
                </button>
              )}
              {
                error ? <div className='text-center mt-3 fs-6'>¡No tienes ningún comprobante para descargar!</div> : <></>
              }
          </div>
          <div className='col-md-6'>
            <div className="d-flex flex-column">
              <button className="col-12 col-md-7 rounded p-1 mt-3 btn btn-dark p-2 btn-lg ms-auto" onClick={cambiarContraseña}>Cambiar Contraseña</button>
              <button className="col-12 col-md-7 rounded p-1 mt-3 btn btn-dark p-2 btn-lg ms-auto" onClick={cerrarSesion}>Cerrar Sesión</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Perfil