import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store ,{persistor} from './store/store'; // Import your configured Redux store
import { PersistGate } from 'redux-persist/integration/react'; // Correct import

import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
