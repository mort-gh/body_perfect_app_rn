import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarAdd = ({ selectedDate }) => (
  <>
    <View style={styles.wrap}>
      <View style={styles.text}>
        <Text>Выберите дату</Text>
      </View>
      <Calendar
        onDayPress={day => {
          selectedDate(day);
        }}
      />
      <View style={styles.conTen} />
    </View>
  </>
);

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    alignSelf: "stretch",
    width: "100%",
    top: 0
  },
  text: {
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 10,
    fontSize: 20
  },
  conTen: {
    height: 500,
    backgroundColor: "white"
  }
});

export default CalendarAdd;
