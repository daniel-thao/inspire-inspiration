import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.AUTH0_DOMAIN || "dev-b9sse9-f.us.auth0.com";
  const clientId = process.env.AUTH0_CLIENT_ID || "KqL5SC94urdM2hAZGU4iAMgCMJHIvlrj";

  const history = useHistory();

  const onRedirectCallback = async (appState) => {
    if (appState !== undefined) {
      history.push(appState?.returnTo);
    } else if (window.location.pathname === "/") {
      history.push("/goals");
    }
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
