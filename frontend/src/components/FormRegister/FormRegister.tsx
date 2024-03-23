import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

import { IoArrowBackOutline } from "react-icons/io5";

import "./FormRegister.css";
import { Link } from "react-router-dom";

function FormRegister({ submit }: any) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("O nome é obrigatório")
      .min(4, "O nome deve conter no mínimo 4 dígitos"),
    email: yup
      .string()
      .required("O email é obrigatório")
      .email("Email inválido"),
    phone: yup
      .string()
      .required("O telefone é obrigatório")
      .min(15, "Telefone inválido"),
    password: yup
      .string()
      .required("A senha é obrigatória")
      .min(5, "A senha deve conter no mínimo 5 dígitos"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas não coincidem"),
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

  function formatPhoneNumber(value: any) {
    const cleanedValue = value.replace(/\D/g, "");

    if (cleanedValue) {
      let formattedValue = "(" + cleanedValue.substring(0, 2) + ") ";
      formattedValue +=
        cleanedValue.substring(2, 7) + "-" + cleanedValue.substring(7, 11);
      return formattedValue;
    }

    return "";
  }

  return (
    <form
      className="form"
      onSubmit={handleSubmit((data) => submit(data, reset))}
    >
      <Link to="/login">
        <span className="container-back-arrow">
          <IoArrowBackOutline className="back-arrow" />
        </span>
      </Link>

      <h1 style={{ marginTop: "10px", marginBottom: "10px" }}>
        Preencha o formulário
      </h1>

      <div className="campo-container">
        <label htmlFor="name">Name</label>
        <input type="text" {...register("name")} id="name" />
        <span className="span-error">{errors.name?.message}</span>
      </div>

      <div className="campo-container">
        <label htmlFor="email">E-mail</label>
        <input type="text" {...register("email")} id="email" />
        <span className="span-error">{errors.email?.message}</span>
      </div>

      <div className="campo-container">
        <label htmlFor="phone">Phone</label>
        <input
          placeholder="(##) #####-####"
          {...register("phone")}
          type="tel"
          id="phone"
          onChange={(e) => {
            e.target.value = formatPhoneNumber(e.target.value);
          }}
        />
        <span className="span-error">{errors.phone?.message}</span>
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

      <div className="campo-container">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
          type={isPasswordVisible ? "text" : "password"}
          {...register("confirmPassword")}
        />
        {isPasswordVisible
          ? handlePasswordIcon(BsEyeFill)
          : handlePasswordIcon(BsEyeSlashFill)}
        <span className="span-error">{errors.confirmPassword?.message}</span>
      </div>

      <button type="submit"> Confirmar </button>
    </form>
  );
}

export default FormRegister;
