import React from "react";
import './administrador.css'

const Administrador = () => {

    const tokenAdmin = localStorage.getItem('token')
    // if (tokenAdmin === null) {
    //     window.location.replace('/')
    // }

    return (
        <div>
            <div className="d-flex align-items-center" style={{ height: "100vh" }}>
                <div className="container">
                    <div className="row p-5 ms-2 mx-2" id='tarjeta'>
                        <h1 className='text-center p-3'>Administración</h1>
                        <div className="col-md-6 mt-2">
                            <div className="card-body border rounded">
                                <h3 className="card-title text-center m-2">Nombre del edificio</h3>
                            </div>
                        </div>
                        <div className="col-md-6 mt-2">
                            <div className="card-body border rounded">
                                <h3 className="card-title text-center m-2">Nombre del edificio</h3>
                            </div>
                        </div>
                        <div className="col-md-6 mt-2">
                            <div className="card-body border rounded">
                                <h3 className="card-title text-center m-2">Nombre del edificio</h3>
                            </div>
                        </div>
                        <button className="w-100 btn btn-dark rounded p-2 mt-4 btn-lg">Crear Usuario</button>
                        <button className="w-100 btn btn-dark rounded p-2 mt-2 btn-lg">Cerrar Sesión</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Administrador;