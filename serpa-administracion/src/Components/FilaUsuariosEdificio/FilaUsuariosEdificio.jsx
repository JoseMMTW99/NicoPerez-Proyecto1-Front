import React, { useState, useEffect } from 'react'
import SubirArchivo from '../SubirArchivo/SubirArchivo'
import axios from 'axios'
import './filaUsuariosEdificio.css'
import Swal from "sweetalert2";

function FilaUsuariosEdificio(usuario) {

    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
  });

    const downloadPdf = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://serpa-administracion-jose-martinez-teran.up.railway.app/uploads/getpdf/${usuario.usuario._id}`, {
          responseType: 'blob',
        });
    
        if (response.status === 200) {
          const date = new Date();
          const month = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);
    
          const fileExtension = response.data.type.split('/')[1];
    
          const downloadFilename = `Comprobante Serpa - ${usuario.usuario.name} ${usuario.usuario.surname} - ${month}.${fileExtension}`;
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', downloadFilename);
          document.body.appendChild(link);
          link.click();
          setIsLoading(false);
        } else if (response.status === 206) {
          setIsLoading(false);
          setError(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const Apretado = async () => {
      swalWithBootstrapButtons
          .fire({
              title: `¿Estas seguro que quieres eliminar este usuario?`,
              text: "¡No podrás deshacer esto!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Confirmar",
              cancelButtonText: "Cancelar",
              reverseButtons: true,
          })
          .then(async (result) => {
              if (result.isConfirmed) {
                  const swalLoading = Swal.fire({
                    title: "Procesando... ¡No cierre esta ventana!",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didOpen: () => {
                        Swal.showLoading();
                  },
                });
                await borrarUsuario();
                swalLoading.close();
                swalWithBootstrapButtons
                  .fire(
                      "¡Usuario eliminado!",
                      "Se elimino el usuario con éxito.",
                      "success"
                  )
                  .then(() => {
                    window.location.reload(true);
                  });
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    "Cancelado",
                    "¡Estuvo cerca!",
                    "error"
                );
              }
          });
  };

  const borrarUsuario = async () => {
      await axios.delete(`https://serpa-administracion-jose-martinez-teran.up.railway.app/users/eliminar-user`, {
          data: {
              id: usuario.usuario._id
          }
      })
          .catch((error) => {
              console.error(error);
          })
  }

    return (
        <>
            <tr>
                <td className="border">{usuario.usuario.name} {usuario.usuario.surname}</td>
                <td className="border">{usuario.usuario.email}</td>
                <td className="border">{usuario.usuario.dni}</td>
                <td className="border">{usuario.usuario.piso}</td>
                <td className="border">{usuario.usuario.puerta}</td>
                <td className="border">{usuario.usuario.tipo}</td>
                <td className="border">{usuario.usuario.baulera}</td>
                <td className="border"><SubirArchivo  usuario={usuario.usuario}/></td>
                <td className='border'>
                {isLoading ? (
                    <div className="d-flex justify-content-center mt-3">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Descargando...</span>
                    </div>
                    </div>
                ) : (
                    <button className="botonDescargarAdmin" onClick={downloadPdf}>
                        <i className="bi bi-download"></i>
                    </button>
                )}
                {
                    error ? <div className='text-center text-muted fs-6'>¡No hay comprobante!</div> : <></>
                }
                </td>
                <td className='border'>
                  <a href={`/Administracion/Recuperar-contraseña/${usuario.usuario._id}`}>
                    <button className="botonDescargarAdmin">
                        <i className="bi bi-lock-fill"></i>
                    </button>
                  </a>
                </td>
                <td className='border'>
                  <button className="botonEliminarAdmin" onClick={Apretado}>
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
            </tr>
            
        </>
    )
}

export default FilaUsuariosEdificio