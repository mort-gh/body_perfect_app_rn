import React from "react";
import { View, Text } from "react-native";
import ButtonScreen from "./ButtonScreen";
import { connect } from "react-redux";

function DiaryScreen(props) {
  return (
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
      <Text style={{ paddingTop: 35, color: "#e1f500" }}>
        {props.route.name}
      </Text>
      {props.isAuth && <ButtonScreen />}
    </View>
  );
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(DiaryScreen);
