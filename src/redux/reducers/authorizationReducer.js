import { combineReducers } from "redux";

const isAuthenticated = (state = false, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      return true;

    case "LOGOUT_SUCCESS":
      return false;
    default:
      return state;
  }
};

const user = (state = { userData: "" }, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
    case "POST_SUCCESS":
      return { ...state, userData: action.payload };
    case "GET_USER":
      return { ...state, userData: action.payload };
    case "LOGOUT_SUCCESS":
      return {};
    default:
      return state;
  }
};

const token = (state = null, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
    case "POST_SUCCESS":
      return action.payload.token;
    case "LOGOUT_SUCCESS":
      console.log("LOGOUT_SUCCESS");
      return null;
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  isAuthenticated,
  user,
  token,
  error
});
