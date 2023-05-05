import React from 'react'
import imagenPerfil from '../../assets/perfilColor.png';
import './perfilNavBar.css'

function PerfilNavBar(usuario) {

  const cerrarSesion = () => {
    localStorage.removeItem('idUsuarioLogeado');
    localStorage.removeItem('token');
    window.location.replace('/')
  }

  return (
    <>
      <div className='cajaPerfilNavBar'>
        <div className='cerrarSesionNavBarPerfil' onClick={cerrarSesion}><i>Salir</i></div>
        <div className='divNavBarPerfil' style={{display: 'flex', alignItems: 'center', padding: 5 }}>
            <div className='usuarioNavBarPerfil px-5 rounded-3'>{usuario.usuario.name} {usuario.usuario.surname}</div>
            <div className='iconoNavBarPerfil'>
                <img src={imagenPerfil} className='imagenNavBarPerfil' alt="PerfilIcono" />
            </div>
        </div>
      </div>
    </>
  )
}

export default PerfilNavBar