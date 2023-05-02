import React from 'react'

function CardEdificio(edificio) {

    const irAEdificio = () => {
        localStorage.setItem('edificio', edificio.edificio.name)
        window.location.replace('/edificio')
    }

    return (
        <>
        <div className="col-md-6 p-1">
            <div className="card-body border rounded" onClick={irAEdificio}>
                <div className='text-center mt-3 fs-1'><i className="bi bi-building"></i></div>
                <div className='mb-4'><h3 className="card-title text-center m-2">{edificio.edificio.name}</h3></div>
            </div>
        </div>
        </>
    )

}

export default CardEdificio