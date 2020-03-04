import React, { useState } from "react";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import { store } from "./src/redux/store";
import { fontsLoad } from "./src/components/ui/fonts";
import AppNavigation from "./src/navigation/AppNavigation";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={fontsLoad}
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
