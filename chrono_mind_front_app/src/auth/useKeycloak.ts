import { useEffect } from "react";
import { RootState } from "../store/store.ts";
import Keycloak from "./keycloak.ts";
import { useSelector, useDispatch } from "react-redux";
import authActions from "../store/auth-slice.ts";

const keycloak = Keycloak;

const useKeycloak = () => {
  const isAuth = useSelector((state: RootState) => state.auth.authenticated);
  const dispatchActions = useDispatch();

  const addAuthInfoHandler = (auth: boolean) => {
    dispatchActions(authActions.actions.authInit(auth));
  };

  useEffect(() => {
    if (!isAuth) {
      keycloakInit();
    }
    if (isAuth) {
      dispatchActions(authActions.actions.addData(getUserInfo()));
    }
  }, [isAuth]);

  const getUserInfo = () => {
    const token = getAccessToken();

    if (!token) {
      throw new Error("Токен не найден");
    }

    const payloadBase64 = token
      .split(".")[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const decodedToken = JSON.parse(atob(payloadBase64));
    return {
      token,
      clientId: decodedToken.sub,
    };
  };

  const getAccessToken = () => keycloak.token;

  const keycloakInit = () => {
    if (isAuth) {
      return;
    }

    keycloak
      .init({ onLoad: "check-sso" })
      .then((auth) => {
        addAuthInfoHandler(auth);
      })
      .catch((e) => console.log("Ошибка: " + e));
  };

  const loginHandler = () => {
    keycloak.login().catch(() => {
      console.log("Ошибка при авторизации");
      addAuthInfoHandler(false);
    });
  };
  const logoutHandler = () => {
    keycloak.logout();
  };

  return { keycloakInit, loginHandler, logoutHandler, isAuth };
};

export default useKeycloak;
