import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTU4ZTY4OWY0ZTlhNjQxNjE3MjkwNTkiLCJjcmVhdGVkRGF0ZSI6MTU4Mjg4NTA2NjI5MSwiZXhwIjoxNTg1NDc3MDY2fQ.ghfW0lq_eEwypDijVd3cKI5pPXovNyX9YStkUdbE3qo";

const headersToken = {
  headers: { Authorization: token }
};

const headersContentType = {
  headers: {
    "Content-Type": "application/json"
  }
};

const user = {
  nickname: "Nikola",
  password: "password111111"
};

export const login = async () => {
  try {
    const data = await axios.post(
      "https://slim-moms.goit.co.ua/api/v1/login",
      user,
      headersContentType
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const data = await axios.get(
      "https://slim-moms.goit.co.ua/api/v1/user/",

      headersToken
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const userDailyNormaInfo = async () => {
  try {
    const data = await axios.get(
      "https://slim-moms.goit.co.ua/api/v1/user/",

      headersToken
    );
    return data.data.user.userData.dailyRate;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCalloriesByCurrentDay = async () => {
  try {
    const data = await axios.get(
      `https://slim-moms.goit.co.ua/api/v1/user/eats/achievement/${Date.now()}`,
      headersToken
    );
    return data.data.graphData.eatedProducts["0"];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getHistoryUpToDate = async () => {
  try {
    const data = await axios.get(
      `https://slim-moms.goit.co.ua/api/v1/user/eats/achievement/${Date.now()}`,
      headersToken
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
