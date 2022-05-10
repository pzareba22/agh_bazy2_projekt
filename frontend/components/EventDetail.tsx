import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { formatStartEndDate } from "../utils/dateUtils";
import { calculateWidthPercent } from "../utils/numberUtils";
import { IEvent, IUser } from "../constants";
import { connect } from "react-redux";
import axios from "../axiosconfig";
import { setEventListAction } from "../actions";

interface IProps {
  route: {
    params: {
      eventId: string;
    };
  };
  user: IUser;
  events: IEvent[];
  setEventList: (eventList: IEvent[]) => void;
}

const EventDetails: React.FC<IProps> = ({
  route,
  user,
  events,
  setEventList,
}) => {
  const { eventId } = route.params;

  const event = events.find(({ id }) => eventId === id) || ({} as IEvent);

  const loggedInUser = !!user && !!user.username && user.username != "Anonim";

  const userExistInEvent =
    loggedInUser &&
    !!(event?.participants || []).find(
      ({ participantUsername }) => participantUsername === user.username
    );

  const joinEvent = (dispatch: (eventList: IEvent[]) => void) => {
    axios
      .post(
        `/events/${event.id}/join`,
        { participantUsername: user.username },
        {
          headers: {
            Authorization: `Bearer ${user.JWT}`,
          },
        }
      )
      .then(({ data }) => {
        Alert.alert("Sukces!", "Dołączyłeś do wydarzenia!", [{ text: "OK" }]);
        fetchEventList(dispatch);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Błąd", "Nie udało się dołączyć do eventu. ", [
          { text: "OK" },
        ]);
        return;
      });
  };

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
    <View>
      {event && (
        <>
          <View style={{ height: 280 }}>
            <Image
              source={{
                uri:
                  event.imageUrl ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaUDoozqvl-gyrNavvRjOCHiNyYZQ4qr3C8g&usqp=CAU",
              }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.eventTitle}>{event.name}</Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.date}>
                {formatStartEndDate(event.startDate, event.endDate, true)}
              </Text>
            </View>

            <View style={styles.horizontalRule} />

            <View style={styles.spaceBetween}>
              <Text style={styles.descriptionHeader}>Ilość osób</Text>
              <Text style={styles.participantsSummary}>
                {event.participants.length} / {event.maxParticipants}
              </Text>
            </View>

            <View style={styles.progress1}>
              <View
                style={{
                  backgroundColor: "#01ca84",
                  borderRadius: 12,
                  width: `${calculateWidthPercent(event)}%`,
                  height: 40,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              />
            </View>

            <Pressable
              style={styles.button}
              onPress={() => {
                joinEvent(setEventList);
              }}
              disabled={!loggedInUser || userExistInEvent}
            >
              <Text style={styles.buttonText}>Zapisz się</Text>
            </Pressable>

            {!loggedInUser && (
              <View style={styles.center}>
                <Text style={styles.loginFirst}>
                  Musisz się zalogować, aby się zapisać na wydarzenie
                </Text>
              </View>
            )}

            {userExistInEvent && (
              <View style={styles.center}>
                <Text style={styles.loginFirst}>
                  Zapisałeś się już na to wydarzenie!
                </Text>
              </View>
            )}

            <View style={styles.horizontalRule} />

            <Text style={styles.descriptionHeader}>Opis akcji:</Text>
            <Text style={styles.description}>{event.description}</Text>

            <View style={styles.horizontalRule} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    padding: 30,
    paddingTop: 10,
  },
  eventTitle: {
    color: "#019863",
    fontSize: 24,
    fontWeight: "bold",
  },
  date: {
    color: "#01ca84",
    fontSize: 20,
  },
  horizontalRule: {
    borderBottomColor: "#01ca84",
    borderBottomWidth: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  spaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  participantsSummary: {
    color: "#019863",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#019863",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  descriptionHeader: {
    color: "#777",
    fontSize: 18,
    marginBottom: 6,
  },
  description: {
    color: "#777",
  },
  progress1: {
    width: "100%",
    height: 40,
    borderRadius: 12,
    backgroundColor: "lightgrey",
    marginTop: 5,
    marginBottom: 5,
  },
  center: {
    justifyContent: "center",
    flexDirection: "row",
  },
  loginFirst: {
    color: "#DC143C",
    maxWidth: 400,
  },
});

const mapStateAsProps = (state: any) => ({
  user: state.user,
  events: state.events,
});
const mapDispatchToProps = (dispatch: any) => ({
  setEventList: (eventList: IEvent[]) =>
    dispatch(setEventListAction(eventList)),
});

export default connect(mapStateAsProps, mapDispatchToProps)(EventDetails);
