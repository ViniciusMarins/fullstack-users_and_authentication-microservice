import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Navigate } from "react-router-dom";

function Management() {
  const { isUserLogged } = useContext(AppContext);

  if (!isUserLogged) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h1> Tela de gerenciamento!</h1>
    </>
  );
}

export default Management;
