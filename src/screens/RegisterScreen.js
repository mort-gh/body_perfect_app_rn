import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const RegisterScreen = () => {
  return (
    <View style={styles.wrap}>
      <Text>Register Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
