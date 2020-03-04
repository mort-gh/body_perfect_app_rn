import React from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarAdd = ({ selectedDate }) => (
  <>
    <View style={styles.wrap}>
      <View style={{ top: "20%" }}>
        <Calendar
          onDayPress={day => {
            selectedDate(day);
          }}
        />
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    alignSelf: "stretch",
    backgroundColor: "gray",
    width: "100%"
  }
});

export default CalendarAdd;
