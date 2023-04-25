import React from 'react'
import './perfil.css'

function Perfil() {

    const logeado = localStorage.getItem('logeado')

    if (!logeado) {
        window.location.replace('/')
    }

  return (
    <>
    Perfil
    </>
  )
}

export default Perfil