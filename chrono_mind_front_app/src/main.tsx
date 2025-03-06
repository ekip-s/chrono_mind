import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import store from "./store/store.ts";
import { KeycloakProvider } from "./auth/KeycloakProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <KeycloakProvider>
      <App />
    </KeycloakProvider>
  </Provider>,
);
