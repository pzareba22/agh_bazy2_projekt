import { Button, Image, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { logOutUser } from "../actions";
import { IUser } from "../constants";
import LogIn from "./LogIn";

interface IProps {
  user: IUser;
  logOut: () => void;
}

const ProfileScreen: React.FC<IProps> = ({ user, logOut }) => {
  const condition = user.username == "Anonim";

  return (
    <View style={styles.profileScreen}>
      {condition && <LogIn />}
      {!condition && (
        <View>
          <View style={styles.fieldView}>
            <Text style={styles.fieldKey}>Username</Text>
            <Text style={styles.fieldValue}>{user.username}</Text>
          </View>

          <View style={styles.fieldView}>
            <Text style={styles.fieldKey}>Phone number</Text>
            <Text style={styles.fieldValue}>
              {user.phone ?? "(not defined)"}
            </Text>
          </View>

          <View style={styles.fieldView}>
            <Text style={styles.fieldKey}>Email address</Text>
            <Text style={styles.fieldValue}>
              {user.email ?? "(not defined)"}
            </Text>
          </View>

          <View style={{ height: 300, padding: 30 }}>
            <Image
              source={require("../assets/qr_code.png")}
              style={{ width: "100%", height: "100%", aspectRatio: 1 }}
            />
          </View>
          <Button title="Wyloguj się" onPress={() => logOut()} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileScreen: {
    // flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  fieldView: {
    padding: 10,
  },
  fieldKey: {},
  fieldValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const mapStateAsProps = (state: any) => ({
  user: state.user,
});
const mapDispatchAsProps = (dispatch: any) => ({
  logOut: () => dispatch(logOutUser()),
});

// export default ProfileScreen;
export default connect(mapStateAsProps, mapDispatchAsProps)(ProfileScreen);
