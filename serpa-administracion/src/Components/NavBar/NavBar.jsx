import React, { useState, useEffect } from 'react'
import logo from '../../assets/LogoBlanco.png'
import PerfilNavBar from '../PerfilNavBar/PerfilNavBar'
import './navBar.css'
import axios from 'axios'

function NavBar() {

    const [users, setUsers] = useState({})
    const idUser = localStorage.getItem('id')
    if (idUser === null) {
        window.location.replace('/')
    }
  
    useEffect(() =>{
      if (idUser !== null){
          axios.get(`https://serpa-administracion-jose-martinez-teran.up.railway.app/users/${idUser}`)
          .then((response) =>{
              setUsers(response.data);
          })
          .catch((error) =>{
              console.error(error);
          })
      }
  }, [idUser])

  return (
    <>
    <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <img className="navbar-brand col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3" src={logo}/>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <PerfilNavBar usuario={users}/>
                </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

export default NavBar