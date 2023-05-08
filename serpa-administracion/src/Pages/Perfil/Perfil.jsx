import React, { useState, useEffect } from 'react'
import './perfil.css'
import axios from 'axios'
import Cookies from 'js-cookie'

function Perfil() {

  const [users, setUsers] = useState({})
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const idUser = Cookies.get('id');
  if (idUser === undefined) {
      window.location.replace('/')
  }

  useEffect(() =>{
    if (idUser !== undefined){
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

    if (response.status === 200) {
      const date = new Date();
      const month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);

      const fileExtension = response.data.type.split('/')[1];

      const downloadFilename = `Comprobante Serpa - ${users.name} ${users.surname} - ${month}.${fileExtension}`;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', downloadFilename);
      document.body.appendChild(link);
      link.click();
      setIsLoading(false);
    } else if (response.status === 206) {
      setIsLoading(false);
      setError(true);
    }
    } catch (error) {
      console.error(error);
    }
  };

  const cerrarSesion = () => {
    Cookies.remove('id');
    Cookies.remove('token');
    window.location.replace('/')
  }

  const cambiarContraseña = () => {
    window.location.replace('/CambiarContraseña')
  }

    return (
      <>
        <div className='cardPerfil mx-auto pt-5 pb-5 px-2'>
          <div className='text-center'><h1 className='tituloPerfil'>Mi Perfil</h1></div>
          <div className='d-flex flex-column justify-content-center text-center'>
            <div>
              <i class="bi bi-buildings-fill text-muted fs-3"></i> Edificio {users.edificio}
            </div>
            <div>
              <i class="bi bi-door-closed-fill text-muted fs-3"></i> Piso {users.piso} | Puerta {users.puerta}
            </div>
            {isLoading ? (
              <div className="mt-3">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Descargando...</span>
                </div>
              </div>
            ) : (
              <div className='divBotonVolverAtras text-center mt-4'>
                <button className="botonAgregarEdificio p-2 fs-6" onClick={downloadPdf}>
                  <i className="bi bi-download me-2"></i>Comprobante
                </button>
              </div>
            )}
            {
              error ? <div className='text-center mt-3 fs-6'>¡No tienes ningún comprobante para descargar!</div> : <></>
            }
          </div>
        </div>
      </>
    )
  }

export default Perfil


{/* <div className="d-flex align-items-center">
<div className="container">
  <div className="row p-5 ms-2 mx-2">
    <div className='col-md-6'>
      <h1 className='pt-3'>{users.name} {users.surname}</h1>
      <ul className='pt-3'>
        <li>Edificio: {users.edificio}</li>
        <li>Piso: {users.piso}</li>
        <li>Puerta: {users.puerta}</li>
      </ul>
      {isLoading ? (
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
  </div>
</div>
</div> */}