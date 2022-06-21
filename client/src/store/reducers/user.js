import { AUTH, LOGOUT } from "../actionTypes";

const initialState = {
  token: localStorage.getItem("Auth") || null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("Auth", action.payload.token);
      return { token: action.payload.token };
    case LOGOUT:
      localStorage.removeItem("Auth");
      return { token: null };
    default:
      return state;
  }
};

export default userReducer;
