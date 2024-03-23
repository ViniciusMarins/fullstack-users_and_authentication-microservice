import axios from "axios";
import { User } from "../types/AppTypes";

export async function fetchCreateUser(body: User) {
  const res = await axios
    .post("http://localhost:8080/users", body)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return res;
}
