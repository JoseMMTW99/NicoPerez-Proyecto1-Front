import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilaUsuariosEdificio from '../../Components/FilaUsuariosEdificio/FilaUsuariosEdificio'

const UsuariosEdificio = () =>{

    const [usuarios, setUsuarios] = useState([])
    const edificio = localStorage.getItem('edificio')

    const tokenAdmin = localStorage.getItem('token')
    if (tokenAdmin === null) {
        window.location.replace('/')
    }

    useEffect(() =>{
        const response = axios.get(`https://serpa-administracion-jose-martinez-teran.up.railway.app/users/obtener-users`)
        .then((response) =>{
            const filteredUsuarios = response.data.filter((usuario) => usuario.edificio === edificio);
            setUsuarios(filteredUsuarios);
        })
        .catch((error) =>{
            console.error(error);
        })
    }, [edificio])

    return(
        <>
            <div>
                <div className="d-flex align-items-center" style={{ height: "100vh" }}>
                    <div className="container">
                        <div className="row p-5 ms-2 mx-2" id='tarjeta'>
                            <h1 className='text-center p-3'>{edificio}</h1>
                            <table className="table table-responsive text-center">
                                <thead>
                                    <tr>
                                        <th className="border fs-4">Cliente</th>
                                        <th className="border fs-4">Correo</th>
                                        <th className="border fs-4">Piso</th>
                                        <th className="border fs-4">Puerta</th>
                                        <th className="border fs-4">Comprobante</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    usuarios.sort((a, b) => a.piso - b.piso).map((usuario) => ( <FilaUsuariosEdificio key={usuario._id} usuario={usuario}/>))
                                    }
                                </tbody>
                            </table>
                            <a href='/CrearUsuario'><button className="w-100 btn btn-dark rounded p-2 mt-4 btn-lg">Crear usuario</button></a>
                            <a href='/Administracion'><button className="w-100 btn btn-dark rounded p-2 mt-3 btn-lg">Volver a Administración</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UsuariosEdificio;