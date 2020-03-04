import React from "react";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import TabMenu from "../src/components/TabMenu";
import AuthFrom from "../src/components/AuthForm/authForm";

const AppContainer = props => {
  return (
    <>
      <NavigationContainer>
        {props.isAuth ? <TabMenu /> : <AuthFrom />}
      </NavigationContainer>
    </>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(AppContainer);
