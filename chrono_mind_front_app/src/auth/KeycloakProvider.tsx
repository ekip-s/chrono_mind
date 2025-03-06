import Keycloak, { KeycloakInitOptions } from "keycloak-js";
import React, { createContext, ReactNode, useEffect, useState } from "react";

export interface IUser {
  token: string;
  clientId: string;
  login: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IKeycloakContext {
  isAuth: boolean;
  loginHandler: () => void;
  logoutHandler: () => void;
  getClientId: () => string | null;
  getToken: () => string | null;
  getUserDetails: () => IUser | null;
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
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  const updateUserFromToken = (token: string) => {
    try {
      const payloadBase64 = token
        .split(".")[1]
        .replace(/-/g, "+")
        .replace(/_/g, "/");
      const decodedToken = JSON.parse(window.atob(payloadBase64));
      setUser({
        token,
        clientId: decodedToken.sub,
        login: decodedToken.preferred_username || "",
        firstName: decodedToken.given_name || "",
        lastName: decodedToken.family_name || "",
        email: decodedToken.email || "",
      });
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
        setIsAuth(auth);
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
    keycloak
      .login()
      .then(() => {
        setIsAuth(true);
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
        setIsAuth(false);
        setUser(null);
      })
      .catch((error) => {
        console.error("Ошибка при логауте:", error);
      });
  };

  // Метод для получения объекта пользователя с дополнительной информацией
  const getUserDetails = () => {
    return user;
  };

  const getClientId = (): string | null => {
    return user ? user.clientId : null;
  };

  const getToken = (): string | null => {
    return user ? user.token : null;
  };

  return (
    <KeycloakContext.Provider
      value={{
        isAuth,
        loginHandler,
        logoutHandler,
        getClientId,
        getToken,
        getUserDetails,
      }}
    >
      {children}
    </KeycloakContext.Provider>
  );
};
