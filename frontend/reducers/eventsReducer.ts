import {IUser} from "../constants";


export default (state: IUser[] = [], action: any) => {
  switch (action.type) {
    case "SET_EVENT_LIST":
      return action.payload;
    default:
      return state;
  }
};
