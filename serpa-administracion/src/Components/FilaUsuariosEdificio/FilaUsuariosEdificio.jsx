import React, { useState, useEffect } from 'react'
import SubirArchivo from '../SubirArchivo/SubirArchivo'
import axios from 'axios'
import './FilaUsuariosEdificio.css'

function FilaUsuariosEdificio(usuario) {

    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const downloadPdf = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://serpa-administracion-jose-martinez-teran.up.railway.app/uploads/getpdf/${usuario.usuario._id}`, {
          responseType: 'blob',
        });
    
        if (response.status === 200) {
          const date = new Date();
          const month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);
    
          const fileExtension = response.data.type.split('/')[1];
    
          const downloadFilename = `Comprobante Serpa ${usuario.usuario.name} ${month}.${fileExtension}`;
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

    return (
        <>
            <tr>
                <td className="border">{usuario.usuario.name} {usuario.usuario.surname}</td>
                <td className="border">{usuario.usuario.email}</td>
                <td className="border">{usuario.usuario.dni}</td>
                <td className="border">{usuario.usuario.piso}</td>
                <td className="border">{usuario.usuario.puerta}</td>
                <td className="border">{usuario.usuario.tipo}</td>
                <td className="border">{usuario.usuario.baulera}</td>
                <td className="border"><SubirArchivo  usuario={usuario.usuario}/></td>
                <td className='border'>
                {isLoading ? (
                    <div className="d-flex justify-content-center mt-3">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Descargando...</span>
                    </div>
                    </div>
                ) : (
                    <button className="botonDescargarAdmin" onClick={downloadPdf}>
                        <i className="bi bi-download"></i>
                    </button>
                )}
                {
                    error ? <div className='text-center text-muted fs-6'>¡No hay comprobante!</div> : <></>
                }
                </td>
            </tr>
            
        </>
    )
}

export default FilaUsuariosEdificio