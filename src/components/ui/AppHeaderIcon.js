import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

export const AppHeaderIcon = props => {
  return (
    <HeaderButton
      {...props}
      iconSize={24}
      IconComponent={Ionicons}
      color={Platform.OS === "ios" ? "orange" : "white"}
    />
  );
};
