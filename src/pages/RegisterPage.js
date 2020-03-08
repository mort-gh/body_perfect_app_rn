import React from "react";
import { connect } from "react-redux";
import Register from "../components/AuthForm/Register";
import { register } from "../operations/authorizationOperations";
import CulcScreen from "../components/CulcScreen";

const RegisterPage = props => {
  return (
    <>
      <Register formName="Регистрация" register={props.register} />
    </>
  );
};

export default connect(null, { register })(RegisterPage);
