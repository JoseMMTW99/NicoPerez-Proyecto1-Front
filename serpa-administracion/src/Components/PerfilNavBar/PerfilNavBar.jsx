import React from 'react'
import imagenPerfil from '../../assets/perfilColor.png';
import './perfilNavBar.css'

function PerfilNavBar(usuario) {

  console.log(usuario);

  return (
    <>
        <div style={{display: 'flex', alignItems: 'center', padding: 5 }}>
            <div className='usuarioNavBarPerfil px-5 rounded-3'>{usuario.usuario.name} {usuario.usuario.surname}</div>
            <div className='iconoNavBarPerfil'>
                <img src={imagenPerfil} className='imagenNavBarPerfil' alt="PerfilIcono" />
            </div>
        </div>
    </>
  )
}

export default PerfilNavBar