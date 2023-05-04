import React from 'react'
import logo from '../../assets/LogoBlanco.png'
import './navBar.css'

function NavBar() {
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
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

export default NavBar