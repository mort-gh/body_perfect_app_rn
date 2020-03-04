import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import DiaryScreen from "./DiaryScreen";
import ProgressScreen from "./ProgressScreen";
import CulcScreen from "./CulcScreen";

const Tab = createMaterialBottomTabNavigator();

function TabMenu() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      activeColor="#e1f500"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: "tomato" }}
    >
      <Tab.Screen
        name="Дневник"
        component={DiaryScreen}
        options={{
          headerTitle: "Дневник",
          tabBarLabel: "Дневник",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="note" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Калькулятор"
        component={CulcScreen}
        options={{
          tabBarLabel: "Калькулятор",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calculator"
              color={color}
              size={size}
            />
          )
        }}
      />
      <Tab.Screen
        name="Достижения"
        component={ProgressScreen}
        options={{
          tabBarLabel: "Достижения",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="star" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
export default TabMenu;
