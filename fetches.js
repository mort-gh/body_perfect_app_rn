import axios from "axios";

export const userDailyNormaInfo = async token => {
  try {
    const data = await axios.get(
      "https://slim-moms.goit.co.ua/api/v1/user/",

      {
        headers: { Authorization: token }
      }
    );
    return data.data.user.userData.dailyRate;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCalloriesByCurrentDay = async token => {
  try {
    const data = await axios.get(
      `https://slim-moms.goit.co.ua/api/v1/user/eats/achievement/${Date.now()}`,
      {
        headers: { Authorization: token }
      }
    );
    return data.data.graphData.eatedProducts["0"];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getHistoryUpToDate = async token => {
  try {
    const data = await axios.get(
      `https://slim-moms.goit.co.ua/api/v1/user/eats/achievement/${Date.now()}`,
      {
        headers: { Authorization: token }
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
