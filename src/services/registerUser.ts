import { http, endpoints } from "services/http";

export const registerUser = (
  username: string,
  mail: string,
  password: string
) =>
  http.post(endpoints.register, {
    username,
    mail,
    password,
  });
