import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilaUsuariosEdificio from '../../Components/FilaUsuariosEdificio/FilaUsuariosEdificio'
import './usuariosEdificio.css'

const UsuariosEdificio = () =>{

    const [usuarios, setUsuarios] = useState([])
    const [usuariosPrint, setUsuariosPrint] = useState([])
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
            setUsuariosPrint(filteredUsuarios);
        })
        .catch((error) =>{
            console.error(error);
        })
    }, [edificio])

    const searchCoinciden = (busqueda) => {
        const resultados = usuarios.filter(
          (usuario) =>
            usuario.name.toUpperCase().includes(`${busqueda.toUpperCase()}`) ||
            usuario.surname.toUpperCase().includes(`${busqueda.toUpperCase()}`) ||
            usuario.dni.toLowerCase().includes(`${busqueda.toLowerCase()}`) ||
            usuario.piso.toLowerCase().includes(`${busqueda.toLowerCase()}`) ||
            usuario.puerta.toLowerCase().includes(`${busqueda.toLowerCase()}`) ||
            usuario.tipo.toLowerCase().includes(`${busqueda.toLowerCase()}`) ||
            usuario.baulera.toLowerCase().includes(`${busqueda.toLowerCase()}`)
        );
        setUsuariosPrint(resultados);
      };

    return(
        <>
            <div className='d-flex justify-content-center m-5'>
                <div className="pt-5 pb-5 w-100">
                    <h1 className='text-center mb-3 text-white tituloEdificio'>{edificio}</h1>
                    <div className="col-11 col-sm-11 col-md-10 col-lg-7 col-xl-7 col-xxl-7 mx-auto">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control barraBusqueda"
                                onInput={(event) => searchCoinciden(event.target.value)}
                                placeholder="Buscar..."
                                aria-label="Search"
                                aria-describedby="search-button"
                            />
                        </div>
                    </div>
                    <div className='tabla-usuarios'>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr className='text-center'>
                                        <th className="fs-4">Cliente</th>
                                        <th className="fs-4">Correo</th>
                                        <th className="fs-4">Documento</th>
                                        <th className="fs-4">Piso</th>
                                        <th className="fs-4">Puerta</th>
                                        <th className="fs-4">Tipo</th>
                                        <th className="fs-4">Baulera</th>
                                        <th className="fs-4">Subir Comprobante</th>
                                        <th className="fs-4">Desc. Comp.</th>
                                        <th className="fs-4">Camb. Contraseña</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {
                                    usuariosPrint.sort((a, b) => a.piso - b.piso).map((usuario) => ( <FilaUsuariosEdificio key={usuario._id} usuario={usuario}/>))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                        <a href='/CrearUsuario'><button className="btn-edificio mt-2">Crear usuario</button></a>
                        <a href='/Administracion'><button className="btn-edificio-2 mt-2 ms-2">Volver a Administración</button></a>
                </div>
            </div>
        </>
    )
}

export default UsuariosEdificio;


{/* <div className="" style={{ height: "100vh" }}>
<div className="container">
    <div className="p-5 ms-2 mx-2">
        <h1 className='text-center p-3'>{edificio}</h1>
                                <table className="table table-responsive text-center">
                                    <thead>
                                        <tr>
                                            <th className="fs-4">Cliente</th>
                                            <th className="fs-4">Correo</th>
                                            <th className="fs-4">Documento</th>
                                            <th className="fs-4">Piso</th>
                                            <th className="fs-4">Puerta</th>
                                            <th className="fs-4">Tipo</th>
                                            <th className="fs-4">Baulera</th>
                                            <th className="fs-4">Comprobante</th>
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
</div> */}