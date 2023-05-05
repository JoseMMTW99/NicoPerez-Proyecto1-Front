import React, { useState, useEffect } from 'react'
import './administrador.css'
import axios from 'axios'
import CardEdificio from '../../Components/CardEdificio/CardEdificio'
import icono from '../../assets/building.png'


const Administrador = () => {

    const [edificios, setEdificios] = useState([])

    const tokenAdmin = localStorage.getItem('token')
    if (tokenAdmin === null) {
        window.location.replace('/')
    }
  
    const cerrarSesion = () => {
      localStorage.removeItem('idUsuarioLogeado');
      localStorage.removeItem('token');
      window.location.replace('/')
    }
  
    useEffect(() =>{
        const response = axios.get(`https://serpa-administracion-jose-martinez-teran.up.railway.app/edificio/get-edificio`)
        .then((response) =>{
            setEdificios(response.data);
        })
        .catch((error) =>{
            console.error(error);
        })
    }, [tokenAdmin])
    
    document.body.classList.add('bg-white');

    return (
        <>
        <div className="mt-5 cajaGrandeEdificios mx-auto">
            <div className='w-100'>
                <h1 className='tituloEdificios'>MIS EDIFICIOS</h1>
            </div>
            <div className="cajaEdificiosBorde w-100 d-flex flex-wrap px-5">                
                {
                    edificios.sort((a, b) => (a.name > b.name) ? 1 : -1).map((edificio) => (<CardEdificio key={edificio._id} edificio={edificio} />))
                }
            </div>
            {/* <a href='/CrearEdificio'><button className="w-100 btn btn-dark rounded p-2 mt-4 btn-lg">Crear edificio</button></a>
            <a onClick={cerrarSesion}><button className="w-100 btn btn-dark rounded p-2 mt-2 btn-lg">Cerrar Sesión</button></a> */}
        </div>
        {/* <div className="footerAdministrador">
            <h3 className='fs-4'>Desarrollado por Uppering</h3>
        </div> */}
        </>
    )
}


export default Administrador;