import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './formularioLogin.css'
import axios from "axios";

function FormularioLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMensaje, setErrorMensaje] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur", defaultValues: { email: "", password: "", }, });

    const onSubmit = async (data) => {
        setLoading(true);
        const respuesta = await axios.post(
            `https://serpa-administracion-jose-martinez-teran.up.railway.app/users/login-user`,
            {
                email: data.email.trim().toLowerCase(),
                password: data.password,
            }
        );
        if (respuesta.status === 200) {
            localStorage.setItem("id", respuesta.data.user._id);
            if (respuesta.data.user.role === "admin") {
                localStorage.setItem("token", respuesta.data.token);
                window.location.replace("/Administracion");
            } else {
                window.location.replace("/Perfil");
            }
        }
        if (respuesta.status === 206) {
            setLoading(false);
            setError(true);
            setErrorMensaje(respuesta.data.message)
        }
    };

    return (
        <div className="d-flex align-items-center" style={{ height: "100vh" }}>
            <div className="container container-login">
                <div className="row justify-content-center p-5 ms-2 mx-2">
                    <div className="col-md-6">
                        <h1 className='text-center fuente-600'>INGRESAR</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group border-bottom">
                                <input
                                    type="text"
                                    className={`form-control border-0 form-control-lg ${errors.email ? "is-invalid" : ""} mt-2`}
                                    placeholder="Escriba su correo electrónico"
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
                            <div className="form-group border-bottom mt-3">
                                <input
                                    type="password"
                                    className={`form-control border-0 form-control-lg ${errors.password ? "is-invalid" : ""} mt-2`}
                                    placeholder="Escriba su contraseña"
                                    {...register("password", { required: true, maxLength: 40 })}
                                />
                                {errors.password && errors.password.type === "required" && (
                                    <div className="invalid-feedback">Contraseña requerida</div>
                                )}
                                {errors.password && errors.password.type === "maxLength" && (
                                    <div className="invalid-feedback">
                                        No puede contener más de 40 caracteres
                                    </div>
                                )}
                            </div>
                            {error ? (
                                <>
                                    <p className="text-danger mt-2 ms-1 fs-6">{errorMensaje}</p>
                                </>
                            ) : (
                                <></>
                            )}
                            <div className='mt-3 d-flex justify-content-center'>
                                <button type="submit" className="w-100 rounded btn btn-dark p-2 mt-2 btn-lg">
                                    {loading ? (
                                        <span
                                            className="spinner-border spinner-border-sm mr-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                    ) : (
                                        "Iniciar Sesión"
                                    )}
                                </button>
                                ¿Olvide mi contraseña?
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormularioLogin