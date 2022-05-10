import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { useState } from "react";
import { Button } from "@rneui/base";
import moment from "moment";
import { connect } from "react-redux";
import { IEvent, IUser } from "../constants";
import LogIn from "./LogIn";
import axios from "../axiosconfig";
import { setEventListAction } from "../actions";

interface IProps {
  user: IUser;
  setEvents: (eventList: Array<IEvent>) => void;
}

const handleChange = (key: string, value: string, state: any, setData: any) => {
  setData({
    ...state,
    [key]: value,
  });
};

const submitData = (data: any, dispatch: any) => {
  if (!moment(data.bDate).isValid() || !moment(data.eDate).isValid()) {
    Alert.alert("Error", "Niepoprawna data", [{ text: "Ok" }]);
  }
  const newData = {
    startDate: moment(data.bDate).toDate(),
    endDate: moment(data.eDate).toDate(),
    maxParticipants: parseInt(data.peopleNeeded),
    name: data.name,
    description: data.description,
    location: {
      city: data.city,
      postalCode: data.postCode,
      address: data.street,
    },
    imageUrl: data.image,
    organizerUsername: data.username,
  };
  console.log(newData);
  axios
    .post("/events", newData, {
      headers: {
        Authorization: `Bearer ${data.JWT}`,
      },
    })
    .then((res) => {
      console.log(res);

      Alert.alert("Sukces", "Pomyślnie dodano wydarzenie", [{ text: "OK" }]);

      axios
        .get(`/events`)
        .then(({ data }) => {
          dispatch(data);
        })
        .catch((err) => {
          console.log(err);
          // Alert.alert("Błąd", "Nie udało się pobrać listy wydarzeń. ", [
          //   { text: "OK" },
          // ]);
          return;
        });
    })
    .catch((err) => {
      console.log(err);
      Alert.alert("Error", "Nie udało się dodać wydarzenia", [{ text: "OK" }]);
    });
};

const AddEvent: React.FC<IProps> = ({ user, setEvents }) => {
  if (user.username == "Anonim") {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LogIn />
      </View>
    );
  }

  const [data, setData] = useState<any>({
    name: "",
    bDate: "",
    eDate: "",
    city: "",
    postCode: "",
    street: "",
    peopleNeeded: "",
    description: "",
    image: "",
    username: user.username,
    JWT: user.JWT,
  });
  return (
    <View style={styles.addEvent}>
      <Text style={styles.header}>Dodaj wydarzenie</Text>
      <TextInput
        style={styles.input}
        placeholder="Nazwa wydarzenia"
        onChangeText={(text) => handleChange("name", text, data, setData)}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "85%",
        }}
      >
        <TextInput
          style={[styles.input, { width: "48%" }]}
          placeholder="Data rozpoczęcia"
          onChangeText={(text) => handleChange("bDate", text, data, setData)}
        />
        <TextInput
          style={[styles.input, { width: "48%" }]}
          placeholder="Data zakończenia"
          onChangeText={(text) => handleChange("eDate", text, data, setData)}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "85%",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={[styles.input, { width: "58%" }]}
          placeholder="Miasto"
          onChangeText={(text) => handleChange("city", text, data, setData)}
        />
        <TextInput
          style={[styles.input, { width: "38%" }]}
          placeholder="Kod pocztowy"
          onChangeText={(text) => handleChange("postCode", text, data, setData)}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Ulica/Szczegółowy adres"
        onChangeText={(text) => handleChange("street", text, data, setData)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ilość potrzebnych ludzi"
        onChangeText={(text) =>
          handleChange("peopleNeeded", text, data, setData)
        }
      />
      <TextInput
        style={[styles.input, { height: 150 }]}
        placeholder="Opis"
        onChangeText={(text) =>
          handleChange("description", text, data, setData)
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Obrazek (url)"
        onChangeText={(text) => handleChange("image", text, data, setData)}
      />
      <View>
        <Button title="Dodaj" onPress={() => submitData(data, setEvents)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addEvent: {
    alignItems: "center",
    // paddingTop: 40,
    justifyContent: "center",
    height: "100%",
  },
  header: {
    fontSize: 26,
    marginBottom: 15,
  },
  input: {
    backgroundColor: "white",
    width: "85%",
    marginBottom: 8,
    borderRadius: 5,
    padding: 5,
  },
});

const mapStateAsProps = (state: any) => ({
  user: state.user,
});

const mapDispatchAsProps = (dispatch: any) => ({
  setEvents: (eventList: Array<IEvent>) =>
    dispatch(setEventListAction(eventList)),
});

// export default AddEvent;
export default connect(mapStateAsProps, mapDispatchAsProps)(AddEvent);
