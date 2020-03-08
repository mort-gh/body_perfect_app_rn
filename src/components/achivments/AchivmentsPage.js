import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView, RefreshControl } from "react-native";
import {
  userDailyNormaInfo,
  getCalloriesByCurrentDay,
  getHistoryUpToDate
} from "../../../fetches";
import { AppLoader } from "../ui/AppLoader";
import { Statistics } from "./Statistics";
import { Chart } from "./Chart";

export const AchivmentsPage = () => {
  const [tableTitle, setTableTitle] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [history, setHistory] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const token = useSelector(state => state.auth.token);
  const reload = useSelector(state => state.auth.reload);
  const dispatch = useDispatch();

  useEffect(() => {
    getStateValues();
  }, [reload]);

  const getStateValues = async () => {
    const dailyNorm = await userDailyNormaInfo(token);
    const dailyConsumed = await getCalloriesByCurrentDay(token);
    const dailyBalance = (await dailyNorm) - dailyConsumed;
    const percentage = (await 100) / (dailyNorm / dailyConsumed);
    const history = await getHistoryUpToDate(token);
    const labels = history.data.graphData.labels;
    const eatedProducts = history.data.graphData.eatedProducts;
    const dailyRate = history.data.graphData.dailyRate;

    const tableTitleValues = [
      "Дневная норма",
      "Употреблено",
      "Осталось",
      "% от нормы"
    ];

    const tableDataValues = await [
      [`${Math.round(dailyNorm)} ккал`],
      [`${Math.round(dailyConsumed)} ккал`],
      [`${Math.round(dailyBalance)} ккал`],
      [`${Math.round(percentage)} %`]
    ];

    const historyForChart = await [
      {
        seriesName: "series1",
        data: await putValuesToChart(labels, eatedProducts).reverse(),
        color: "#fc842c"
      },
      {
        seriesName: "series2",
        data: await putValuesToChart(labels, dailyRate).reverse(),
        color: "#284060"
      }
    ];

    setTableTitle(tableTitleValues);
    setTableData(tableDataValues);
    setHistory(historyForChart);
    setIsLoad(false);

    dispatch({ type: "STOPLOAD_PAGE" });
  };

  const putValuesToChart = (x, y) =>
    x.map((value, idx) => ({
      x: value,
      y: Number(y[idx])
    }));

  const refreshTable = async () => {
    await setRefresh(true);
    await getStateValues();
    await setRefresh(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={["#1e90ff"]}
          refreshing={refresh}
          onRefresh={refreshTable}
        />
      }
    >
      {isLoad ? (
        <AppLoader />
      ) : (
        <Statistics tableTitle={tableTitle} tableData={tableData} />
      )}
      <Chart history={history} />
    </ScrollView>
  );
};
