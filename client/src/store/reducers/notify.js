import { ADD_NOTIFY, REMOVE_NOTIFY } from "../actionTypes";

const initialState = [];

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFY:
      if (state.includes(action.payload.email)) return state;
      else return [...state, action.payload.email];
    case REMOVE_NOTIFY:
      return state.filter((e) => e !== action.payload.email);
    default:
      return state;
  }
};

export default notifyReducer;
