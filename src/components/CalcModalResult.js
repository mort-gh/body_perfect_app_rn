import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  Button
} from "react-native";
import shortid from "shortid";
import { Ionicons } from "@expo/vector-icons";

class CalcModalResult extends Component {
  state = { isVisible: true };

  handleClose = () => {
    this.setState(prevState => ({
      isVisible: !prevState.isVisible
    }));
  };

  pushAlertBeforeRegister = () => {
    Alert.alert(
      "Вы не вошли в аккаунт",
      "Чтобы продолжить, нужно пройти регистрацию или войти",
      [
        {
          text: "Отменить",
          style: "cancel"
        },
        {
          text: "Авторизироваться",
          onPress: () => this.props.navigation.navigate("Авторизация")
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    let counter = 1;
    return (
      <>
        {this.state.isVisible && (
          <View style={styles.wrap}>
            <Text style={styles.title}>
              Ваша рекомендуемая суточная норма калорий составляет:
            </Text>
            <Text style={styles.callories}>
              {this.props.userData.dailyRate}{" "}
              <Text style={styles.callories}>ккал</Text>
            </Text>
            <Text style={styles.titleProducts}>
              Продукты, которые вам не рекомендуется употреблять:
            </Text>

            <FlatList
              data={this.props.userData.productsByBloodType}
              renderItem={({ item }) => (
                <View>
                  <Text></Text>
                  <Text>
                    {counter++}. {item}
                  </Text>
                </View>
              )}
              keyExtractor={() => shortid()}
            />

            {!this.props.isAuth && (
              <>
                {/* <TouchableOpacity
                  style={styles.buttonBack}
                  onPress={this.handleClose}
                >
                  <Ionicons name="ios-arrow-back" size={30} color="orange" />
                  <Text style={styles.buttonBackText}>Вернуться</Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate("Авторизация")}
                >
                  <Text style={styles.textButton}>Начать худеть</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </>
    );
  }
}
const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  userData: state.auth.user.userData
});

export default connect(mapStateToProps)(CalcModalResult);

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontFamily: "open-bold",
    fontSize: 18,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 50,
    color: "#444"
  },
  callories: {
    fontFamily: "open-bold",
    fontSize: 40,
    color: "orange",
    marginBottom: 50
  },
  titleProducts: {
    fontFamily: "open-regular",
    fontSize: 16,
    textAlign: "center",
    color: "#444",
    marginBottom: 30
  },
  products: {
    fontFamily: "open-regular"
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 10,
    borderRadius: 30,
    width: 200,
    marginBottom: 100
  },
  textButton: {
    textAlign: "center",
    color: "white",
    fontFamily: "open-bold"
  },
  buttonBack: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  buttonBackText: {
    marginLeft: 10,
    color: "orange"
  }
});
