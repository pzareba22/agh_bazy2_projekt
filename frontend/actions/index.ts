import {IEvent, IUser} from "../constants";

export const loginUser = (user: IUser) => {
  return {
    type: "LOGIN",
    payload: user,
  };
};

export const logOutUser = () => {
  return {
    type: "LOGOUT",
    payload: null,
  };
};

export const setEventListAction = (eventList: IEvent[]) => {
  return {
    type: "SET_EVENT_LIST",
    payload: eventList,
  };
};
