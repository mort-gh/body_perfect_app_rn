import React, { Component } from "react";
import { ScrollView, Button, TextInput, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

const styleText = {
  paddingRight: "32%",
  textAlign: "left",
  marginLeft: "10%",
  paddingTop: "50%",
  fontWeight: "bold",
  fontSize: "20px",
  marginBottom: "5%"
};

const styleInput = {
  margin: 15,
  height: 40,
  borderColor: "red",
  borderWidth: 1
};

const initialState = {
  nickname: "",
  password: ""
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
  };
  render() {
    const { nickname, password } = this.state;

    console.log(" REGISTERthis.props", this.props);

    return (
      <ScrollView>
        <TextInput
          id="nickname"
          minLength={3}
          style={styleInput}
          label={"Login *"}
          onChangeText={text => this.handleChange("nickname", text)}
          value={nickname}
        />
        <TextInput
          id="password"
          minLength={6}
          style={{
            borderTopLeftRadius: 20,
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginLeft: "15%",
            marginRight: "15%"
          }}
          label={"Password *"}
          onChangeText={text => this.handleChange("password", text)}
          value={password}
        />
        <Button onPress={this.handleSubmit} title={this.props.formName} />
      </ScrollView>
    );
  }
}
const mapStateToProps = state => state;

export default connect(mapStateToProps)(Register);
