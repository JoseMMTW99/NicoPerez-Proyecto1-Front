import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function SubirArchivo() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userId = localStorage.getItem ("userId");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("userId", userId); // Add the userId to the formData
    try {
      const response = await axios.post(
        "http://localhost:8000/uploads/upload-file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
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
      <div className="mb-3">
        <label htmlFor="file" className="form-label">
          Select a PDF file to upload:
        </label>
        <input
          type="file"
          className="form-control"
          {...register("file", { required: true })}
        />
        {errors.file && (
          <span className="text-danger">This field is required</span>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Upload
      </button>
      {loading && <p>Loading...</p>}
      {success && <p>File uploaded successfully!</p>}
      {error && <p className="text-danger">{errorMessage}</p>}
    </form>
    </>
  );
}

export default SubirArchivo