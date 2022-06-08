import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// import Layout from "./Components/mainarea/Layout/Layout";
import { BrowserRouter, HashRouter, MemoryRouter } from "react-router-dom";
import { store } from "./Redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Layout from "./Components/views/mainarea/Layout/Layout";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

let persistor = persistStore(store);

const theme = createTheme({
  typography: {
    fontFamily: [
      "Lato",
      // "Roboto",
      "Helvetica Neue",
      // "Arial",
      // "sans-serif",
    ].join(","),
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <MemoryRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout />
        </PersistGate>
      </Provider>
    </MemoryRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
