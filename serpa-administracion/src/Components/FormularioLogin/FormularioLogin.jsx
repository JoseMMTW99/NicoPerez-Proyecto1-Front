import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './formularioLogin.css'
import axios from "axios";
import logo from '../../assets/LogoColor.png'
import emailLogo from '../../assets/email.png'
import passwordLogo from '../../assets/password.png'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from 'js-cookie'

function FormularioLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMensaje, setErrorMensaje] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
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
            Cookies.set('id', respuesta.data.user._id, { expires: 365 });
            if (respuesta.data.user.role === "admin") {
                Cookies.set('token', respuesta.data.token, { expires: 365 });
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
        <div className="d-flex align-items-center" style={{ height: "90vh" }}>
            <div className="container container-login  rounded-5">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className='w-100 mx-auto text-center mb-3'>    
                            <img className='w-25' src={logo}/>
                            <h2 className='serpaTituloLogin'>SERPA ADMINISTRADOR</h2>
                        </div>
                        <h1 className='text-center fuente-600'>INGRESAR</h1>
                        <h2 className='mt-4'>Usuario</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="position-relative">
                                    <img src={emailLogo} alt="Email Logo" className='logoLogin emailLogo border-0 position-absolute start-0' />
                                    <div className={`form-group border-bottom ${errors.email ? "border-danger" : "border-dark"} inputLogin`}>
                                        <input
                                            type="text"
                                            className={`form-control border-0  p-0 form-control-lg mt-2`}
                                            placeholder="Escriba aquí su usuario"
                                            {...register("email", {
                                                required: true,
                                                pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i,
                                                maxLength: 40,
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>
                            {errors.email && errors.email.type === "required" && (
                                <p className="text-danger mt-2 ms-1 fs-6">Correo requerido</p>
                            )}
                            {errors.email && errors.email.type === "pattern" && (
                                <p className="text-danger mt-2 ms-1 fs-6">Correo invalido</p>
                            )}
                            {errors.email && errors.email.type === "maxLength" && (
                                <p className="text-danger mt-2 ms-1 fs-6">
                                    No puede contener más de 40 caracteres
                                </p>
                            )}
                            <div className="row">
                                <div className="position-relative">
                                    <img src={passwordLogo} alt="Password Logo" className='logoLogin passwordLogo border-0 position-absolute start-0' />
                                    <div className={`form-group border-bottom ${errors.email ? "border-danger" : "border-dark"} mt-3 inputLogin`}>
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            className={`form-control border-0 p-0 form-control-lg mt-2`}
                                            placeholder="Escriba aquí su contraseña"
                                            {...register("password", { required: true, maxLength: 40 })}
                                        />
                                    </div>
                                    <button
                                    className="btn me-3 border-0 position-absolute end-0 btnOjo"
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    >
                                    <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                                    </button>
                                </div>
                            </div>
                            {errors.password && errors.password.type === "required" && (
                                <p className="text-danger mt-2 ms-1 fs-6">Contraseña requerida</p>
                            )}
                            {errors.password && errors.password.type === "maxLength" && (
                                <p className="text-danger mt-2 ms-1 fs-6">
                                    No puede contener más de 40 caracteres
                                </p>
                            )}
                            {error ? (
                                <>
                                    <p className="text-danger mt-2 ms-1 fs-6">{errorMensaje}</p>
                                </>
                            ) : (
                                <></>
                            )}
                            <div className='mt-3 d-flex justify-content-center'>
                                <button type="submit" className="w-100 rounded btn btn-dark p-2 mt-2 btn-lg botonLogin">
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
                            </div>
                            <div className='text-end mt-4'>                            
                                <a href='/Recuperar-contraseña' className='text-decoration-none'><h3 className='fs-6 text-muted'>Olvide mi contraseña</h3></a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormularioLogin