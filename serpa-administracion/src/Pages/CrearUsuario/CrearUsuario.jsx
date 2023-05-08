import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import { createRouter } from '@remix-run/router';
import { useParams } from 'react-router-dom';
import './crearUsuario.css'
import Cookies from 'js-cookie'

const CrearUsuario = () => {

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { edificioName } = useParams();
    const [edificios, setEdificios] = useState([]);
    const [edificio, setEdificio] = useState(null);


    const tokenAdmin = Cookies.get('token');
    if (tokenAdmin === undefined) {
        window.location.replace('/')
    }

    useEffect(() => {
        const response = axios
          .get(`http://localhost:8000/edificio/get-edificio`)
          .then((response) => {
            setEdificios(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }, [tokenAdmin]);

    useEffect(() => {
    const selectedEdificio = edificios.find((e) => e.name === edificioName);
    setEdificio(selectedEdificio);
    }, [edificios, edificioName]);

    const onSubmit = async (data) => {
        setLoading(true);
        const respuesta = await axios.post(
            `http://localhost:8000/users/crear-user`,
            {
                name: data.name.trim(),
                surname: data.surname.trim(),
                email: data.email.trim().toLowerCase(),
                dni: data.dni.trim(),
                edificio: edificioName,
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

    document.body.classList.add('crear-usuario');

    return (
        <>
        {edificio ? (
            <div>
                <div className='divBotonAgregarEdificio'>
                    <a href={`/Administracion`}>
                        <button className="botonAgregarEdificio mt-4 ms-3 px-4">
                            <i className="bi bi-arrow-left-short"></i>
                        </button>
                    </a>
                </div>
                <h1 className='text-center text-dark'>{edificioName}</h1>
                <div className="row">
                    <div className=' col-11 col-sm-11 col-md-8 col-lg-6 col-xl-5 col-xxl-4 container-crear-usuario pt-2 pb-2'>
                        <h3 className='text-center mt-2 mb-4 text-white'>Nuevo Usuario</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group col-12 col-sm-12 col-md-9 col-lg-9 col-xl-8 col-xxl-7 mx-auto">
                                <input
                                    type="text"
                                    placeholder='Nombre'
                                    className={`form-control mt-2 mb-2 pt-2 pb-2 ${errors.name ? "is-invalid" : ""}`}
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
                            <div className="form-group col-12 col-sm-12 col-md-9 col-lg-9 col-xl-8 col-xxl-7  mx-auto">
                                <input
                                    type="text"
                                    placeholder='Apellido'
                                    className={`form-control mt-2 mb-2 pt-2 pb-2 ${errors.name ? "is-invalid" : ""}`}
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
                            <div className="form-group col-12 col-sm-12 col-md-9 col-lg-9 col-xl-8 col-xxl-7  mx-auto">
                                <input
                                    type="text"
                                    placeholder='Documento'
                                    className={`form-control  ${errors.dni ? "is-invalid" : ""} mt-2`}
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
                            <div className="form-group col-12 col-sm-12 col-md-9 col-lg-9 col-xl-8 col-xxl-7  mx-auto">
                                <input
                                    type="text"
                                    placeholder='Correo Electrónico'
                                    className={`form-control mt-2 mb-2 pt-2 pb-2 ${errors.email ? "is-invalid" : ""}`}
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
                            <div className="form-group col-12 col-sm-12 col-md-9 col-lg-9 col-xl-8 col-xxl-7  mx-auto">
                                <input
                                    type="text"
                                    placeholder='Piso'
                                    className={`form-control mt-2 mb-2 pt-2 pb-2 ${errors.piso ? "is-invalid" : ""}`}
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
                            <div className="form-group col-12 col-sm-12 col-md-9 col-lg-9 col-xl-8 col-xxl-7  mx-auto">
                                <input
                                    type="text"
                                    placeholder='Puerta'
                                    className={`form-control mt-2 mb-2 pt-2 pb-2 ${errors.puerta ? "is-invalid" : ""}`}
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
                            <div className="form-group col-12 col-sm-12 col-md-9 col-lg-9 col-xl-8 col-xxl-7  mx-auto">
                                <input
                                    type="text"
                                    placeholder='Baulera'
                                    className={`form-control mt-2 mb-2 pt-2 pb-2 ${errors.baulera ? "is-invalid" : ""}`}
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
                            <div className="form-group col-12 col-sm-12 col-md-9 col-lg-9 col-xl-8 col-xxl-7  mx-auto mt-1">
                                <select className="form-select mt-2 mb-2 pt-2 pb-2"
                                    {...register("tipo", { required: true })}
                                    id="tipo"
                                    name="tipo"
                                >
                                    <option className='text-dark' value="">Tipo</option>
                                    <option className='text-dark' value="Departamento">Departamento</option>
                                    <option className='text-dark' value="Local">Local</option>
                                    <option className='text-dark' value="Oficina">Oficina</option>
                                    <option className='text-dark' value="Cochera">Cochera</option>
                                </select>
                            </div>
                            <button className="btn-crear-usuario mt-3 mb-3">
                                {loading ? (
                                    <span
                                        className="spinner-border spinner-border-sm mr-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                ) : (
                                    "Agregar"
                                )}
                            </button>
                        </form>
                    </div>
                    <div className="footerAdministrador">
                        <h3 className='fs-4 text-center mt-3'>Desarrollado por Uppering</h3>
                    </div>
                </div>
            </div>
        ) : (
            <>
                <div className='mx-auto text-center mt-5'>
                    <a href='/Administracion' className=''><button className="btn-edificio-2 mt-2 ms-2">Volver a Administración</button></a>
                </div>
            </>
        )}
        </>
    )
}

export default CrearUsuario;