import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PureChart from "react-native-pure-chart";
import { Ionicons } from "@expo/vector-icons";

export const Chart = ({ history }) => {
  console.log("history", history);
  return (
    <View style={styles.wrap}>
      <Text style={styles.headerTitle}>
        Динамика употребления калорий за месяц
      </Text>
      <View style={styles.legend}>
        <Text>
          <Ionicons name="ios-git-commit" size={20} color="#284060" />
          &nbsp; Употреблено каллорий
        </Text>
        <Text>
          <Ionicons name="ios-git-commit" size={20} color="#fc842c" />
          &nbsp; Дневная норма
        </Text>
      </View>
      <PureChart data={history} height={150} type="line" />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
    alignItems: "center"
  },
  headerTitle: {
    textAlign: "center",
    fontFamily: "open-bold",
    marginVertical: 30
  },
  legend: {
    marginBottom: 20
  }
});
