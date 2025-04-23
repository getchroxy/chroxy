import { store } from "@/app/store.ts";
import App from "@/entrypoints/popup/App.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "../../assets/stylesheets/main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
