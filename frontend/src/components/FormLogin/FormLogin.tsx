import { useState } from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

function FormLogin({ submit }: any) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("O email é obrigatório")
      .email("Email inválido"),
    password: yup
      .string()
      .required("A senha é obrigatória")
      .min(5, "A senha deve conter no mínimo 5 dígitos"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  function handlePasswordIcon(Icon: any) {
    return (
      <Icon
        className="icon-password"
        onClick={() => setIsPasswordVisible((prev) => !prev)}
      />
    );
  }

  return (
    <form
      className="form"
      onSubmit={handleSubmit((data) => submit(data, reset))}
    >
      <h1>Entre com a sua conta</h1>

      <div className="campo-container">
        <label htmlFor="email">E-mail</label>
        <input type="text" {...register("email")} id="email" />
        <span className="span-error">{errors.email?.message}</span>
      </div>

      <div className="campo-container">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
          type={isPasswordVisible ? "text" : "password"}
          {...register("password")}
        />
        {isPasswordVisible
          ? handlePasswordIcon(BsEyeFill)
          : handlePasswordIcon(BsEyeSlashFill)}
        <span className="span-error">{errors.password?.message}</span>
      </div>

      <a className="link-password">Esqueci minha senha</a>

      <button type="submit"> Entrar </button>

      <p>
        Não tem conta? <Link to="/register">Cadastrar</Link>
      </p>
    </form>
  );
}

export default FormLogin;
