import React from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { logout } from "../operations/authorizationOperations";

const ButtonScreen = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.logout();
      }}
    >
      <Text>Log Out</Text>
      <MaterialCommunityIcons name="logout" color={"#e1f500"} size={14} />
    </TouchableOpacity>
  );
};

export default connect(null, { logout })(ButtonScreen);
