import React, { Component, useState } from "react";
import { Provider, connect } from "react-redux";
import { AppLoading } from "expo";
import { Animated, Easing } from "react-native";
import { store } from "./src/redux/store";
import { localStorage } from "./src/redux/act";
import { fontsLoad } from "./src/components/ui/fonts";
import AppNavigation from "./src/navigation/AppNavigation";

class App extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  state = {
    isReady: false,
    appHasLoaded: false
  };

  componentDidMount() {
    this.setState({
      appHasLoaded: true
    });
    this.handleAnimation();
    setTimeout(() => {
      this.setState({
        appHasLoaded: false
      });
    }, 3000);
  }

  handleAnimation = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease
    }).start();
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={fontsLoad}
          onFinish={() => this.setState({ isReady: true })}
          onError={err => console.log(err)}
        />
      );
    }

    return (
      <Provider store={store}>
        {this.state.appHasLoaded ? (
          <Animated.Image
            source={require("./src/image/pb_loading1.jpg")}
            resizeMode="cover"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: "100%",
              transform: [
                {
                  scaleX: this.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1]
                  })
                },
                {
                  scaleY: this.animatedValue.interpolate({
                    inputRange: [0, 0],
                    outputRange: [0, 1]
                  })
                }
              ]
            }}
          />
        ) : (
          <AppNavigation />
        )}
      </Provider>
    );
  }
}

export default App;
