import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';



const calendar = ({selectedDate}) => (
  <>
  <View style={{position:"absolute",alignSelf:"stretch", backgroundColor:"gray" ,width:"100%" }}>
    <View style={{top:"20%"}}>
  <Calendar onDayPress={(day) => {selectedDate(day)}}/>
  </View>
  </View>
  </>
);

export default calendar;