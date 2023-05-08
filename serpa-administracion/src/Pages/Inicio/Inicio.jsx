import React from 'react'
import Cookies from 'js-cookie'
import FormularioLogin from '../../Components/FormularioLogin/FormularioLogin'
import './inicio.css'

function Inicio() {

  const tokenAdmin = Cookies.get('token');
  const idUser = Cookies.get('id');
  if (tokenAdmin !== undefined) {
    window.location.replace('/Administracion')
  } else if (idUser !== undefined) {
    window.location.replace('/Perfil')
  }


  return (
    <>
    <div className='container-fluid'>
      <FormularioLogin/>
    </div>
    </>
  )
}

export default Inicio