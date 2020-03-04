import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Platform, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { AppHeaderIcon } from "../../components/ui/AppHeaderIcon";
import { logout } from "../../operations/authorizationOperations";

export const screenOptions = title => {
  const state = useSelector(state => state);
  const userName = state.auth.user.userData.nickname;
  const dispatch = useDispatch();

  return {
    headerTitle: title,

    headerStyle: {
      backgroundColor: Platform.OS === "ios" ? "white" : "orange"
    },

    headerTintColor: Platform.OS === "ios" ? "orange" : "white",

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        {Platform.OS !== "ios" && (
          <Item title={userName} onPress={() => dispatch(logout())} />
        )}
        <Item
          title="Take photo"
          iconName="ios-exit"
          onPress={() => {
            Alert.alert(
              "Выход из аккаунта",
              "Уверены, что хотите выйти?",
              [
                {
                  text: "Отмена",
                  onPress: () => console.log("Отмена - выход из приложения"),
                  style: "cancel"
                },
                {
                  text: "Выйти",
                  onPress: () => {
                    console.log("Подтверждение - выход из приложения");
                    dispatch(logout());
                  },
                  style: "destructive"
                }
              ],
              { cancelable: false }
            );
          }}
        />
      </HeaderButtons>
    ),

    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        {Platform.OS === "ios" && <Item title={userName} onPress={() => {}} />}
      </HeaderButtons>
    )
  };
};
