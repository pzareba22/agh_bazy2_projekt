import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import NavBar from "./components/NavBar";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventDetails from "./components/EventDetail";
import RegisterPage from "./components/RegisterPage";

const store = configureStore();

export default function App() {
  const Navigator = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator.Navigator screenOptions={{ headerShown: false }}>
          <Navigator.Screen name="navBar" component={NavBar} />
          <Navigator.Screen
            component={EventDetails}
            name="Details"
            initialParams={{ event: null }}
          />
          <Navigator.Screen name="Register" component={RegisterPage} />
        </Navigator.Navigator>
        {/* <NavBar /> */}
      </NavigationContainer>
    </Provider>
  );
}
