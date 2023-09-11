import {MD5} from "crypto-js";
import axios from "axios";

axios.defaults.baseURL = "https://no23.lavina.tech";
export const signUpApi = async (payload: {
  name: string;
  email: string;
  key: string;
  secret: string;
}) =>
  await axios.post(
    `/signup`,
    {
      name: payload.name,
      email: payload.email,
      key: payload.key,
      secret: payload.secret,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
export const getAllBooks = async () =>
  axios.get(`/books`, {
    headers: {
      "Content-Type": "application/json",
      Key: JSON.parse(localStorage.getItem("auth") ?? "")?.k,
      Sign: MD5(
        `GET/books${JSON.parse(localStorage.getItem("auth") ?? "")?.s}`
      ).toString(),
    },
  });
export const createBookApi = async (payload: { isbn: string }) =>{
console.log("hash", {
  "Content-Type": "application/json",
  Key: JSON.parse(localStorage.getItem("auth") ?? "")?.k,
  Sign: MD5(
    `POST/books{"isbn":"${payload.isbn}"}${
      JSON.parse(localStorage.getItem("auth") ?? "")?.s
    }`
  ).toString(),
});

  return axios.post(
    `/books`,
    { isbn: payload.isbn },
    {
      headers: {
        "Content-Type": "application/json",
        Key: JSON.parse(localStorage.getItem("auth") ?? "")?.k,
        Sign: MD5(
          `POST/books{"isbn":"${payload.isbn}"}${
            JSON.parse(localStorage.getItem("auth") ?? "")?.s
          }`
        ).toString(),
      },
    }
  );
}
export const deleteBookApi = async (payload: { id: string }) =>
  axios.delete(`/books/${payload.id}`, {
    headers: {
      Key: JSON.parse(localStorage.getItem("auth") ?? "")?.k,
      Sign: MD5(
        `DELETE/books/${payload.id}${
          JSON.parse(localStorage.getItem("auth") ?? "")?.s
        }`
      ).toString(),
    },
  });
export const editBookApi = async (payload: { status: number; id: string }) =>
  axios.patch(
    `/books/${payload.id}`,
    { status: payload.status },
    {
      headers: {
        Key: JSON.parse(localStorage.getItem("auth") ?? "")?.k,
        Sign: MD5(
          `PATCH/books/${payload.id + `{"status":${payload.status}}`}${
            JSON.parse(localStorage.getItem("auth") ?? "")?.s
          }`
        ).toString(),
      },
    }
  );
