import { SET_TYPING, REMOVE_TYPING } from "../actionTypes";

const initialState = [];

const typingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TYPING:
      return [...state, action.payload.email];
    case REMOVE_TYPING:
      return state.filter((e) => e !== action.payload.email);
    default:
      return state;
  }
};

export default typingReducer;