import jwt_decode from "jwt-decode";

export const getDetails = (token) => {
  return jwt_decode(token);
};
