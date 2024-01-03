import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import createStore from "./store/store";
import App from "./App";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
