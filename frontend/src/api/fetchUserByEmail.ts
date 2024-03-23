import axios from "axios";

export async function fetchUserByEmail(email: String, token: string) {
  const res = await axios
    .get(`http://localhost:8080/users/${email}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => res.data)
    .catch((err) => err);

  return res;
}
