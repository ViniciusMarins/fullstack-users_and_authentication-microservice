import { useState } from "react";
import AppContext from "./AppContext";
import { User } from "../types/AppTypes";

type Props = {
  children: React.ReactNode;
};

function Provider({ children }: Props) {
  const [token, setToken] = useState("");
  const [userLogged, setUserLogged] = useState<User>({
    email: "",
    id: -1,
    name: "",
    password: "",
    phone: "",
  });
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);

  const value = {
    token,
    setToken,
    userLogged,
    setUserLogged,
    isUserLogged,
    setIsUserLogged,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default Provider;
