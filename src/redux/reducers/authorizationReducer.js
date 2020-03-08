import { combineReducers } from "redux";
import { AsyncStorage } from "react-native";

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
      return null;

    default:
      return state;
  }
};

const error = (state = {logError:false,regError:false}, action) => {
  switch (action.type) {
    case "ERROR_LOGIN":
      return {...state, logError:true};
      case "ERROR_REG":
    return {...state, regError:true};
    case "CLEARE_ERROR":
      return {logError:false, regError:false}
    default:
      return state;
  }
};

const reload = (state = false, action) => {
  switch (action.type) {
    case "RELOAD_PAGE":
      return (state = true);
    case "STOPLOAD_PAGE":
      return (state = false);
    default:
      return state;
  }
};

export default combineReducers({
  isAuthenticated,
  user,
  token,
  error,
  reload
});
