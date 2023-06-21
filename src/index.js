import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";

import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";
import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
// dev-53edgid0mqob0jsp.us.auth0.com

// U5SKo0fMz2De5lwtQqJCb5CnaXVDz540
root.render(
  <Provider store={store}>
    
    <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
    
  </Provider>
);
