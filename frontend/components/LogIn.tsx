import {Alert, Button, Image, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";
import {connect} from "react-redux";
import {IUser} from "../constants";
import {loginUser} from "../actions";
import axios from "../axiosconfig";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

interface IProps {
    logIn: (user: IUser) => void;
}

const submitData = (
    username: string,
    password: string,
    dispatch: (user: IUser) => void
) => {
    if (username == "") {
        Alert.alert("Błąd", "Podaj nazwę użytkownika", [{text: "OK"}]);
        return;
    }
    if (password == "") {
        Alert.alert("Błąd", "Podaj hasło", [{text: "OK"}]);
        return;
    }

    axios
        .post(`/users/login`, {
            username: username,
            password: password,
        })
        .then(({data}) => {
            console.log(data);
            const {
                user: {username, accountType, fullName, phone, email},
                token,
            } = data;
            const user: IUser = {
                username,
                accountType,
                fullName: fullName,
                JWT: token,
                phone: phone || "",
                email: email || "",
            };
            dispatch(user);
        })
        .catch((err) => {
            console.log(err);
            Alert.alert("Błąd", "Nieprawidłowe hasło!", [{text: "OK"}]);
            return;
        });
};

const LogIn: React.FC<IProps> = ({logIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigation =
        useNavigation<NativeStackNavigationProp<{ Register: {} }>>();

    return (
        <View style={styles.logIn}>
            <View style={{height: 250, padding: 30}}>
                <Image
                    source={require('../assets/LogotypDark.png')}
                    style={{width: "100%", height: "100%", aspectRatio: 1}}
                />
            </View>

            <Text style={styles.hello}>Witaj ponownie!</Text>

            <Text style={styles.helloSub}>Zaloguj się, aby kontynuować</Text>
            <TextInput
                style={styles.input}
                value={username}
                placeholder="login"
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                value={password}
                placeholder="password"
                onChangeText={setPassword}
            />
            <Button
                title="Zaloguj się"
                onPress={() => {
                    submitData(username, password, logIn);
                    setUsername("");
                    setPassword("");
                }}
            />
            <View style={{marginTop: 8}}>
                <Button
                    title="Zarejestruj się"
                    onPress={() => {
                        navigation.navigate("Register", {});
                    }}
                />
            </View>
        </View>
        // </Overlay>
    );
};

const styles = StyleSheet.create({
    logIn: {
        width: 250,
        height: 190,
        // backgroundColor: "#eee",
        alignItems: "center",
        justifyContent: "center",
        // borderRadius: 5,
    },
    overlay: {
        padding: 0,
        borderRadius: 5,
        // width: "100%",
        // height: "100%",
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

// export default LogIn;
export default connect(null, mapDispatchToProps)(LogIn);
