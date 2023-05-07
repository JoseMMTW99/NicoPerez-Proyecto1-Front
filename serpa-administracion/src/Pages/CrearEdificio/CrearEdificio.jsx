import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { createRouter } from '@remix-run/router';
import Cookies from 'js-cookie'

const CrearEdificio = () => {

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const name = watch("name", "");

    const tokenAdmin = Cookies.get('token');
    if (tokenAdmin === undefined) {
        window.location.replace('/')
    }

    const onSubmit = async (data) => {
        setLoading(true);
        const respuesta = await axios.post(
            `https://serpa-administracion-jose-martinez-teran.up.railway.app/edificio/crear-edificio`,
            {
                name: data.name.trim(),
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
                <div className="row justify-content-center p-5 ms-2 mx-2">
                    <h1 className='text-center p-3'>Crear edificio</h1>                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="text">Nombre del Edificio</label>
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
                            <div className="form-group mt-3">
                            <label htmlFor="name2">Repetir nombre</label>
                            <input
                                type="name2"
                                className={`form-control form-control-lg ${errors.name2 ? "is-invalid" : ""} mt-2`}
                                {...register("name2", {
                                    required: true,
                                    validate: value => value === name || "Los nombres no coinciden."
                                })}
                            />
                            {errors.name2 && errors.name2.type === "required" && (
                                <div className="invalid-feedback">Nombre requerida</div>
                            )}
                            {errors.name2 && errors.name2.message && (
                                <div className="invalid-feedback">{errors.name2.message}</div>
                            )}
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

export default CrearEdificio;