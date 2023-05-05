import React, { useState, useEffect } from 'react'
import logo from '../../assets/LogoBlanco.png'
import PerfilNavBar from '../PerfilNavBar/PerfilNavBar'
import './navBar.css'
import axios from 'axios'

function NavBar() {

    const [users, setUsers] = useState({})
    const idUser = localStorage.getItem('id')
    if (idUser === null) {
        window.location.replace('/')
    }

    const cerrarSesion = () => {
        localStorage.removeItem('idUsuarioLogeado');
        localStorage.removeItem('token');
        window.location.replace('/')
    }

    useEffect(() => {
        if (idUser !== null) {
            axios.get(`https://serpa-administracion-jose-martinez-teran.up.railway.app/users/${idUser}`)
                .then((response) => {
                    setUsers(response.data);
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }, [idUser])

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid p-0 mb-2">
                    <img className="navbar-brand col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3 ps-2" src={logo} />
                    <button className="navbar-toggler me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 pe-2">
                            <PerfilNavBar usuario={users} />
                        </ul>
                        <div className='divBotonAgregarEdificioNavBar espaciadoNavBarCollapse'>
                            <a href='/CrearEdificio'>
                                <button className="botonAgregarEdificioNavBar pt-lg-1 pb-lg-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                    Nuevo Edificio
                                </button>
                            </a>
                        </div>
                        <div className='divBotonAgregarEdificioNavBar'>
                            <button className="botonCerrarSesionNavBar ps-3 pt-2 pb-2" onClick={cerrarSesion}>
                                Salir
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar