import React from "react";

const CrearUsuario = () => {
    return (
        <div className="d-flex align-items-center" style={{ height: "100vh" }}>
            <div className="container">
                <div className="row justify-content-center p-5 ms-2 mx-2" id='tarjeta'>
                    <h1 className='text-center p-3'>Crear Usuario</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" className="form-control rounded" id="nombre" name="nombre" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellido">Apellido:</label>
                            <input type="text" className="form-control rounded" id="apellido" name="apellido" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="documento">Documento:</label>
                            <input type="text" className="form-control rounded" id="documento" name="documento" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mail">Mail:</label>
                            <input type="text" className="form-control rounded" id="mail" name="mail" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="edificio">Edificio:</label>
                            <input type="text" className="form-control rounded" id="edificio" name="edificio" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="piso">Piso:</label>
                            <input type="text" className="form-control rounded" id="piso" name="piso" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="puerta">Puerta:</label>
                            <input type="text" className="form-control rounded" id="puerta" name="puerta" />
                        </div>
                        <button className="w-100 btn btn-dark rounded p-2 mt-3 btn-lg">Crear Usuario</button>
                        <button className="w-100 btn btn-dark rounded p-2 mt-5 btn-lg">Volver a Administración</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CrearUsuario;