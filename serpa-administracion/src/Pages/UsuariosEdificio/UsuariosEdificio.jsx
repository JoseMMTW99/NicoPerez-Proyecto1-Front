import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import FilaUsuariosEdificio from '../../Components/FilaUsuariosEdificio/FilaUsuariosEdificio'
import './usuariosEdificio.css'
import Cookies from 'js-cookie'

const UsuariosEdificio = () =>{

    const [usuarios, setUsuarios] = useState([])
    const [usuariosPrint, setUsuariosPrint] = useState([])
    const { edificioName } = useParams();
    const [edificios, setEdificios] = useState([]);
    const [edificio, setEdificio] = useState(null);

    const tokenAdmin = Cookies.get('token');
    if (tokenAdmin === undefined) {
        window.location.replace('/')
    }

    // const BackButton = () => {
    //     const history = useNavigate();
    //     console.log(history.location);
    // }

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

    useEffect(() =>{
        const response = axios.get(`https://serpa-administracion-jose-martinez-teran.up.railway.app/users/obtener-users`)
        .then((response) =>{
            const filteredUsuarios = response.data.filter((usuario) => usuario.edificio === edificioName);
            setUsuarios(filteredUsuarios);
            setUsuariosPrint(filteredUsuarios);
        })
        .catch((error) =>{
            console.error(error);
        })
    }, [edificioName])

    const searchCoinciden = (busqueda) => {
        const resultados = usuarios.filter(
          (usuario) =>
            usuario.name.toUpperCase().includes(`${busqueda.toUpperCase()}`) ||
            usuario.surname.toUpperCase().includes(`${busqueda.toUpperCase()}`) ||
            usuario.dni.toLowerCase().includes(`${busqueda.toLowerCase()}`) ||
            usuario.piso.toLowerCase().includes(`${busqueda.toLowerCase()}`) ||
            usuario.puerta.toLowerCase().includes(`${busqueda.toLowerCase()}`) ||
            usuario.tipo.toLowerCase().includes(`${busqueda.toLowerCase()}`) ||
            usuario.baulera.toLowerCase().includes(`${busqueda.toLowerCase()}`)
        );
        setUsuariosPrint(resultados);
      };

    return(
        <>
        {edificio ? (
        <>
            <div className='divBotonAgregarEdificio m-5'>
                <button className="botonAgregarEdificio px-4">
                    <i className="bi bi-arrow-left-short"></i>
                </button>
            </div>
            <div className='d-flex justify-content-center m-5'>
                <div className="pb-5 w-100">
                    <h1 className='text-center mb-3 text-white tituloEdificio'>{edificioName}</h1>
                    <div className="col-11 col-sm-11 col-md-10 col-lg-7 col-xl-7 col-xxl-7 mx-auto">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control barraBusqueda"
                                onInput={(event) => searchCoinciden(event.target.value)}
                                placeholder="Buscar..."
                                aria-label="Search"
                                aria-describedby="search-button"
                            />
                        </div>
                    </div>
                    <div className='tabla-usuarios'>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr className='text-center'>
                                        <th className="fs-4">Cliente</th>
                                        <th className="fs-4">Correo</th>
                                        <th className="fs-4">Documento</th>
                                        <th className="fs-4">Piso</th>
                                        <th className="fs-4">Puerta</th>
                                        <th className="fs-4">Tipo</th>
                                        <th className="fs-4">Baulera</th>
                                        <th className="fs-4">Subir Comprobante</th>
                                        <th className="fs-4">Desc. Comp.</th>
                                        <th className="fs-4">Camb. Contraseña</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {
                                    usuariosPrint.sort((a, b) => a.piso - b.piso).map((usuario) => ( <FilaUsuariosEdificio key={usuario._id} usuario={usuario}/>))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='divBotonAgregarEdificio mt-4'>
                        <a href={`/Crear/Usuario/${edificioName}`}>
                            <button className="botonAgregarEdificio mt-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                Crear usuario
                            </button>
                        </a>
                    </div>
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