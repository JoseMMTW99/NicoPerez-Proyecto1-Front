import React from 'react'
import SubirArchivo from '../SubirArchivo/SubirArchivo'

function FilaUsuariosEdificio(usuario) {

    return (
        <>
            <tr>
                <td className="border">{usuario.usuario.name} {usuario.usuario.surname}</td>
                <td className="border">{usuario.usuario.email}</td>
                <td className="border">{usuario.usuario.piso}</td>
                <td className="border">{usuario.usuario.puerta}</td>
                <td className="border"><SubirArchivo  usuario={usuario.usuario}/></td>
            </tr>
            
        </>
    )
}

export default FilaUsuariosEdificio