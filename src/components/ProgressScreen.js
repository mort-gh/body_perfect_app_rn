import React from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import ButtonScreen from "./ButtonScreen";

function ProgressScreen(props) {
  return (
    <View>
      <View
        style={{
          alignSelf: "stretch",
          height: 70,
          backgroundColor: "tomato",
          alignItems: "center",
          padding: 0,
          margin: 0
        }}
      >
        <TouchableOpacity
          onPress={props.navigation.goBack}
          style={{ position: "absolute", top: 27, left: 10, padding: 10 }}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            color={"#e1f500"}
            size={14}
          />
        </TouchableOpacity>
        <Text style={{ paddingTop: 35, color: "#e1f500" }}>
          {props.route.name}
        </Text>
        {props.isAuth && <ButtonScreen />}
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(ProgressScreen);
