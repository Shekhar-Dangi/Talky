import { equals } from "../../utils/equals";
import { ADD_ACTIVE, REMOVE_ACTIVE, SET_ACTIVE } from "../actionTypes";

const initialState = [];

const activeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE:
      return action.payload.users;
    case ADD_ACTIVE:
      let check = false;
      state.forEach((elem) => {
        if (equals(elem, action.payload.newUser)) check = true;
      });
      return check ? state : [...state, action.payload.newUser];
      break;
    case REMOVE_ACTIVE:
      return state.filter((elem) => !equals(action.payload.user, elem));
    default:
      return state;
      break;
  }
};
export default activeReducer;
