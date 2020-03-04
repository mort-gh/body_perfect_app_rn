import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import DiaryScreen from "../DiaryScreen";
import CulcScreen from "../CulcScreen";
import RegisterPage from "../../pages/RegisterPage";
import { View } from "react-native";
import LoginPage from "../../pages/LoginPage";
import InitialInfo from "./../initialInfo/InitialInfo";

const Tab = createMaterialBottomTabNavigator();

function AuthFrom() {
  return (
    <Tab.Navigator
      initialRouteName="Culc"
      activeColor="#e1f500"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: "tomato" }}
    >
      <Tab.Screen
        name="Culc"
        component={InitialInfo}
        options={{
          headerTitle: "culc",
          tabBarLabel: "Culc",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerTitle: "Login",
          tabBarLabel: "Login",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="login" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Regist"
        component={RegisterPage}
        options={{
          tabBarLabel: "Regist",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="new-box" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
export default AuthFrom;
