import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: "dark_matter",
  clientId: "chrono_mind_app",
});

export default keycloak;
