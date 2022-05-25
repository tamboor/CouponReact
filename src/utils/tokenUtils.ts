import { AxiosResponse } from "axios";

export function getStoredToken(): string {
  // if (localStorage.getItem("token") === null) {
  //   localStorage.setItem("token", "");
  // }
  return localStorage.getItem("token") as string;
}

export function setStoredToken(res: AxiosResponse): void {
  // res.headers.A
  const headers = res.headers;
  return localStorage.setItem("token", headers.authorization);
}

export default function getAuthHeaders(): any {
  return { headers: { Authorization: getStoredToken() } };
}
