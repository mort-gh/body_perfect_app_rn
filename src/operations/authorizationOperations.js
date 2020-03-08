import axios from "axios";

export const register = (registerData, { userData }) => async dispatch => {
  const getPost = { ...registerData, userData };

  await axios.post(
    "https://slim-moms.goit.co.ua/api/v1/register",
    getPost,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  ).then(data=> dispatch({ type: "REGISTER_SUCCESS", payload: data.data.user }))
  .catch(data=>dispatch({type:"ERROR_REG"}))
};

export const login = registerData => async dispatch => {
 await axios.post(
    "https://slim-moms.goit.co.ua/api/v1/login",
    registerData,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  ).then(data=>   dispatch({ type: "LOGIN_SUCCESS", payload: data.data.user }))
  .catch(data=>dispatch({type:"ERROR_LOGIN"}))


};

export const logout = () => async dispatch => {
  dispatch({ type: "LOGOUT_SUCCESS" });
};

export const postInfo = userData => async dispatch => {
  const data = await axios.put(
    "https://slim-moms.goit.co.ua/api/v1/user",
    userData,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};
