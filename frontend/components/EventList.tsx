import { StatusBar } from "expo-status-bar";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import EventCard from "./EventCard";
import { useNavigation } from "@react-navigation/native";
import { IEvent, IUser } from "../constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "../axiosconfig";
import { connect } from "react-redux";
import { setEventListAction } from "../actions";
import { useEffect } from "react";

interface IProps {
  events: IEvent[];
  user: IUser;
  setEventList: (eventList: IEvent[]) => void;
}
const EventList: React.FC<IProps> = ({ events = [], setEventList, user }) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<{ Details: { eventId: string } }>
    >();

  useEffect(() => {
    fetchEventList(setEventList);
  }, []);

  const fetchEventList = (dispatch: (eventList: IEvent[]) => void) => {
    axios
      .get(`/events`)
      .then(({ data }) => {
        dispatch(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Błąd", "Nie udało się pobrać listy wydarzeń. ", [
          { text: "OK" },
        ]);
        return;
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {(events || []).map((entry, i) => {
          return (
            <EventCard
              event={entry}
              key={i}
              click={() =>
                navigation.navigate("Details", { eventId: entry.id })
              }
            />
          );
          // return <EventCard event={entry} key={i} />;
        })}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 35,
  },
});
const mapStateAsProps = (state: any) => ({
  events: state.events,
});
const mapDispatchToProps = (dispatch: any) => ({
  setEventList: (eventList: IEvent[]) =>
    dispatch(setEventListAction(eventList)),
});

export default connect(mapStateAsProps, mapDispatchToProps)(EventList);
