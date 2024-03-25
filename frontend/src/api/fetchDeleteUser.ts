import axios from "axios";
import { User } from "../types/AppTypes";

export async function fetchDeleteUser(user: User, token: string) {
  const res = await axios
    .delete(`http://localhost:8080/users/${user.id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return res;
}
