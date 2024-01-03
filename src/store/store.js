import { configureStore, combineReducers } from "@reduxjs/toolkit";

import taskReducer from "./reducers/tasks";
import errorsReducer from "./reducers/errors";

const rootReducer = combineReducers({
  errors: errorsReducer,
  tasks: taskReducer,
});

const createStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export default createStore;
