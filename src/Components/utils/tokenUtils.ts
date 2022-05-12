export function getStoredToken(): string {
  if (localStorage.getItem("token") === null) {
    localStorage.setItem("token", "");
  }
  return localStorage.getItem("token") as string;
}

export default function getAuthHeaders(): any {
  return { headers: { Authorization: getStoredToken() } };
}
