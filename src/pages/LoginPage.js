import React from "react";
import { connect } from "react-redux";
import Register from "../components/AuthForm/Register";
import { login } from "../operations/authorizationOperations";
import CulcScreen from "../components/CulcScreen";

const LoginPage = props => {
  return (
    <>
      <Register formName="Войти" register={props.login} />
    </>
  );
};

export default connect(null, { login })(LoginPage);
