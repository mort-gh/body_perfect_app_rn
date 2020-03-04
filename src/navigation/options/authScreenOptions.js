import { Platform } from "react-native";

export const authScreenOptions = title => ({
  headerTitle: title,

  headerStyle: {
    backgroundColor: Platform.OS === "ios" ? "white" : "orange"
  },

  headerTintColor: Platform.OS === "ios" ? "orange" : "white"
});
