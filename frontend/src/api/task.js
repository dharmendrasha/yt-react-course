import { BACKEND_API } from "../config";

const headers = new Headers();
headers.append("Content-Type", "application/json");

export const setAuthToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw Error(`Token not found`);
  }

  headers.append("token", token);
};

export const list = async () => {
  const res = await fetch(`${BACKEND_API}`, { headers });
  const json = await res.json();
  const arrData = json["data"];
  return arrData;
};

export const post = async (task) => {
  await fetch(`${BACKEND_API}/create`, {
    method: "post",
    body: JSON.stringify({ task: task }),
    headers,
  });
};

export const get = async (id) => {};

export const put = async (id, task) => {
  await fetch(`${BACKEND_API}/${id}`, {
    method: "put",
    body: JSON.stringify({ task }),
    headers,
  });
};

export const del = async (id) => {
  await fetch(`${BACKEND_API}/${id}`, { method: "delete", headers });
};
