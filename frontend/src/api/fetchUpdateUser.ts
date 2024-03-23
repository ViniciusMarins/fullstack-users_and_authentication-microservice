import axios from "axios";
import { User } from "../types/AppTypes";

export async function fetchUpdateUser(user: User, token: string) {
  const res = await axios
    .put("http://localhost:8080/users", user, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

  return res;
}
