import React, { Component } from "react";
import { connect } from "react-redux";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Text, View, TouchableOpacity, Button } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const stylesModal = {
  width: "100%",
  height: "200%",
  backgroundColor: "red",
  position: "absolute"
};

class CalcModalResult extends Component {
  state = { isVisible: true };
  handleClose = () => {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));
  };

  render() {
    console.log(this.props);

    return (
      <>
        {this.state.isVisible && (
          <View style={stylesModal}>
            <Text>
              Ваша рекомендуемая суточная норма калорий составляет:{" "}
              {this.props.dailyRate}
            </Text>
            <Text> Продукты, которые вам не рекомендуется употреблять: </Text>
            <TouchableOpacity
              onPress={this.handleClose}
              style={{ position: "absolute", top: 27, left: 10, padding: 10 }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                color={"#e1f500"}
                size={14}
              />
            </TouchableOpacity>

            {!this.props.isAuth && (
              <TouchableOpacity
                onPress={() => {
                  this.props.JumpTo.jumpTo("Регистрация");
                }}
              >
                <Text>Go Reg</Text>
              </TouchableOpacity>
            )}
            {/* <Button onPress={this.handleClose} title='Close'/> */}
          </View>
        )}
      </>
    );
  }
}
const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(CalcModalResult);
