import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

export const AppLoader = () => (
  <View style={styles.center}>
    <ActivityIndicator size='large' color="orange" />
  </View>
);

const styles = StyleSheet.create({
  center: {
    position:"absolute",
    left:"45%",
    top:"35%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
