import React from 'react'
import FormularioLogin from '../../Components/FormularioLogin/FormularioLogin'
import './inicio.css'

function Inicio() {

  return (
    <>
    <div className='container-fluid'>
      <FormularioLogin/>
    </div>
    <div className="footerInicio">
      <h3 className='fs-4'>Desarrollado por Uppering</h3>
    </div>
    </>
  )
}

export default Inicio