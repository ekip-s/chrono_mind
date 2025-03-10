import { Outlet } from "react-router";
import { useKeycloakContext } from "./useKeycloak.ts";
import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";

const ProtectedRoute = () => {
  const { loginHandler, initialized } = useKeycloakContext();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  if (!initialized) {
    return <div>Загрузка...</div>;
  }

  if (!isAuth) {
    loginHandler();
    return;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
