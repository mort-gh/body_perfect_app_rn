import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const AuthPage = ({ navigation }) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>
        Чтобы продолжить, необходимо авторизироваться
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Регистрация")}
      >
        <View style={styles.iconBlock}>
          <Ionicons
            style={styles.icon}
            name="ios-person-add"
            size={25}
            color="white"
          />
        </View>
        <Text style={styles.buttonText}>Регистрация</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Войти")}
      >
        <View style={styles.iconBlockLogin}>
          <Ionicons
            style={styles.icon}
            name="ios-person"
            size={25}
            color="white"
          />
        </View>
        <Text style={styles.buttonText}>Войти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "#444"
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: 30,
    width: 200,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontFamily: "open-bold"
  },
  iconBlock: {
    borderColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 25,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30,
    marginLeft: 10
  },
  iconBlockLogin: {
    borderColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 25,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 50,
    marginLeft: 10
  }
});
