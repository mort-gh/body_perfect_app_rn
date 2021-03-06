import { combineReducers } from "redux";
import authorizationReducer from "./authorizationReducer";

export const rootReducer = combineReducers({
  auth: authorizationReducer
});
