const JWT = "jwt";

export interface DecodedJwt {
  username: string;
  email: string;
  userID: string;
}
export const setToken = (token: string) => {
  sessionStorage.setItem(JWT, token);
};
export const getToken = () => sessionStorage.getItem(JWT);
export const removeToken = () => sessionStorage.removeItem(JWT);
export const isLoggedIn = () => !!getToken();
