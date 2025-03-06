import { useContext } from "react";
import { KeycloakContext, IKeycloakContext } from "./KeycloakProvider.tsx";

export const useKeycloakContext = (): IKeycloakContext => {
  const context = useContext(KeycloakContext);
  if (!context) {
    throw new Error(
      "useKeycloakContext должен использоваться внутри KeycloakProvider",
    );
  }
  return context;
};
