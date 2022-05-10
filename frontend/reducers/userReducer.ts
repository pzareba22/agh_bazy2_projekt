import { IUser } from "../constants";

const emptyUser: IUser = {
  username: "Anonim",
  accountType: "USER",
  JWT: "",
  fullName: "",
};

export default (state: IUser = emptyUser, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return emptyUser;
    default:
      return state;
  }
};
