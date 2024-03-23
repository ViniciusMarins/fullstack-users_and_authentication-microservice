import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import "./FormProfile.css";
import { User } from "../../types/AppTypes";

type PropsType = {
  userLogged: User;
  submitUpdateProfile: (data: any, resetField: any) => void;
};

function FormProfile({ userLogged, submitUpdateProfile }: PropsType) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("O nome é obrigatório")
      .min(4, "O nome deve conter no mínimo 4 caracteres"),
    phone: yup
      .string()
      .required("O telefone é obrigatório")
      .min(15, "Telefone inválido"),
    password: yup.string().test({
      test: function (value) {
        if (!value || value.trim() === "") {
          return true;
        }
        return value.length >= 5;
      },

      message: "A senha deve conter no mínimo 5 caracteres",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
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
      onSubmit={handleSubmit((data) => submitUpdateProfile(data, resetField))}
    >
      <h1 style={{ marginTop: "10px", marginBottom: "10px" }}>
        Dados cadastrais
      </h1>

      <div className="campo-container">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          {...register("name")}
          id="name"
          defaultValue={userLogged.name}
        />
        <span className="span-error">{errors.name?.message}</span>
      </div>

      <div className="campo-container">
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          defaultValue={userLogged.email}
          disabled
        />
      </div>

      <div className="campo-container">
        <label htmlFor="phone">Phone</label>
        <input
          placeholder="(##) #####-####"
          type="tel"
          id="phone"
          {...register("phone")}
          defaultValue={userLogged.phone}
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

      <button type="submit"> Atualizar Dados </button>
    </form>
  );
}

export default FormProfile;
