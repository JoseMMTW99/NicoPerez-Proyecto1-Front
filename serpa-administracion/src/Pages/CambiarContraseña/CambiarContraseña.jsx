import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";

// CAMBIAR LA CONTRASEÑA MEDIANTE PARAMETRO DE URL

const CambiarContraseña = () => {

    const [loading, setLoading] = useState(false);
    const [errorMensaje, setErrorMensaje] = useState("");
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const password = watch("password", "");

    const onSubmit = async (data) => {
        setLoading(true);
        const respuesta = await axios.patch(
            `https://serpa-administracion-jose-martinez-teran.up.railway.app/users/cambiar-contrasena`,
            {
                id: idUser,
                password: data.password
            }
        );
        setLoading(false);
        window.location.replace('/Perfil')
    };

    return (
        <div className="d-flex align-items-center" style={{ height: "100vh" }}>
            <div className="container">
                <div className="row justify-content-center p-5 ms-2 mx-2">
                    <h1 className='text-center p-3'>Cambiar contraseña</h1>                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group mt-3">
                            <label htmlFor="password">Nueva contraseña</label>
                            <input
                                type="password"
                                className={`form-control form-control-lg ${errors.password ? "is-invalid" : ""} mt-2`}
                                placeholder="Escriba su contraseña"
                                {...register("password", { 
                                    required: true,
                                    pattern: /^[a-z0-9]{6,25}$/i,
                                    maxLength: 25, 
                                    minLength: 6, 
                                })}
                            />
                            {errors.password && errors.password.type === "required" && (
                                <div className="invalid-feedback">Contraseña requerida</div>
                            )}
                            {errors.password && errors.password.type === "pattern" && (
                                <div className="invalid-feedback">Contraseña invalida</div>
                            )}
                            {errors.password && errors.password.type === "minLength" && (
                                <div className="invalid-feedback">
                                    No puede contener menos de 6 caracteres
                                </div>
                            )}
                            {errors.password && errors.password.type === "maxLength" && (
                                <div className="invalid-feedback">
                                    No puede contener más de 25 caracteres
                                </div>
                            )}
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="password2">Repetir contraseña</label>
                            <input
                                type="password"
                                className={`form-control form-control-lg ${errors.password2 ? "is-invalid" : ""} mt-2`}
                                placeholder="Escriba su contraseña"
                                {...register("password2", {
                                    required: true,
                                    validate: value => value === password || "Las contraseñas no coinciden."
                                })}
                            />
                            {errors.password2 && errors.password2.type === "required" && (
                                <div className="invalid-feedback">Contraseña requerida</div>
                            )}
                            {errors.password2 && errors.password2.message && (
                                <div className="invalid-feedback">{errors.password2.message}</div>
                            )}
                        </div>
                        <button className="w-100 btn btn-dark rounded p-2 mt-3 btn-lg" type="submit">
                        {loading ? (
                            <span
                                className="spinner-border spinner-border-sm mr-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : (
                            "Cambiar"
                        )}
                        </button>
                    </form>
                    <a href='/Perfil' className='mt-5'><button className="w-100 btn btn-dark rounded p-2 btn-lg">Volver al inicio</button></a>
                </div>
            </div>
        </div>
    )
}

export default CambiarContraseña;