import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function SubirArchivo(usuario) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/uploads/upload-file",
        {
          file: data.file[0],
          userId: usuario.usuario._id
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group w-75 mx-auto">
          <input
            type="file"
            className="form-control"
            {...register("file", { required: true })}
          />
          <button type="submit" className={success ? "btn btn-success" : "btn btn-primary"}>
            {loading && (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {!loading && !success && "Subir"}
            {success && (
              <>
                <span
                  className="me-2">
                  <i className="bi bi-check text-light"></i>
                </span>
              </>
            )}
          </button>
        </div>
        {errors.file && (
          <span className="text-danger">Campo requerido.</span>
        )}
        {error && <p className="text-danger">{errorMessage}</p>}
      </form>
    </>
  );
}

export default SubirArchivo;