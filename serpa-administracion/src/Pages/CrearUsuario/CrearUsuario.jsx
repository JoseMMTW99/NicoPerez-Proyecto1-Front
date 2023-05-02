import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { createRouter } from '@remix-run/router';

const CrearUsuario = () => {

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const edificio = localStorage.getItem('edificio')

    if (edificio === null) {
        window.location.replace('/Administracion')
    }

    const tokenAdmin = localStorage.getItem('token')
    if (tokenAdmin === null) {
        window.location.replace('/')
    }

    const onSubmit = async (data) => {
        console.log('hola');
        setLoading(true);
        const respuesta = await axios.post(
            `https://serpa-administracion-jose-martinez-teran.up.railway.app/users/crear-user`,
            {
                name: data.name.trim(),
                surname: data.surname.trim(),
                email: data.email.trim().toLowerCase(),
                dni: data.dni.trim(),
                edificio: edificio,
                piso: data.piso.trim(),
                puerta: data.puerta.trim(),
                tipo: data.tipo,
                baulera: data.baulera.trim()
            }
        );
        if (respuesta.status === 200) {
            window.location.replace('/Administracion')
        }
        if (respuesta.status === 206) {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex align-items-center" style={{ height: "100vh" }}>
            <div className="container">
                <div className="row justify-content-center p-5 ms-2 mx-2" id='tarjeta'>
                    <h1 className='text-center p-3'>Crear usuario</h1>                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="text">Nombre</label>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg ${errors.name ? "is-invalid" : ""} mt-2`}
                                    {...register("name", {
                                        required: true,
                                        maxLength: 40,
                                    })}
                                />
                                {errors.name && errors.name.type === "required" && (
                                    <div className="invalid-feedback">Nombre requerido</div>
                                )}
                                {errors.name && errors.name.type === "maxLength" && (
                                    <div className="invalid-feedback">
                                        No puede contener más de 40 caracteres
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="text">Apellido</label>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg ${errors.surname ? "is-invalid" : ""} mt-2`}
                                    {...register("surname", {
                                        required: true,
                                        maxLength: 40,
                                    })}
                                />
                                {errors.surname && errors.surname.type === "required" && (
                                    <div className="invalid-feedback">Apellido requerido</div>
                                )}
                                {errors.surname && errors.surname.type === "maxLength" && (
                                    <div className="invalid-feedback">
                                        No puede contener más de 40 caracteres
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="text">Documento</label>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg ${errors.dni ? "is-invalid" : ""} mt-2`}
                                    {...register("dni", {
                                        required: true,
                                        maxLength: 40,
                                    })}
                                />
                                {errors.dni && errors.dni.type === "required" && (
                                    <div className="invalid-feedback">Documento requerido</div>
                                )}
                                {errors.dni && errors.dni.type === "maxLength" && (
                                    <div className="invalid-feedback">
                                        No puede contener más de 40 caracteres
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Correo Electrónico</label>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg ${errors.email ? "is-invalid" : ""} mt-2`}
                                    {...register("email", {
                                        required: true,
                                        pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i,
                                        maxLength: 40,
                                    })}
                                />
                                {errors.email && errors.email.type === "required" && (
                                    <div className="invalid-feedback">Correo requerido</div>
                                )}
                                {errors.email && errors.email.type === "pattern" && (
                                    <div className="invalid-feedback">Correo invalido</div>
                                )}
                                {errors.email && errors.email.type === "maxLength" && (
                                    <div className="invalid-feedback">
                                        No puede contener más de 40 caracteres
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="text">Piso</label>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg ${errors.piso ? "is-invalid" : ""} mt-2`}
                                    {...register("piso", {
                                        required: true,
                                        maxLength: 40,
                                    })}
                                />
                                {errors.piso && errors.piso.type === "required" && (
                                    <div className="invalid-feedback">Piso requerido</div>
                                )}
                                {errors.piso && errors.piso.type === "maxLength" && (
                                    <div className="invalid-feedback">
                                        No puede contener más de 40 caracteres
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="text">Puerta</label>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg ${errors.puerta ? "is-invalid" : ""} mt-2`}
                                    {...register("puerta", {
                                        required: true,
                                        maxLength: 40,
                                    })}
                                />
                                {errors.puerta && errors.puerta.type === "required" && (
                                    <div className="invalid-feedback">Puerta requerida</div>
                                )}
                                {errors.puerta && errors.puerta.type === "maxLength" && (
                                    <div className="invalid-feedback">
                                        No puede contener más de 40 caracteres
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="text">Baulera</label>
                                <input
                                    type="text"
                                    className={`form-control form-control-lg ${errors.baulera ? "is-invalid" : ""} mt-2`}
                                    {...register("baulera", {
                                        required: true,
                                        maxLength: 40,
                                    })}
                                />
                                {errors.baulera && errors.baulera.type === "required" && (
                                    <div className="invalid-feedback">Campo requerido</div>
                                )}
                                {errors.baulera && errors.baulera.type === "maxLength" && (
                                    <div className="invalid-feedback">
                                        No puede contener más de 40 caracteres
                                    </div>
                                )}
                            </div>
                            <div className="form-group mt-1">
                                <label htmlFor="text">Tipo</label>
                                <select  className="form-select form-select-lg mt-2"
                                    {...register("tipo", { required: true })}
                                    id="tipo"
                                    name="tipo"
                                    >
                                    <option className='text-dark' value="">Seleccionar</option>
                                    <option className='text-dark' value="Departamento">Departamento</option>
                                    <option className='text-dark' value="Local">Local</option>
                                    <option className='text-dark' value="Oficina">Oficina</option>
                                    <option className='text-dark' value="Cochera">Cochera</option>
                                </select>
                            </div>
                        <button className="w-100 btn btn-dark rounded p-2 mt-3 btn-lg">
                        {loading ? (
                            <span
                                className="spinner-border spinner-border-sm mr-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            "Crear"
                        )}
                        </button>
                    </form>
                    <a href='/Administracion'><button className="w-100 btn btn-dark rounded p-2 mt-5 btn-lg">Volver a Administración</button></a>
                </div>
            </div>
        </div>
    )
}

export default CrearUsuario;