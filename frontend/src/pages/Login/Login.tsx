import { LoginRequest } from "../../types/AppTypes";
import { useContext } from "react";
import { fetchLogin } from "../../api/fetchLogin";
import axios from "axios";
import AppContext from "../../context/AppContext";
import "./Login.css";
import { fetchUserByEmail } from "../../api/fetchUserByEmail";
import FormTemplate from "../../components/FormTemplate/FormTemplate";
import FormLogin from "../../components/FormLogin/FormLogin";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySucess } from "../../utils/Toasts";

function Login() {
  const { setToken, setUserLogged, setIsUserLogged } = useContext(AppContext);

  const navigate = useNavigate();

  async function logIn(email: string, token: string) {
    setToken(token);

    await fetchUserByEmail(email, token).then((res) => {
      setUserLogged(res);
      setIsUserLogged(true);
    });

    navigate("/home");
    notifySucess("Autenticado com sucesso!");
  }

  function submitLogin(req: LoginRequest, reset: any) {
    fetchLogin(req).then((res) => {
      if (axios.isAxiosError(res)) {
        if (res.response?.status == 404) {
          notifyError("Email não cadastrado.");
        }

        if (res.response?.status == 401) {
          notifyError("Senha incorreta.");
        }
      } else {
        setToken(res);
        reset();

        logIn(req.email, res);
      }
    });
  }

  return (
    <div className="container">
      <FormTemplate
        formContainer={"login-form-container"}
        children={<FormLogin submit={submitLogin} />}
      />
    </div>
  );
}

export default Login;
