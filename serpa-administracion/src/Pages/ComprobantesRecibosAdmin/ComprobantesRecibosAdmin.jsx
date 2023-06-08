import React, { useState, useEffect } from 'react'
import icono from '../../assets/pdf.png'
import SubirArchivoUser from '../../Components/SubirArchivoUser/SubirArchivoUser'
import SubirArchivo from '../../Components/SubirArchivo/SubirArchivo'
import axios from 'axios'
import Cookies from 'js-cookie'

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
          axios.get(`http://localhost:8000/users/${idUser}`)
          .then((response) =>{
              setUsers(response.data);
          })
          .catch((error) =>{
              console.error(error);
          })

          const getPdfs = async () => {
            const response = await axios.get(`http://localhost:8000/uploads/getpdf/${idUser}`);
            setComprobantes(response.data.comprobantes);
            setRecibos(response.data.recibos);
          }

          getPdfs()
      }
  }, [idUser])

  return (
    <>
        <div className='divComprobantes'>
            <div className='d-flex justify-content-between'>
                <h1>RECIBOS</h1>
                <div className='d-flex justify-content-center'>
                    <h3>SUBE UN RECIBO<i className="bi bi-arrow-right-short fs-5 ms-1"></i></h3>
                    <SubirArchivo usuario={users}/>
                </div>
            </div>
            <div className='contenedorComprobantes'>
                {recibos.length === 0 ? (
                    <div className='noHayDocumento'>No hay comprobantes subidos.</div>
                ) : (
                    recibos.map(comprobante => (
                        <CardComprobanteUsuario comprobante={comprobante} user={users} key={comprobante.id}/>
                    ))
                )}
            </div>
        </div>
        <div className='divComprobantes'>
            <div className='d-flex justify-content-between'>
                <h1>COMPROBANTES DE PAGO</h1>
                <div className='d-flex justify-content-center'>
                    <h3>SUBE UN COMPROBANTE<i className="bi bi-arrow-right-short fs-5 ms-1"></i></h3>
                    <SubirArchivoUser usuario={users}/>
                </div>
            </div>
            <div className='contenedorComprobantes'>
            {   comprobantes.length === 0 ? (
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