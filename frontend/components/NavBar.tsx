import { View, Text, StyleSheet } from "react-native";
import EventList from "./EventList";
import ProfileScreen from "./ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddEvent from "./AddEvent";

const Navigator = createBottomTabNavigator();

const NavBar: React.FC<{}> = () => {
  return (
    <Navigator.Navigator screenOptions={{ headerShown: false }}>
      <Navigator.Screen name="Event List" component={EventList} />
      <Navigator.Screen name="Add Event" component={AddEvent} />
      <Navigator.Screen name="Profile" component={ProfileScreen} />
    </Navigator.Navigator>
  );
};

const styles = StyleSheet.create({
  navBar: {
    position: "absolute",
    height: 100,
    backgroundColor: "#fff",
    // zIndex: 1000,
  },
});

export default NavBar;
