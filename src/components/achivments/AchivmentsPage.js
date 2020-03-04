import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  userDailyNormaInfo,
  getCalloriesByCurrentDay,
  getHistoryUpToDate
} from "../../../fetches";
import { AppLoader } from "../ui/AppLoader";
import { Statistics } from "./Statistics";
import { Chart } from "./Chart";

class AchivmentsPage extends Component {
  state = {
    tableTitle: ["Дневная норма", "Употреблено", "Осталось", "% от нормы"],
    tableData: [],
    loading: true,
    userName: "",
    history: []
  };

  async componentDidMount() {
    const dailyNorm = await userDailyNormaInfo();
    const dailyConsumed = await getCalloriesByCurrentDay();
    const dailyBalance = (await dailyNorm) - dailyConsumed;
    const percentage = (await 100) / (dailyNorm / dailyConsumed);
    const history = await getHistoryUpToDate();

    const labels = history.data.graphData.labels;
    const eatedProducts = history.data.graphData.eatedProducts;
    const dailyRate = history.data.graphData.dailyRate;

    const historyForChart = [
      {
        seriesName: "series1",
        data: this.putValuesToChart(labels, eatedProducts).reverse(),
        color: "#fc842c"
      },
      {
        seriesName: "series2",
        data: this.putValuesToChart(labels, dailyRate).reverse(),
        color: "#284060"
      }
    ];

    await this.setState({
      tableData: [
        [`${Math.round(dailyNorm)} ккал`],
        [`${Math.round(dailyConsumed)} ккал`],
        [`${Math.round(dailyBalance)} ккал`],
        [`${Math.round(percentage)} %`]
      ],
      loading: false,
      history: historyForChart
    });
  }

  putValuesToChart = (x, y) =>
    x.map((value, idx) => ({
      x: value,
      y: Number(y[idx])
    }));

  render() {
    const { tableTitle, tableData, history } = this.state;
    return (
      <ScrollView>
        {this.state.loading ? (
          <AppLoader />
        ) : (
          <Statistics tableTitle={tableTitle} tableData={tableData} />
        )}
        <Chart history={history} />
        <View></View>
      </ScrollView>
    );
  }
}

export default AchivmentsPage;
