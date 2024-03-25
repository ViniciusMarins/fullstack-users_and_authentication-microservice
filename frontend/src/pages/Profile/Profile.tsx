import { useContext } from "react";
import FormProfile from "../../components/FormProfile/FormProfile";
import FormTemplate from "../../components/FormTemplate/FormTemplate";
import AppContext from "../../context/AppContext";
import { Navigate, useNavigate } from "react-router-dom";
import "./Profile.css";
import { fetchUpdateUser } from "../../api/fetchUpdateUser";
import axios from "axios";
import { User } from "../../types/AppTypes";
import { notifyError, notifySucess } from "../../utils/Toasts";
import { fetchDeleteUser } from "../../api/fetchDeleteUser";

function Profile() {
  const { userLogged, isUserLogged, token, setUserLogged } =
    useContext(AppContext);

  const navigate = useNavigate();

  if (!isUserLogged) {
    return <Navigate to="/login" />;
  }

  function submitUpdateProfile(data: any, resetField: any) {
    const userToUpdate: User = {
      id: userLogged.id,
      email: userLogged.email,
      name: data.name !== userLogged.name ? data.name : userLogged.name,
      phone: data.phone !== userLogged.phone ? data.phone : userLogged.phone,
      password:
        data.password && data.password.trim().length >= 5
          ? data.password
          : userLogged.password,
    };

    fetchUpdateUser(userToUpdate, token).then((res) => {
      if (axios.isAxiosError(res)) {
        notifyError("Erro ao atualizar dados.");
      } else {
        notifySucess("Dados atualizados com sucesso!");

        setUserLogged(res);
        resetField("password");
      }
    });
  }

  function deleteAccount() {
    fetchDeleteUser(userLogged, token).then((res) => {
      if (axios.isAxiosError(res)) {
        notifyError("Ops...aconteceu algum erro, tente mais tarde!");
      } else {
        notifySucess("Conta excluída com sucesso!");
        navigate("/login");
      }
    });
  }

  return (
    <FormTemplate formContainer={"profile-form-container"}>
      <FormProfile
        userLogged={userLogged}
        submitUpdateProfile={submitUpdateProfile}
        deleteAccount={deleteAccount}
      />
    </FormTemplate>
  );
}

export default Profile;
