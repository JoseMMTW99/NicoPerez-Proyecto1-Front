import React, { useState } from 'react';
import { useForm } from "react-hook-form";

function FormularioLogin() {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }} = useForm({ mode: "onBlur", defaultValues: { email: "", password: "",},});    
    
    const onSubmit = (data) => {
        setLoading(true);
        localStorage.setItem('logeado', true)
        console.log(data);
        window.location.replace('/Perfil')
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                    type="text"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter email"
                    {...register("email", {
                    required: true,
                    pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i,
                    maxLength: 40,
                    })}
                />
                {errors.email && errors.email.type === "required" && (
                    <div className="invalid-feedback">Correo requerido</div>
                )}
                {errors.email && errors.email.type === "pattern" && (
                    <div className="invalid-feedback">Correo invalido</div>
                )}
                {errors.email && errors.email.type === "maxLength" && (
                    <div className="invalid-feedback">
                    No puede contener más de 40 caracteres
                    </div>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Enter password"
                    {...register("password", { required: true, maxLength: 40 })}
                />
                {errors.password && errors.password.type === "required" && (
                    <div className="invalid-feedback">Contraseña requerida</div>
                )}
                {errors.password && errors.password.type === "maxLength" && (
                    <div className="invalid-feedback">
                    No puede contener más de 40 caracteres
                    </div>
                )}
            </div>
            <button type="submit" className="btn btn-primary">
            {loading ? (
                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
            ) : (
                'Iniciar Sesión'
            )}
            </button>
        </form>
    );
}

export default FormularioLogin