import { BACKEND_API } from "../config";

export const Login = async ({ email, password }) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const data = await fetch(`${BACKEND_API}/auth/login`, {
    method: "post",
    body: JSON.stringify({ email, password }),
    headers,
  });

  const json = await data.json();

  return json["token"];
};

export const Register = async ({ email, password }) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  await fetch(`${BACKEND_API}/auth/registration`, {
    method: "post",
    body: JSON.stringify({ email, password }),
    headers,
  });
};
