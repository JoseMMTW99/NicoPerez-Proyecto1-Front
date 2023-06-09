import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import icono from '../../assets/pdf.png'
import SubirArchivoUser from '../../Components/SubirArchivoUser/SubirArchivoUser'
import SubirArchivo from '../../Components/SubirArchivo/SubirArchivo'
import axios from 'axios'
import Cookies from 'js-cookie'
import CardComprobanteUsuario from '../../Components/CardComprobanteUsuario/CardComprobanteUsuario'
import CardReciboUsuario from '../../Components/CardReciboUsuario/CardReciboUsuario'

function ComprobantesRecibosAdmin() {

    const [users, setUsers] = useState({})
    const [comprobantes, setComprobantes] = useState([])
    const [recibos, setRecibos] = useState([])
    const { id } = useParams();
    const idUser = id
    const tokenAdmin = Cookies.get('token');
    
    if (tokenAdmin === undefined) {
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

          const getPdfs = async () => {
            const response = await axios.get(`https://serpa-administracion-jose-martinez-teran.up.railway.app/uploads/getpdf/${idUser}`);
            setComprobantes(response.data.comprobantes);
            setRecibos(response.data.recibos);
          }

          getPdfs()
      }
  }, [idUser])

  const handleGoBack = () => {
    window.location.replace(`/Administracion/Perfil/${idUser}`)
  };

  return (
    <>
        <div className='container-fluid p-0'>
            <div className='divBotonVolverAtras mt-4 ms-4 d-flex justify-content-start'>                        
                <button className="botonAgregarEdificio px-2 py-0" onClick={handleGoBack}>
                    <i className="bi bi-arrow-left-short"></i>
                </button>
            </div>
        </div>
        <div className='divComprobantes'>
            <div className='d-flex flex-wrap contenedorTituloYSubirDocumento'>
                <h1>RECIBOS</h1>
                <div className='d-flex justify-content-center'>
                    <h3>SUBE UN RECIBO<i className="bi bi-arrow-right-short fs-5 ms-1"></i></h3>
                    <SubirArchivo usuario={users}/>
                </div>
            </div>
            <div className='contenedorComprobantes'>
                { recibos === undefined ? (
                    <div className='noHayDocumento'>No hay comprobantes subidos.</div>
                ) : (
                    recibos.map(comprobante => (
                        <CardReciboUsuario comprobante={comprobante} user={users} key={comprobante.id}/>
                    ))
                )}
            </div>
        </div>
        <div className='divComprobantes'>
            <div className='d-flex flex-wrap contenedorTituloYSubirDocumento'>
                <h1>COMPROBANTES DE PAGO</h1>
                <div className='d-flex justify-content-center'>
                    <h3>SUBE UN COMPROBANTE<i className="bi bi-arrow-right-short fs-5 ms-1"></i></h3>
                    <SubirArchivoUser usuario={users}/>
                </div>
            </div>
            <div className='contenedorComprobantes'>
                {comprobantes === undefined ? (
                    <div className='noHayDocumento'>No hay recibos subidos.</div>
                ) : (comprobantes.map(comprobante => (
                    <CardReciboUsuario comprobante={comprobante} user={users} key={comprobante.id} />
                )))}
            </div>
        </div>
    </>
  )
}

export default ComprobantesRecibosAdmin