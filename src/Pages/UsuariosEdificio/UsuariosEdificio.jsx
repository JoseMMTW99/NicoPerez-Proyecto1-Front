import React from "react";

const UsuariosEdificio = () =>{
    return(
        <div>
            <div className="d-flex align-items-center" style={{ height: "100vh" }}>
                <div className="container">
                    <div className="row p-5 ms-2 mx-2" id='tarjeta'>
                        <h1 className='text-center p-3'>Edificio (Nombre edificio)</h1>
                        <table className="text-center">
                            <thead>
                                <tr>
                                    <th className="border fs-4">Nombre de usuario</th>
                                    <th className="border fs-4">Comprobante</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border">Nombre Usuario</td>
                                    <td className="border"><button className="btn btn-dark rounded m-1">Cargar PDF</button></td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="w-100 btn btn-dark rounded p-2 mt-3 btn-lg">Volver a Administración</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsuariosEdificio;