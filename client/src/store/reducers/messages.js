import { updateSeen } from "../../utils/util";
import { GET_MESSAGES, ADD_MESSAGE, UPDATE_SEEN } from "../actionTypes";

const initialState = {};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return action.payload.messages;
    case ADD_MESSAGE:
      const email = action.payload.email;
      return { ...state, [email]: [...state[email], action.payload.message] };
    case UPDATE_SEEN:
      const updated = updateSeen(action.payload.email,state, action.payload.id);
      return updated;
    default:
      return state;
  }
};

export default messageReducer;
