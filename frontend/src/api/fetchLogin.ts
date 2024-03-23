import axios from "axios";
import { LoginRequest } from "../types/AppTypes";

export async function fetchLogin(req: LoginRequest) {
  const res = await axios
    .post("http://localhost:8080/login", req)
    .then((res) => {
      return res.data.token;
    })
    .catch((err) => {
      return err;
    });

  return res;
}
