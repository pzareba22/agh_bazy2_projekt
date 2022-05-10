import {View, Text, TextInput, StyleSheet, Alert, Button, Image} from "react-native";
import { IUser } from "../constants";
import axios from "../axiosconfig";
import { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions";
import { useNavigation } from "@react-navigation/native";

interface IProps {
  logIn: (user: IUser) => void;
}

let navigation: any;

const submitData = (
  username: string,
  password: string,
  password2: string,
  fullName: string,
  phone: string,
  eMail: string,
  dispatch: (user: IUser) => void
) => {
  if (username == "") {
    Alert.alert("Błąd", "Podaj nazwę użytkownika", [{ text: "OK" }]);
    return;
  }
  if (password == "" || password2 == "") {
    Alert.alert("Błąd", "Podaj hasło", [{ text: "OK" }]);
    return;
  }
  if (password != password2) {
    Alert.alert("Błąd", "Hasła muszą się zgadzać", [{ text: "OK" }]);
    return;
  }

  axios
    .post(`/users`, {
      username: username,
      password: password,
      fullName: fullName,
      phone: phone,
      email: eMail,
    })
    .then(({ data }) => {
      console.log(data);
      const { username, accountType, fullName } = data;
      Alert.alert("Sukces", "pomyślnie zarejestrowano", [{ text: "OK" }]);
      navigation.goBack();
    })
    .catch((err) => {
      console.log(err);
      Alert.alert("Błąd", "Nieprawidłowe hasło", [{ text: "OK" }]);
    });
};

const RegisterPage: React.FC<IProps> = ({ logIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  navigation = useNavigation();
  const [email, setEmail] = useState("");
  return (
    <View style={styles.register}>
        <View style={{height: 250, padding: 30}}>
            <Image
                source={require('../assets/LogotypDark.png')}
                style={{width: "100%", height: "100%", aspectRatio: 1}}
            />
        </View>

        <Text style={styles.hello}>Cześć!</Text>

        <Text style={styles.helloSub}>
            Don't be shy, just apply!
        </Text>


      <TextInput
        style={styles.input}
        placeholder="login"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="full name"
        onChangeText={setFullName}
        value={fullName}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="password"
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="repeat password"
        onChangeText={setPassword2}
        value={password2}
      />
      <TextInput
        style={styles.input}
        placeholder="e-mail"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="phone"
        onChangeText={setPhone}
        value={phone}
      />
      <Button
        title="Rejestracja"
        onPress={() =>
          submitData(
            username,
            password,
            password2,
            fullName,
            phone,
            email,
            logIn
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  register: {
    width: "100%",
    height: "100%",
    // backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    // borderRadius: 5,
  },
  input: {
    backgroundColor: "white",
    width: "85%",
    marginBottom: 8,
    borderRadius: 5,
    padding: 5,
  },
    hello: {
        padding: 8,
        paddingBottom: 0,
        color: "#019863",
        fontSize: 30,
        fontWeight: "bold"
    },
    helloSub: {
        padding: 18,
        paddingTop: 4,
        color: "#666666",
        marginBottom: 60


    }
});

const mapDispatchToProps = (dispatch: any) => ({
  logIn: (user: IUser) => dispatch(loginUser(user)),
});

// export default RegisterPage;
export default connect(null, mapDispatchToProps)(RegisterPage);
