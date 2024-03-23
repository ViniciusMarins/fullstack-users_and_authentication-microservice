import { useContext } from "react";
import "./Home.css";
import AppContext from "../../context/AppContext";
import { Navigate } from "react-router-dom";

function Home() {
  const { isUserLogged, userLogged } = useContext(AppContext);

  if (!isUserLogged) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h1> Bem vindo {userLogged.name}!</h1>
    </>
  );
}

export default Home;
