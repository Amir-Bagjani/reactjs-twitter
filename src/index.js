import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import TweetContextProvider from "./context/TweetContext";
import DependencyContextProvider from "./context/DependencyContext";
import LanguageContextProvider from "./context/LanguageContext";
import StyleContextProvider from "./context/StyleContext";

//multi lingual
import "./i18n";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <DependencyContextProvider>
          <TweetContextProvider>
            <LanguageContextProvider>
              <StyleContextProvider>
                <App />
              </StyleContextProvider>
            </LanguageContextProvider>
          </TweetContextProvider>
        </DependencyContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
