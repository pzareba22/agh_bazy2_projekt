import { createStore, combineReducers } from "redux";
import userReducer from "../reducers/userReducer";
import eventsReducer from "../reducers/eventsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  events: eventsReducer,
});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
