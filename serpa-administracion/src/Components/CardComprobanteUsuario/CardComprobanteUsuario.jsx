import React, { useState, useEffect } from 'react'
import icono from '../../assets/pdf.png'
import axios from 'axios'
import Cookies from 'js-cookie'

function CardComprobanteUsuario(props) {

    const comprobante = props.comprobante
    const users = props.user
    const [isLoading, setIsLoading] = useState(false);

    const downloadPdf = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`http://localhost:8000/uploads/getpdf-especifico/${comprobante.id}`,
          {
            responseType: 'blob',
          }
          );
          if (response.status === 200) {    
            const fileExtension = response.data.type.split('/')[1];
      
            const downloadFilename = `Comprobante Serpa - ${users.name} ${users.surname} - ${comprobante.date}.${fileExtension}`;
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', downloadFilename);
            document.body.appendChild(link);
            link.click();
            setIsLoading(false);
          } else if (response.status === 206) {
            setIsLoading(false);
          }
          } catch (error) {
            console.error(error);
          }
    };

    return (
        <>
        <div className='cardComprobante'>
            <div className='imagenPDFComprobante'><img src={icono} alt="Comprobante Serpa Administración" /></div>
            <div className='fechaCardComprobante'>{comprobante.date}</div>
            <div className='d-flex justify-content-end'>
                <div className='botonDescargarCardComprobante'>
                    <button onClick={downloadPdf}>
                        {isLoading ? (
                            <span
                                className="spinner-border spinner-border-sm mr-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            <>
                            <i className="bi bi-download"></i>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default CardComprobanteUsuario