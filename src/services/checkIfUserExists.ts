import { http, endpoints } from "services/http";

export const checkIfUserExists = (userName: string) =>
  http.get(endpoints.exist, {
    params: {
      username: userName,
    },
  });
