import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import { styles } from "./AuthForm.styles";

const initialState = {
  nickname: "",
  password: "",
  loginError: "",
  passwordError: "",
  openERROR: true
};

class Register extends Component {
  state = {
    ...initialState
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.props.register(this.state, this.props.auth.user);

    this.setState({
      ...initialState
    });
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
    setTimeout(() => {
      if (this.state.nickname.length > 0 && this.state.nickname.length < 5) {
        this.setState({ loginError: "Nickname must be at least 5 characters" });
      } else if (this.state.nickname.length > 20) {
        this.setState({
          loginError: "Nickname must not contain more than 20 characters!"
        });
      } else if (
        this.state.password.length > 0 &&
        this.state.password.length < 6
      ) {
        this.setState({
          passwordError: "Password must be at least 6 characters!"
        });
      } else if (this.state.password.length > 20) {
        this.setState({
          passwordError: "Password must not contain more than 20 characters!"
        });
      } else {
        this.setState({ loginError: "", passwordError: "" });
      }
    }, 0);
  };

  render() {
    this.props.auth.error.logError &&
      setTimeout(() => {
        this.props.clearError();
      }, 3500);
    this.props.auth.error.regError &&
      setTimeout(() => {
        this.props.clearError();
      }, 3500);

    const { nickname, password, passwordError, loginError } = this.state;
    return (
      <View style={styles.wrap}>
        {this.props.auth.error.logError && (
          <Text style={{ color: "salmon", fontSize: 18, fontWeight:'bold', textAlign: 'center', padding: 10 }}>
            Проверьте логин и пароль или такой аккаунт не найден
          </Text>
        )}

        {this.props.auth.error.regError && (
          <Text style={{ color: "salmon", fontSize: 20, fontWeight:'bold', fontWeight:'bold', textAlign: 'center', padding: 10  }}>
            Проверьте логин и пароль или такой аккаунт уже существует
          </Text>
        )}

        <TextInput
          id="nickname"
          minLength={3}
          style={styles.input}
          label={"Login *"}
          placeholder="Логин"
          returnKeyType="done"
          onChangeText={text => this.handleChange("nickname", text)}
          value={nickname}
        />

        <Text style={{ fontSize: 12, color: "salmon" }}>{loginError}</Text>

        <TextInput
          id="password"
          minLength={6}
          style={styles.input}
          label={"Password *"}
          placeholder="Пароль"
          secureTextEntry={true}
          returnKeyType="done"
          onChangeText={text => this.handleChange("password", text)}
          value={password}
        />

        <Text style={{ fontSize: 12, color: "salmon" }}>{passwordError}</Text>

        <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>{this.props.formName}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  clearError: () => dispatch({ type: "CLEARE_ERROR" })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
