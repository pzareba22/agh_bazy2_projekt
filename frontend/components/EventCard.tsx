import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { IEvent } from "../constants";
import moment from "moment";
import { formatStartEndDate } from "../utils/dateUtils";
import { calculateWidthPercent } from "../utils/numberUtils";

interface IProps {
  // title: string;
  event: IEvent;
  click: () => void;
}

const EventCard: React.FC<IProps> = ({ event, click }) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftBox}>
        <Text style={styles.title}>{event.name}</Text>
      </View>
      <View style={styles.rightBox}>
        <Text style={styles.date}>
          {formatStartEndDate(event.startDate, event.endDate)}
        </Text>
      </View>
      <View style={{ flexDirection: "row-reverse", paddingLeft: 18 }}>
        <Text style={styles.address}>{event.location.city}</Text>
      </View>
      <View style={{ height: 200 }}>
        <TouchableHighlight onPress={() => click()}>
          <Image
            source={{
              uri:
                event.imageUrl ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaUDoozqvl-gyrNavvRjOCHiNyYZQ4qr3C8g&usqp=CAU",
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </TouchableHighlight>
      </View>
      <View style={styles.flexBox}>
        <View style={styles.progress1}>
          <View
            style={{
              backgroundColor: "#01ca84",
              borderRadius: 12,
              width: `${calculateWidthPercent(event)}%`,
              height: 20,
            }}
          />
        </View>
        <Text>
          {event.participants.length}/{event.maxParticipants} (
          {calculateWidthPercent(event)}%)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fbfbfb",
    // alignItems: "center",
    // justifyContent: "center",
    borderRadius: 10,
    width: 350,
    minHeight: 360,
    margin: 15,
    shadowColor: "#64646f",
    shadowOffset: { height: 4, width: -2 },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    elevation: 3,
    position: "relative",
  },
  rightBox: {
    flexDirection: "row-reverse",
    paddingLeft: 18,
    paddingBottom: 1,
  },
  leftBox: {
    padding: 18,
    paddingTop: 9,
    paddingBottom: 4,
  },
  title: {
    color: "#019863",
    fontSize: 22,
  },
  date: {
    color: "#019863",
    fontSize: 20,
  },
  address: {
    color: "gray",
    marginBottom: 7,
  },
  flexBox: {
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 60,
    paddingVertical: 20,
  },
  progress1: {
    width: "90%",
    height: 20,
    borderRadius: 12,
    backgroundColor: "lightgray",
  },
});

export default EventCard;
