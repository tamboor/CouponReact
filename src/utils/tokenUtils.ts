import { AxiosResponse } from "axios";

export function getStoredToken(): string {
  // if (localStorage.getItem("token") === null) {
  //   localStorage.setItem("token", "");
  // }
  return localStorage.getItem("token") as string;
}

export function setStoredToken(res: AxiosResponse): void {
  // res.headers.A
  console.log(res.headers.authorization);
  const headers = res.headers;
  localStorage.setItem("token", headers.authorization);
}

export default function getAuthHeaders(): any {
  const token = getStoredToken();
  return { headers: { Authorization: getStoredToken() } };
}
