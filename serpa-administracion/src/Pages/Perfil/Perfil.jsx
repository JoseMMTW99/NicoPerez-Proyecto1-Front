import React, { useState, useEffect } from 'react'
import './perfil.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import SubirArchivoUser from '../../Components/SubirArchivoUser/SubirArchivoUser'

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
        axios.get(`http://localhost:8000/users/${idUser}`)
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
    const response = await axios.get(`http://localhost:8000/uploads/getpdf/${idUser}`, {
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
      <div style={{ height: "60vh" }}>
        <div className='cardPerfil mx-auto pt-5 pb-5 px-2' >
          <div className='text-center'><h1 className='tituloPerfil'>Mi Perfil</h1></div>
          <div className='text-center mb-4'><h3 className='fs-6 text-muted'>{users.tipo}</h3></div>
          <div className='d-flex flex-column justify-content-center text-center'>
            <div>
              <i className="bi bi-buildings-fill text-muted fs-3"></i> Edificio {users.edificio}
            </div>
            <div>
              <i className="bi bi-door-closed-fill text-muted fs-3"></i> Piso {users.piso} | Puerta {users.puerta}
            </div>
            <div>
              <a href="/Perfil/Documentos">
                <button className='botonDocumentosPerfil'>
                  VER DOCUMENTOS
                </button>
              </a>
            </div>
            {/* {isLoading ? (
              <div className="mt-3">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Descargando...</span>
                </div>
              </div>
            ) : (
              <div className='divBotonVolverAtras text-center mt-4'>
                <button className="botonAgregarEdificio p-2 fs-6" onClick={downloadPdf}>
                  <i className="bi bi-download me-2"></i>Recibo
                </button>
              </div>
            )}
            {
              error ? <div className='text-center mt-3 fs-6'>¡No tienes ningún recibo para descargar!</div> : <></>
            }
            <SubirArchivoUser usuario={users}/> */}
          </div>
        </div>
      </div>
    )
  }

export default Perfil