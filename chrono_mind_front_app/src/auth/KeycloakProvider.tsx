import Keycloak, { KeycloakInitOptions } from "keycloak-js";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice.ts";

export interface IUser {
  token: string;
  clientId: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IKeycloakContext {
  loginHandler: () => void;
  logoutHandler: () => void;
  initialized: boolean;
}

export const KeycloakContext = createContext<IKeycloakContext | undefined>(
  undefined,
);

interface KeycloakProviderProps {
  children: ReactNode;
}

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: "dark_matter",
  clientId: "chrono_mind_app",
});

export const KeycloakProvider: React.FC<KeycloakProviderProps> = ({
  children,
}) => {
  const dispatchActions = useDispatch();
  const [initialized, setInitialized] = useState(false);

  const updateUserFromToken = (token: string) => {
    try {
      const payloadBase64 = token
        .split(".")[1]
        .replace(/-/g, "+")
        .replace(/_/g, "/");
      const decodedToken = JSON.parse(window.atob(payloadBase64));
      dispatchActions(
        authActions.setUser({
          token,
          clientId: decodedToken.sub,
          login: decodedToken.preferred_username || "",
          firstName: decodedToken.given_name || "",
          lastName: decodedToken.family_name || "",
          email: decodedToken.email || "",
        }),
      );
    } catch (error) {
      console.error("Ошибка декодирования токена:", error);
    }
  };

  useEffect(() => {
    const initOptions: KeycloakInitOptions = {
      onLoad: "check-sso",
    };

    keycloak
      .init(initOptions)
      .then((auth) => {
        setInitialized(true);
        dispatchActions(authActions.auth(auth));
        if (auth) {
          const token = keycloak.token;
          if (token) {
            updateUserFromToken(token);
          }
        }
      })
      .catch((error) => {
        console.error("Ошибка инициализации Keycloak:", error);
      });
  }, []);

  const loginHandler = () => {
    console.log(keycloak);
    keycloak
      .login()
      .then(() => {
        dispatchActions(authActions.auth(true));
        const token = keycloak.token;
        if (token) {
          updateUserFromToken(token);
        }
      })
      .catch((error) => {
        console.error("Ошибка при авторизации:", error);
      });
  };

  const logoutHandler = () => {
    keycloak
      .logout()
      .then(() => {
        dispatchActions(authActions.logout());
      })
      .catch((error) => {
        console.error("Ошибка при логауте:", error);
      });
  };

  return (
    <KeycloakContext.Provider
      value={{
        loginHandler,
        logoutHandler,
        initialized,
      }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};
