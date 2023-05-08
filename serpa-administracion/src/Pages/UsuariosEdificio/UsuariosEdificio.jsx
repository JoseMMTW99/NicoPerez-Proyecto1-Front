import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import FilaUsuariosEdificio from '../../Components/FilaUsuariosEdificio/FilaUsuariosEdificio'
import './usuariosEdificio.css'
import Cookies from 'js-cookie'
import Swal from "sweetalert2";

const UsuariosEdificio = () => {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
    });

    const [usuarios, setUsuarios] = useState([])
    const [usuariosPrint, setUsuariosPrint] = useState([])
    const { edificioName } = useParams();
    const [edificios, setEdificios] = useState([]);
    const [edificio, setEdificio] = useState(null);
    const navigate = useNavigate();

    const tokenAdmin = Cookies.get('token');
    if (tokenAdmin === undefined) {
        window.location.replace('/')
    }

    const handleGoBack = () => {
        window.location.replace('/Administracion')
      };

    const Apretado = async () => {
        swalWithBootstrapButtons
            .fire({
                title: `¿Estas seguro que quieres eliminar este edificio?`,
                text: "¡No podrás deshacer esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Confirmar",
                cancelButtonText: "Cancelar",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const swalLoading = Swal.fire({
                        title: "Procesando... ¡No cierre esta ventana!",
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        didOpen: () => {
                            Swal.showLoading();
                        },
                    });
                    await borrarEdificio();
                    swalLoading.close();
                    swalWithBootstrapButtons
                        .fire(
                            "¡Edificio eliminado!",
                            "Se elimino el edificio con éxito.",
                            "success"
                        )
                        .then(() => {
                            window.location.replace('/Administracion');
                        });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire(
                        "Cancelado",
                        "¡Estuvo cerca!",
                        "error"
                    );
                }
            });
    };

    const borrarEdificio = async () => {
        await axios.delete(`https://serpa-administracion-jose-martinez-teran.up.railway.app/edificio/delete-edificio`, {
            data: {
                name: edificioName
            }
        })
            .catch((error) => {
                console.error(error);
            })
    }

    useEffect(() => {
        const response = axios
            .get(`https://serpa-administracion-jose-martinez-teran.up.railway.app/edificio/get-edificio`)
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

    useEffect(() => {
        const response = axios.get(`https://serpa-administracion-jose-martinez-teran.up.railway.app/users/obtener-users`)
            .then((response) => {
                const filteredUsuarios = response.data.filter((usuario) => usuario.edificio === edificioName);
                setUsuarios(filteredUsuarios);
                setUsuariosPrint(filteredUsuarios);
            })
            .catch((error) => {
                console.error(error);
            })
    }, [edificioName])

    const searchCoinciden = (busqueda) => {
        const resultados = usuarios.filter(
            (usuario) =>
                usuario.name.toUpperCase().includes(`${busqueda.toUpperCase()}`) ||
                usuario.surname.toUpperCase().includes(`${busqueda.toUpperCase()}`) ||
                usuario.dni.toLowerCase().includes(`${busqueda.toLowerCase()}`) ||
                usuario.email.toLowerCase().includes(`${busqueda.toLowerCase()}`) ||
                usuario.piso.toLowerCase().includes(`${busqueda.toLowerCase()}`) ||
                usuario.puerta.toLowerCase().includes(`${busqueda.toLowerCase()}`) ||
                usuario.tipo.toLowerCase().includes(`${busqueda.toLowerCase()}`) ||
                usuario.baulera.toLowerCase().includes(`${busqueda.toLowerCase()}`)
        );
        setUsuariosPrint(resultados);
    };

    return (
        <>
            {edificio ? (
                <>
                    <div className='container-fluid p-0'>
                        <div className='divBotonVolverAtras mt-4 ms-4 d-flex justify-content-start'>
                            <button className="botonAgregarEdificio px-4" onClick={handleGoBack}>
                                <i className="bi bi-arrow-left-short"></i>
                            </button>
                        </div>
                    </div>
                    <h1 className='text-center mb-3 text-white tituloEdificio mx-auto mt-4'>{edificioName}</h1>
                    <div className='d-flex m-5 mt-5'>
                        <div className="pb-5 w-100">
                            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control barraBusqueda"
                                        onInput={(event) => searchCoinciden(event.target.value)}
                                        placeholder="Buscar usuario..."
                                        aria-label="Search"
                                        aria-describedby="search-button"
                                    />
                                </div>
                            </div>
                            <div className='tabla-usuarios'>
                                <div className="table-responsive">
                                    <table className="table align-middle">
                                        <thead className='align-middle'>
                                            <tr className='text-center'>
                                                <th className="fs-4">Cliente</th>
                                                <th className="fs-4">Correo</th>
                                                <th className="fs-4">Documento</th>
                                                <th className="fs-4">Piso</th>
                                                <th className="fs-4">Puerta</th>
                                                <th className="fs-4">Tipo</th>
                                                <th className="fs-4">Baulera</th>
                                                <th className="fs-4">Subir archivo</th>
                                                <th className="fs-4">Descargar archivo</th>
                                                <th className="fs-4">Cambiar contraseña</th>
                                                <th className="fs-4">Eliminar</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-center'>
                                            {
                                                usuariosPrint.sort((a, b) => a.piso - b.piso).map((usuario) => (<FilaUsuariosEdificio key={usuario._id} usuario={usuario} />))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='divBotonAgregarUsuario mt-4'>
                                <a href={`/Crear/Usuario/${edificioName}`}>
                                    <button className="botonAgregarEdificio mt-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                        </svg>
                                        Crear usuario
                                    </button>
                                </a>
                            </div>
                            <button className="botonBorrarEdifcio mt-4 pb-1 px-4" onClick={Apretado}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                </svg>
                                <span className='ms-2'>Borrar edificio</span>
                            </button>
                        </div>
                    </div>
                </>
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

export default UsuariosEdificio;