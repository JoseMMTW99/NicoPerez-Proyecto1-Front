import React, { useState, useEffect } from 'react'
import './administrador.css'
import axios from 'axios'
import CardEdificio from '../../Components/CardEdificio/CardEdificio'

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

    return (
        <div>
            <div className="d-flex align-items-center" style={{ height: "100vh" }}>
                <div className="container">
                    <div className="row p-5 ms-2 mx-2">
                        <h1 className='text-center p-3'>Administración</h1>
                        {
                            edificios.sort((a, b) => (a.name > b.name) ? 1 : -1).map((edificio) => (<CardEdificio key={edificio._id} edificio={edificio} />))
                        }
                        <a href='/CrearEdificio'><button className="w-100 btn btn-dark rounded p-2 mt-4 btn-lg">Crear edificio</button></a>
                        <a onClick={cerrarSesion}><button className="w-100 btn btn-dark rounded p-2 mt-2 btn-lg">Cerrar Sesión</button></a>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Administrador;