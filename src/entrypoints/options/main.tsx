import { store } from "@/app/store";
import Layout from "@/entrypoints/options/Layout";
import {
  AboutPage,
  ProfilePage,
  ProfilesPage,
} from "@/entrypoints/options/pages";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from "react-router";

import "../../assets/stylesheets/main.css";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/proxies" />} />
            <Route path="/" element={<Layout />}>
              <Route path="about" element={<AboutPage />} />
              <Route path="proxies" element={<ProfilesPage />} />
              <Route path="proxy/:id" element={<ProfilePage />} />
            </Route>
          </Routes>
        </HashRouter>
      </Provider>
    </React.StrictMode>,
  );
} else {
  throw new Error("Root element with ID `root` not found.");
}
