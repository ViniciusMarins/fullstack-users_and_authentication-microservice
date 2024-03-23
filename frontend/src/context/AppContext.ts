import React, { createContext } from "react";
import { User } from "../types/AppTypes";

type AppContextType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  userLogged: User;
  setUserLogged: React.Dispatch<React.SetStateAction<User>>;
  isUserLogged: boolean;
  setIsUserLogged: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultValues: AppContextType = {
  token: "",
  setToken: () => {},
  userLogged: { email: "", id: -1, name: "", password: "", phone: "" },
  setUserLogged: () => {},
  isUserLogged: false,
  setIsUserLogged: () => {},
};

const AppContext = createContext(defaultValues);

export default AppContext;
