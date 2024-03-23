import axios from "axios";
import { fetchCreateUser } from "../../api/fetchCreateUser";
import FormRegister from "../../components/FormRegister/FormRegister";
import FormTemplate from "../../components/FormTemplate/FormTemplate";
import { User } from "../../types/AppTypes";
import "./Register.css";
import { notifyError, notifySucess } from "../../utils/Toasts";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  function submitRegister(body: User, reset: any) {
    fetchCreateUser(body).then((res) => {
      if (axios.isAxiosError(res)) {
        if (res.response?.status == 409) {
          notifyError("Email já está em uso.");
        }
      } else {
        notifySucess("Cadastro realizado com sucesso!");
        reset();
        navigate("/login");
      }
    });
  }

  return (
    <div className="container">
      <FormTemplate
        formContainer={"register-form-container"}
        children={<FormRegister submit={submitRegister} />}
      />
    </div>
  );
}

export default Register;
