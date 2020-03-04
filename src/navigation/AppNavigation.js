// dependencies
import React from "react";
import { Platform } from "react-native";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
// screens
import { DiaryScreen } from "../screens/DiaryScreen";
import CulcScreen from "../components/CulcScreen";
import { ProgressScreen } from "../screens/ProgressScreen";
import InitialInfo from "../components/initialInfo/initialInfo";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
// options
import { screenOptions } from "./options/screenOptions";
import { authScreenOptions } from "./options/authScreenOptions";

const StackDiary = createStackNavigator();
function diaryStackScreen() {
  return (
    <StackDiary.Navigator>
      <StackDiary.Screen
        name="DiaryScreen"
        component={DiaryScreen}
        options={screenOptions("Дневник")}
      />
    </StackDiary.Navigator>
  );
}

const StackCalc = createStackNavigator();
function calcStackScreen() {
  return (
    <StackCalc.Navigator>
      <StackCalc.Screen
        name="CalcScreen"
        component={CulcScreen}
        options={screenOptions("Калькулятор")}
      />
    </StackCalc.Navigator>
  );
}

const AuthStackCalc = createStackNavigator();
function authCalcStackScreen() {
  return (
    <AuthStackCalc.Navigator>
      <AuthStackCalc.Screen
        name="CalcScreen"
        component={InitialInfo}
        options={authScreenOptions("Калькулятор")}
      />
    </AuthStackCalc.Navigator>
  );
}

const StackProgress = createStackNavigator();
function progressStackScreen() {
  return (
    <StackProgress.Navigator>
      <StackProgress.Screen
        name="ProgressScreen"
        component={ProgressScreen}
        options={screenOptions("Достижения")}
      />
    </StackProgress.Navigator>
  );
}

const StackLogin = createStackNavigator();
function loginStackScreen() {
  return (
    <StackLogin.Navigator>
      <StackLogin.Screen
        name="Войти"
        component={LoginPage}
        options={authScreenOptions("Войти")}
      />
    </StackLogin.Navigator>
  );
}

const StackRegister = createStackNavigator();
function registerStackScreen() {
  return (
    <StackRegister.Navigator>
      <StackRegister.Screen
        name="Регистрация"
        component={RegisterPage}
        options={authScreenOptions("Регистрация")}
      />
    </StackRegister.Navigator>
  );
}

const AppTabBottomNavigator =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialBottomTabNavigator();

const bottomTabOptions = (label, icon) => ({
  tabBarLabel: label,
  tabBarIcon: info => <Ionicons name={icon} size={25} color={info.color} />
});

const authBottomTab = (
  <>
    <AppTabBottomNavigator.Screen
      name="calcStackScreen"
      component={authCalcStackScreen}
      options={bottomTabOptions("Калькулятор", "ios-calculator")}
    />
    <AppTabBottomNavigator.Screen
      name="loginStackScreen"
      component={loginStackScreen}
      options={bottomTabOptions("Войти", "ios-log-in")}
    />
    <AppTabBottomNavigator.Screen
      name="registerStackScreen"
      component={registerStackScreen}
      options={bottomTabOptions("Регистрация", "ios-person-add")}
    />
  </>
);

const appBottomTab = (
  <>
    <AppTabBottomNavigator.Screen
      name="diaryStackScreen"
      component={diaryStackScreen}
      options={bottomTabOptions("Дневник", "ios-paper")}
    />
    <AppTabBottomNavigator.Screen
      name="calcStackScreen"
      component={calcStackScreen}
      options={bottomTabOptions("Калькулятор", "ios-calculator")}
    />
    <AppTabBottomNavigator.Screen
      name="progressStackScreen"
      component={progressStackScreen}
      options={bottomTabOptions("Достижения", "ios-trending-up")}
    />
  </>
);

function AppNavigation(props) {
  console.log("props.auth.isAuthenticated", props.auth.isAuthenticated);
  return (
    <NavigationContainer>
      <AppTabBottomNavigator.Navigator
        activeColor="white"
        inactiveColor="rgba(255, 255, 255, 0.5)"
        tabBarOptions={{
          activeTintColor: Platform.OS === "ios" ? "orange" : "white"
        }}
        barStyle={{ backgroundColor: "orange" }}
        shifting={true}
      >
        {props.auth.isAuthenticated ? appBottomTab : authBottomTab}
      </AppTabBottomNavigator.Navigator>
    </NavigationContainer>
  );
}

const mSTP = state => state;

export default connect(mSTP)(AppNavigation);
