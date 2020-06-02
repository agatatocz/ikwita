import { http, endpoints } from "services/http";

export const login = (username: string, password: string) =>
  http.post(endpoints.login, {
    username,
    password,
  });
